import history from "@/assets/banners/history-eniac.jpg.asset.json";
import today from "@/assets/banners/ai-today-office.png.asset.json";
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
    alt: "Футуристический офис с экраном, на котором показан светящийся цифровой мозг, и панелью с ИИ-сервисами",
    position: "object-[100%_50%] sm:object-[center_50%]",
    source: "Изображение предоставлено автором сайта",
    license: "Авторское изображение владельца проекта",
    mobileAspect: "aspect-[2/1]",
  },
  tools: {
    src: tools.url,
    alt: "Работа за ноутбуком в современном цифровом рабочем пространстве",
    position: "object-[40%_45%] sm:object-[center_45%]",
    source: "https://unsplash.com/photos/a-person-sitting-at-a-desk-using-a-laptop-computer-F1PCLT669UU",
    license: "Unsplash License — no attribution required",
  },
} as const;