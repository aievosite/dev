import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { getPagesBase, publicPages } from "./gh-pages-config.mjs";

export async function verifyPages(outDir, base = getPagesBase()) {
  const origin = "https://pages-check.invalid";
  let checked = 0;
  async function checkUrl(value, from) {
    if (!value || /^(data:|blob:|#|mailto:|tel:)/.test(value)) return;
    const url = new URL(value.replaceAll("&amp;", "&"), new URL(from, origin));
    if (url.origin !== origin) return; // Google Fonts and external catalog links.
    if (!url.pathname.startsWith(base)) throw new Error(`Wrong Pages base: ${value} in ${from}; expected ${base}`);
    const relative = decodeURIComponent(url.pathname.slice(base.length));
    const file = resolve(outDir, relative);
    const root = resolve(outDir);
    if (file !== root && !file.startsWith(`${root}/`)) throw new Error(`Invalid path: ${value}`);
    const info = await stat(file).catch(() => null);
    if (!info || (info.isDirectory() && !(await stat(join(file, "index.html")).catch(() => null)))) {
      throw new Error(`Missing local resource/page: ${value} in ${from}`);
    }
    checked++;
  }
  for (const route of publicPages) {
    const file = join(outDir, route, "index.html");
    const html = await readFile(file, "utf8");
    if (!/<link\b[^>]*rel="stylesheet"[^>]*href="\//.test(html)) throw new Error(`Missing local CSS: ${file}`);
    if (!/<script\b[^>]*src="\//.test(html)) throw new Error(`Missing local JavaScript: ${file}`);
    for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
      await checkUrl(match[1], `${base}${route ? `${route}/` : ""}`);
    }
  }
  async function scan(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) { await scan(file); continue; }
      if (!/\.(css|js)$/.test(file)) continue;
      const text = await readFile(file, "utf8");
      const from = `${base}${file.slice(resolve(outDir).length + 1)}`;
      if (entry.name.endsWith(".css")) {
        for (const match of text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) await checkUrl(match[1], from);
      }
      // Bundled image pointers and Vite's absolute asset references.
      for (const match of text.matchAll(/["'`](\/[^"'`\s]*\/(?:assets|lovable-assets)\/[^"'`\s]+)["'`]/g)) await checkUrl(match[1], from);
      if (text.includes("/__l5e/assets-v1/")) throw new Error(`Unconverted Lovable asset in ${file}`);
    }
  }
  await scan(resolve(outDir));
  return { pages: publicPages.length, checked, base };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = await verifyPages(process.argv[2] ?? "dist/client");
  console.log(`Pages verified: ${result.pages} pages, ${result.checked} local references, base ${result.base}`);
}