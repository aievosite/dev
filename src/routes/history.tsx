import { createFileRoute } from "@tanstack/react-router";
import { Approaches, Eras, SectionTitle, Timeline, pageWrap } from "@/components/site";
import { historyImages } from "@/lib/history-images";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "История ИИ — AI: Эволюция интеллекта" },
      { name: "description", content: "Хронология искусственного интеллекта с 1936 по 2026 год и четыре эпохи его развития." },
      { property: "og:title", content: "История ИИ — хронология" },
      { property: "og:description", content: "От машины Тьюринга до мультимодальных моделей и ИИ-агентов." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className={`${pageWrap} py-16`}>
      <SectionTitle eyebrow="История ИИ" title="Путешествие сквозь девять десятилетий" text="Каждая карточка раскрывается — нажмите «Подробнее»." />
      <Timeline images={historyImages} />
      <div className="mt-24">
        <SectionTitle eyebrow="Как развивался ИИ" title="Шесть этапов развития ИИ" />
        <Approaches />
      </div>
      <div className="mt-24">
        <SectionTitle eyebrow="Эпохи" title="Четыре эпохи развития" />
        <Eras />
      </div>
    </div>
  ),
});
