import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // GitHub Pages build (subfolder base) serves /page/index.html, so keep "/page/"
    // URLs instead of redirecting; the Lovable build (base "/") keeps the default.
    ...(import.meta.env.BASE_URL !== "/" && { trailingSlash: "preserve" as const }),
  });

  return router;
};
