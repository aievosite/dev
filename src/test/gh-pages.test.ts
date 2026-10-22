import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getPagesBase, publicPages } from "../../scripts/gh-pages-config.mjs";
import { verifyPages } from "../../scripts/gh-pages-verify.mjs";

const temporary: string[] = [];
afterEach(async () => { await Promise.all(temporary.splice(0).map((dir) => rm(dir, { recursive: true, force: true }))); });

async function fixture(base = "/dev/") {
  const dir = await mkdtemp(join(tmpdir(), "pages-check-"));
  temporary.push(dir);
  await mkdir(join(dir, "assets"));
  await writeFile(join(dir, "assets/style.css"), "body { background: url('./photo.jpg'); }");
  await writeFile(join(dir, "assets/app.js"), `const image="${base}assets/photo.jpg";`);
  await writeFile(join(dir, "assets/photo.jpg"), "fixture");
  for (const route of publicPages) {
    await mkdir(join(dir, route), { recursive: true });
    await writeFile(join(dir, route, "index.html"), `<link rel="stylesheet" href="${base}assets/style.css"><script src="${base}assets/app.js"></script><a href="${base}history/">history</a><link href="https://fonts.googleapis.com/css2?family=Manrope" rel="stylesheet">`);
  }
  return dir;
}

describe("GitHub Pages deployment paths", () => {
  it("uses /dev/ for the renamed repository and local default", () => {
    expect(getPagesBase({ GITHUB_REPOSITORY: "aievosite/dev" })).toBe("/dev/");
    expect(getPagesBase({})).toBe("/dev/");
    expect(getPagesBase({ GH_PAGES_BASE: "dev", GITHUB_REPOSITORY: "aievosite/old" })).toBe("/dev/");
  });
  it("retains exactly the five public pages", () => {
    expect(publicPages).toEqual(["", "history", "ai-today", "tools", "about"]);
  });
  it("accepts all five pages and local CSS, JS and images under /dev/", async () => {
    expect(await verifyPages(await fixture(), "/dev/")).toMatchObject({ pages: 5, base: "/dev/" });
  });
  it("rejects the old /ai-evolution-site/ prefix before deployment", async () => {
    await expect(verifyPages(await fixture("/ai-evolution-site/"), "/dev/")).rejects.toThrow("Wrong Pages base");
  });
  it("rejects missing JavaScript before deployment", async () => {
    const dir = await fixture();
    await rm(join(dir, "assets/app.js"));
    await expect(verifyPages(dir, "/dev/")).rejects.toThrow("Missing local resource/page");
  });
  it("rejects missing images referenced by CSS", async () => {
    const dir = await fixture();
    await rm(join(dir, "assets/photo.jpg"));
    await expect(verifyPages(dir, "/dev/")).rejects.toThrow("Missing local resource/page");
  });
});