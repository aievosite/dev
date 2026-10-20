import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ToolsCatalog } from "@/components/tools-catalog";
import { tools, toolCategories } from "@/lib/tools";

afterEach(cleanup);

describe("Preserved tools catalog", () => {
  it("keeps all 21 original tools and their official links", () => {
    const { container } = render(<ToolsCatalog />);
    expect(tools).toHaveLength(21);
    expect(container.querySelectorAll("article")).toHaveLength(21);
    for (const tool of tools) {
      const heading = screen.getByRole("heading", { name: tool.name, exact: true });
      const card = heading.closest("article");
      expect(card).not.toBeNull();
      expect(card?.querySelector("a")?.getAttribute("href") ?? null).toBe(tool.url ?? null);
    }
  });

  it("filters with each original category and restores all tools", () => {
    const { container } = render(<ToolsCatalog />);
    expect(toolCategories).toHaveLength(6);
    for (const category of toolCategories) {
      fireEvent.click(screen.getByRole("button", { name: category, exact: true }));
      expect(container.querySelectorAll("article")).toHaveLength(tools.filter((tool) => tool.category === category).length);
      fireEvent.click(screen.getByRole("button", { name: "Все", exact: true }));
      expect(container.querySelectorAll("article")).toHaveLength(21);
    }
  });

  it("searches original tasks and resets an empty result", () => {
    const { container } = render(<ToolsCatalog />);
    const search = screen.getByRole("searchbox");
    fireEvent.change(search, { target: { value: "Lovable" } });
    expect(container.querySelectorAll("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Lovable" })).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "nonexistent-tool-xyz" } });
    expect(container.querySelectorAll("article")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Показать все инструменты" }));
    expect(container.querySelectorAll("article")).toHaveLength(21);
  });
});