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
  it("keeps the quiz and the tools catalog off the home page", async () => {
    await renderAt("/");

    expect(screen.queryByText(/Вопрос 1 из/)).toBeNull();
    expect(screen.queryByRole("searchbox")).toBeNull();
  });

  it("reaches the quiz and the catalog from buttons that match the menu links", async () => {
    await renderAt("/");

    expect(screen.getByRole("link", { name: "Пройти викторину" }).getAttribute("href")).toBe("/quiz");

    const toolLinks = screen.getAllByRole("link", { name: /нейросети и ии-инструменты/i });
    expect(toolLinks.length).toBe(2);
    for (const link of toolLinks) expect(link.getAttribute("href")).toBe("/tools");
  });

  it("runs the quiz on /quiz and the catalog on /tools", async () => {
    const quiz = await renderAt("/quiz");
    expect(quiz.container.textContent).toContain("Вопрос 1 из");
    cleanup();

    const tools = await renderAt("/tools");
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(tools.container.querySelectorAll("article")).toHaveLength(21);
  });
});
