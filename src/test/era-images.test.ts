import { describe, expect, it } from "vitest";
import { eras } from "@/lib/content";
import { eraImages } from "@/lib/era-images";

describe("Verified era image coverage", () => {
  it("provides four distinct sourced assets for the existing four eras", () => {
    expect(eras).toHaveLength(4);
    const images = eras.map((era) => eraImages[era.period]);
    expect(new Set(images.map((image) => image?.src)).size).toBe(4);
    for (const image of images) {
      expect(image).toBeDefined();
      expect(image?.src.startsWith("/__l5e/assets-v1/")).toBe(true);
      expect(new URL(image?.sourceUrl ?? "").hostname).toBe("commons.wikimedia.org");
      expect(Boolean(image?.credit && image.alt)).toBe(true);
    }
  });
});