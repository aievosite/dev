import history from "@/assets/banners/history-eniac.jpg.asset.json";
import today from "@/assets/banners/ai-today-robonaut.jpg.asset.json";
import tools from "@/assets/banners/tools-workspace.jpg.asset.json";

// Provenance is intentionally not rendered: all licenses allow use without visible credits.
export const sectionBanners = {
  history: {
    src: history.url,
    alt: "Программистки работают с историческим компьютером ENIAC",
    position: "object-[65%_25%] sm:object-[center_25%]",
    source: "https://commons.wikimedia.org/wiki/File:Two_women_operating_ENIAC_(full_resolution).jpg",
    license: "Public domain — United States Army photograph, 1946",
  },
  today: {
    src: today.url,
    alt: "Робот Robonaut 2 и космический скафандр в лаборатории NASA",
    position: "object-[center_20%]",
    source: "https://images.nasa.gov/details/jsc2010e089924",
    license: "NASA public-use imagery — JSC2010-E-089924",
  },
  tools: {
    src: tools.url,
    alt: "Работа за ноутбуком в современном цифровом рабочем пространстве",
    position: "object-[40%_45%] sm:object-[center_45%]",
    source: "https://unsplash.com/photos/a-person-sitting-at-a-desk-using-a-laptop-computer-F1PCLT669UU",
    license: "Unsplash License — no attribution required",
  },
} as const;