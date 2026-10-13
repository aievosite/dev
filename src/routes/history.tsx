import { createFileRoute } from "@tanstack/react-router";
import { Eras, SectionTitle, Timeline, pageWrap } from "@/components/site";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "История ИИ — AI: Эволюция интеллекта" },
      { name: "description", content: "Хронология искусственного интеллекта с 1936 по 2026 год и четыре эпохи его развития." },
      { property: "og:title", content: "История ИИ — хронология" },
      { property: "og:description", content: "От машины Тьюринга до мультимодальных моделей и ИИ-агентов." },
    ],
  }),
  component: () => (
    <div className={`${pageWrap} py-16`}>
      <SectionTitle eyebrow="История ИИ" title="Путешествие сквозь девять десятилетий" text="Каждая карточка раскрывается — нажмите «Подробнее»." />
      <Timeline />
      <div className="mt-24">
        <SectionTitle eyebrow="Эпохи" title="Четыре эпохи развития" />
        <Eras />
      </div>
    </div>
  ),
});
