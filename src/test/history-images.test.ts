import { describe, expect, it } from "vitest";
import { milestones } from "@/lib/content";
import { historyImages } from "@/lib/history-images";

describe("Historical image coverage", () => {
  it("provides a distinct sourced image for all nine existing events", () => {
    expect(milestones).toHaveLength(9);
    const images = milestones.map((event) => historyImages[event.year]);
    expect(images.every((image) => Boolean(image?.src && image.alt && image.sourceUrl))).toBe(true);
    expect(new Set(images.map((image) => image?.src)).size).toBe(9);
    for (const image of images) {
      expect(new URL(image.sourceUrl).protocol).toBe("https:");
      expect(image.src.startsWith("/__l5e/assets-v1/")).toBe(true);
    }
  });
});