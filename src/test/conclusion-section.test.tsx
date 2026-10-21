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
  it("continues directly from unified history to AI today", async () => {
    await renderAt("/history");
    expect(screen.getByRole("link", { name: "Далее: ИИ сегодня" })).toHaveAttribute("href", "/ai-today");
    expect(screen.getAllByRole("button", { name: "Подробнее" })).toHaveLength(9);
    expect(screen.getByRole("heading", { name: "Четыре эпохи развития" })).toBeInTheDocument();
  });
  it("returns from AI today to unified history", async () => {
    await renderAt("/ai-today");
    expect(screen.getByRole("link", { name: "Назад: история развития ИИ" })).toHaveAttribute("href", "/history");
  });
  it("keeps the catalog optional and returns to the practical extension", async () => {
    await renderAt("/tools");
    expect(screen.getByRole("link", { name: "Назад: ИИ сегодня" })).toHaveAttribute("href", "/ai-today#ai-future");
    expect(screen.queryByRole("link", { name: /Далее:/ })).toBeNull();
  });
  it("opens the optional catalog in the same tab", async () => {
    await renderAt("/ai-today");
    const link = screen.getByRole("link", { name: /Изучить нейросети и ИИ-инструменты/ });
    expect(link).toHaveAttribute("href", "/tools");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });
  it("ends the educational journey with a link to the author", async () => {
    await renderAt("/ai-today");
    const links = screen.getAllByRole("link", { name: "Об авторе" });
    expect(links).toHaveLength(2);
    expect(links.at(-1)).toHaveAttribute("href", "/about");
  });
});
