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

  it("reaches the catalog from the menu link", async () => {
    await renderAt("/");

    const toolLinks = screen.getAllByRole("link", { name: /нейросети и ии-инструменты/i });
    expect(toolLinks.length).toBe(1);
    for (const link of toolLinks) expect(link.getAttribute("href")).toBe("/tools");
  });

  it("opens «ИИ сегодня» as a separate page, not as an inline home section", async () => {
    await renderAt("/");

    const item = screen.getByRole("link", { name: "ИИ сегодня" });
    expect(item.getAttribute("href")).toBe("/ai-today");
    expect(screen.queryByRole("heading", { name: /ИИ сегодня: возможности, ограничения и будущее/i })).toBeNull();
  });
});

describe("AI today page", () => {
  it("shows the whole section and a link to the catalog", async () => {
    await renderAt("/ai-today");

    expect(screen.getByRole("heading", { name: /ИИ сегодня: возможности, ограничения и будущее/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Как ИИ меняет нашу жизнь" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Возможности и ограничения ИИ" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Будущее ИИ: от помощника к агенту" })).toBeInTheDocument();

    const catalogLink = screen.getByRole("link", { name: /изучить нейросети и ии-инструменты/i });
    expect(catalogLink.getAttribute("href")).toBe("/tools");
  });
});
