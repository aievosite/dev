import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Timeline } from "@/components/site";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("keeps focus and the page lock until closing finishes, then restores the trigger", async () => {
  render(<Timeline />);
  const trigger = screen.getAllByRole("button", { name: "Подробнее" })[0];
  if (!trigger) throw new Error("Missing first event");
  trigger.focus();
  fireEvent.click(trigger);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
  expect(screen.getByRole("button", { name: "Закрыть" })).toHaveFocus();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(document.body.style.position).toBe("fixed");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
  expect(document.body.style.position).toBe("");
});

it("closes immediately when the reader requests reduced motion", () => {
  const original = window.matchMedia("(prefers-reduced-motion: reduce)");
  vi.spyOn(window, "matchMedia").mockReturnValue({ ...original, matches: true });
  render(<Timeline />);
  const trigger = screen.getAllByRole("button", { name: "Подробнее" })[0];
  if (!trigger) throw new Error("Missing first event");
  trigger.focus();
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole("button", { name: "Закрыть" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});