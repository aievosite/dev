import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

async function renderHome() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
    context: { queryClient: new QueryClient() },
    defaultPreload: "none",
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}

describe("Quiz access", () => {
  it("keeps the quiz itself off the home page", async () => {
    await renderHome();

    expect(screen.queryByText(/Вопрос 1 из/)).toBeNull();
    expect(screen.queryByRole("radiogroup")).toBeNull();
  });

  it("links to /quiz from both the button and the text link", async () => {
    await renderHome();

    const button = screen.getByRole("link", { name: "Пройти викторину" });
    const textLink = screen.getByRole("link", { name: /Перейти к викторине по истории ИИ/ });

    expect(button.getAttribute("href")).toBe("/quiz");
    expect(textLink.getAttribute("href")).toBe("/quiz");
  });
});
