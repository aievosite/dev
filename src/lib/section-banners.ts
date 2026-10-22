import history from "@/assets/banners/history-eniac.jpg.asset.json";
import today from "@/assets/banners/ai-today-chatbot.jpg.asset.json";
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
    alt: "Рука держит смартфон с ChatGPT на фоне тёмной микросхемы",
    position: "object-[60%_35%] sm:object-[center_30%]",
    source: "https://commons.wikimedia.org/wiki/File:Hand_holding_smartphone_with_ChatGPT_and_OpenAI_text_(52917312010).jpg",
    license: "CC BY 2.0 — Jernej Furman, Flickr",
  },
  tools: {
    src: tools.url,
    alt: "Работа за ноутбуком в современном цифровом рабочем пространстве",
    position: "object-[40%_45%] sm:object-[center_45%]",
    source: "https://unsplash.com/photos/a-person-sitting-at-a-desk-using-a-laptop-computer-F1PCLT669UU",
    license: "Unsplash License — no attribution required",
  },
} as const;