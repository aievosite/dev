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

describe("Educational journey", () => {
  it("starts both home entry points on the history page", async () => {
    await renderAt("/");
    expect(screen.getByRole("link", { name: "Исследовать историю" })).toHaveAttribute("href", "/history");
    expect(screen.getByRole("link", { name: "Начать путешествие" })).toHaveAttribute("href", "/history");
  });
  it("continues from history to the tools catalog", async () => {
    await renderAt("/history");
    expect(screen.getByRole("link", { name: "Далее: нейросети и ИИ-инструменты" })).toHaveAttribute("href", "/tools");
  });
  it("continues from the tools catalog to AI today", async () => {
    await renderAt("/tools");
    expect(screen.getByRole("link", { name: "Далее: ИИ сегодня" })).toHaveAttribute("href", "/ai-today");
  });
  it("ends the educational journey with a link to the author", async () => {
    await renderAt("/ai-today");
    const links = screen.getAllByRole("link", { name: "Об авторе" });
    expect(links).toHaveLength(2);
    expect(links.at(-1)).toHaveAttribute("href", "/about");
  });
});
