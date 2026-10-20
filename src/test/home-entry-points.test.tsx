import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

async function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
    context: { queryClient: new QueryClient() },
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}

describe("Home page entry points", () => {
  it("keeps the tools catalog off the home page", async () => {
    await renderAt("/");

    expect(screen.queryByRole("searchbox")).toBeNull();
  });

  it("reaches the catalog from a button that matches the menu link", async () => {
    await renderAt("/");

    const toolLinks = screen.getAllByRole("link", { name: /нейросети и ии-инструменты/i });
    expect(toolLinks.length).toBe(2);
    for (const link of toolLinks) expect(link.getAttribute("href")).toBe("/tools");
  });

  it("runs the catalog on /tools", async () => {
    const tools = await renderAt("/tools");
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(tools.container.querySelectorAll("article")).toHaveLength(21);
  });
});
