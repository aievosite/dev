import { createFileRoute } from "@tanstack/react-router";
import { AiToday } from "@/components/ai-today";
import { Conclusion } from "@/components/conclusion";
import { SectionBanner } from "@/components/section-banner";
import { sectionBanners } from "@/lib/section-banners";

export const Route = createFileRoute("/ai-today")({
  head: () => ({
    meta: [
      { title: "ИИ сегодня: возможности, ограничения и будущее — AI: Эволюция интеллекта" },
      { name: "description", content: "Как ИИ меняет медицину, науку, образование и программирование, что нейросети умеют уже сейчас, где ошибаются и чем агентный подход отличается от обычного диалога." },
      { property: "og:title", content: "ИИ сегодня: возможности, ограничения и будущее" },
      { property: "og:description", content: "Применения, сильные и слабые стороны современных ИИ-систем и переход от помощника к агенту." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <><SectionBanner {...sectionBanners.today} /><AiToday /><Conclusion /></>,
});
