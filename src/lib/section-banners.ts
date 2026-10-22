import history from "@/assets/banners/history-retro-classroom.jpg.asset.json";
import today from "@/assets/banners/ai-today-office-panel.webp.asset.json";
import tools from "@/assets/banners/tools-ai-assistants.webp.asset.json";

// Provenance is intentionally not rendered: these are the site owner's own images.
export const sectionBanners = {
  history: {
    src: history.url,
    alt: "Ретро-компьютер с монитором и клавиатурой на столе в светлом учебном кабинете: стопка книг по искусственному интеллекту и маркерная доска со схемой обучения модели",
    position: "object-[0%_50%] sm:object-[center_55%]",
    source: "Изображение предоставлено автором сайта",
    license: "Авторское изображение владельца проекта",
  },
  today: {
    src: today.url,
    alt: "Современный офис с панорамным окном и парящей панелью «ИИ сегодня»: образование, бизнес, медицина и наука",
    position: "object-[100%_50%] sm:object-[center_50%]",
    source: "Изображение предоставлено автором сайта",
    license: "Авторское изображение владельца проекта",
    mobileAspect: "aspect-[2/1]",
  },
  tools: {
    src: tools.url,
    alt: "Тёмная лаборатория с неоновым экраном и стеклянной панелью со списком нейросетей: ChatGPT, Claude, Gemini и Midjourney",
    position: "object-[100%_50%] sm:object-[center_40%]",
