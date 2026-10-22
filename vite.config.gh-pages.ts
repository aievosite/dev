// Separate build for GitHub Pages (static hosting in a repository subfolder).
// The main vite.config.ts stays untouched and keeps powering the Lovable publish.
// Usage: GH_PAGES_BASE=/<repo-name>/ vite build --config vite.config.gh-pages.ts
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { getPagesBase, publicPages } from "./scripts/gh-pages-config.mjs";

const base = getPagesBase();

// Lovable-hosted images (`*.asset.json`) point at /__l5e/assets-v1/... which only
// exists on Lovable hosting. Rewrite them to local copies that
// scripts/gh-pages-assets.mjs downloads into the static output.
function localAssetsPlugin(): Plugin {
  return {
    name: "gh-pages:local-assets",
    enforce: "pre",
    load(id) {
      if (!id.endsWith(".asset.json")) return null;
      const data = JSON.parse(readFileSync(id, "utf8"));
      const local = `${base}lovable-assets/${data.asset_id}/${data.original_filename}`;
      return JSON.stringify({ ...data, url: local });
    },
  };
}

export default defineConfig({
  plugins: [localAssetsPlugin()],
  vite: { base },
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    router: { basepath: base },
    // TanStack adds router.basepath when requesting these paths and strips it
    // again when writing <route>/index.html at the output root.
    pages: publicPages.map((route) => ({ path: `/${route}` })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
  },
});
