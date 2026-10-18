import { render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useModalPageLock } from "@/hooks/use-modal-page-lock";

function OpenModal() {
  useModalPageLock();
  return null;
}

afterEach(() => {
  document.body.removeAttribute("style");
  document.documentElement.removeAttribute("style");
  vi.restoreAllMocks();
});

it("locks the background and restores the exact page position and previous styles on close", () => {
  vi.spyOn(window, "scrollX", "get").mockReturnValue(0);
  vi.spyOn(window, "scrollY", "get").mockReturnValue(1274);
  const scrollTo = vi.spyOn(window, "scrollTo");
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "12px";
  document.documentElement.style.scrollBehavior = "smooth";
  const { unmount } = render(<OpenModal />);
  expect(document.body.style.position).toBe("fixed");
  expect(document.body.style.top).toBe("-1274px");
  expect(document.body.style.overflow).toBe("hidden");
  unmount();
  expect(scrollTo).toHaveBeenCalledWith(0, 1274);
  expect(document.body.style.position).toBe("");
  expect(document.body.style.overflow).toBe("auto");
  expect(document.body.style.paddingRight).toBe("12px");
  expect(document.documentElement.style.scrollBehavior).toBe("smooth");
});