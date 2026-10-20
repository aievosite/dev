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
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}

describe("Home conclusion section", () => {
  it("shows the conclusion heading with no introductory label inside the card", async () => {
    const { container } = await renderHome();

    const heading = screen.getByRole("heading", { name: /искусственный интеллект меняет мир/i });
    expect(heading.tagName).toBe("H2");
    // The card must start with the heading: no eyebrow, badge or subtitle above it.
    expect(heading.closest("div")?.firstElementChild).toBe(heading);
    expect(container.textContent).not.toMatch(/главный вывод/i);
  });

  it("sits immediately before the quiz call to action", async () => {
    await renderHome();

    const conclusionSection = screen
      .getByRole("heading", { name: /искусственный интеллект меняет мир/i })
      .closest("section");
    const quizLink = screen.getByRole("link", { name: "Пройти викторину" });
    const quizSection = quizLink.closest("section");

    expect(conclusionSection).not.toBeNull();
    expect(conclusionSection?.nextElementSibling).toBe(quizSection);
  });
});
