import { expect, it } from "vitest";
import { getRouter } from "@/router";

it("resets inter-page scroll instantly instead of sweeping through content", () => {
  const router = getRouter();
  expect(router.options.scrollRestoration).toBe(true);
  expect(router.options.scrollRestorationBehavior).toBe("instant");
});

it("positions inter-page hash returns instantly while preserving their target", () => {
  const router = getRouter();
  expect(router.options.defaultHashScrollIntoView).toEqual({ behavior: "instant" });
});