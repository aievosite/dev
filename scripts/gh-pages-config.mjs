// Shared by the separate Pages build and its post-build resource check.
export const publicPages = ["", "history", "ai-today", "tools", "about"];

export function getPagesBase(env = process.env) {
  const repository = env.GITHUB_REPOSITORY?.split("/").at(-1);
  const fallback = repository?.endsWith(".github.io") ? "/" : `/${repository || "dev"}/`;
  const value = env.GH_PAGES_BASE ?? fallback;
  return `/${value.replace(/^\/+|\/+$/g, "")}/`.replace(/^\/\/$/, "/");
}