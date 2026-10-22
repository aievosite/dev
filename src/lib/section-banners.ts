import history from "@/assets/banners/history-eniac.jpg.asset.json";
import today from "@/assets/banners/ai-today-neural-network.jpg.asset.json";
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
    alt: "Робот касается рукой светящейся нейросети на тёмно-синем фоне",
    position: "object-[55%_38%] sm:object-[center_40%]",
    source: "https://www.pexels.com/photo/robot-pointing-on-a-wall-8386440/",
    license: "Pexels License — no attribution required",
  },
  tools: {
    src: tools.url,
    alt: "Работа за ноутбуком в современном цифровом рабочем пространстве",
    position: "object-[40%_45%] sm:object-[center_45%]",
    source: "https://unsplash.com/photos/a-person-sitting-at-a-desk-using-a-laptop-computer-F1PCLT669UU",
    license: "Unsplash License — no attribution required",
  },
} as const;