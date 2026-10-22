import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle, pageWrap } from "@/components/site";
import { ToolsCatalog } from "@/components/tools-catalog";
import { JourneyBack } from "@/components/journey-back";
import { SectionBanner } from "@/components/section-banner";
import { sectionBanners } from "@/lib/section-banners";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Нейросети и ИИ-инструменты — AI: Эволюция интеллекта" },
      { name: "description", content: "Каталог из 21 ИИ-инструмента: ассистенты, поиск, программирование, изображения, видео и звук — для каких задач подходит каждый." },
      { property: "og:title", content: "Нейросети и ИИ-инструменты — каталог" },
      { property: "og:description", content: "Какой ИИ-инструмент выбрать для учёбы, исследований, кода и творчества." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
    <SectionBanner {...sectionBanners.tools} />
    <div className={`${pageWrap} py-12 md:py-16`}>
      <JourneyBack to="/ai-today" hash="ai-future">Назад: ИИ сегодня</JourneyBack>
      <SectionTitle eyebrow="Каталог" title="Нейросети и ИИ-инструменты" text="Двадцать один инструмент в шести категориях: ассистенты, поиск, программирование, изображения, видео и звук." />
      <ToolsCatalog />
    </div>
    </>
  ),
});
