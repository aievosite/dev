// Post-build step for GitHub Pages: copies every Lovable-hosted image into the
// static output so the site works without Lovable hosting.
// Usage: node scripts/gh-pages-assets.mjs <outDir>
import { readdir, readFile, mkdir, writeFile, copyFile, stat, rename, rm } from "node:fs/promises";
import { join, dirname } from "node:path";

const outDir = process.argv[2] ?? "dist/client";
const base = (process.env.GH_PAGES_BASE ?? "/ai-evolution-site/").replace(/^\/+|\/+$/g, "");
const source = process.env.ASSET_SOURCE ?? "https://ai-evolution-site.lovable.app";

async function walk(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    items.map((i) => (i.isDirectory() ? walk(join(dir, i.name)) : [join(dir, i.name)])),
  );
  return files.flat();
}

const pointers = (await walk("src")).filter((f) => f.endsWith(".asset.json"));
for (const file of pointers) {
  const a = JSON.parse(await readFile(file, "utf8"));
  const target = join(outDir, "lovable-assets", a.asset_id, a.original_filename);
  const res = await fetch(new URL(a.url, source));
  if (!res.ok) throw new Error(`Failed to download ${a.url}: ${res.status}`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log("asset", target);
}

// Prerendered pages land in <outDir>/<base>/...; GitHub Pages already serves
// <outDir> at /<base>/, so move them to the root.
const nested = join(outDir, base);
if (base && (await stat(nested).catch(() => null))) {
  for (const f of await walk(nested)) {
    const dest = join(outDir, f.slice(nested.length + 1));
    await mkdir(dirname(dest), { recursive: true });
    await rename(f, dest);
  }
  await rm(nested, { recursive: true, force: true });
}

// GitHub Pages: no Jekyll processing, and unknown URLs show the site's 404 page.
await writeFile(join(outDir, ".nojekyll"), "");
const index = join(outDir, "index.html");
if (await stat(index).catch(() => null)) await copyFile(index, join(outDir, "404.html"));
console.log(`Copied ${pointers.length} images into ${outDir}`);
