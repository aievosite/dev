import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle, Sources, pageWrap } from "@/components/site";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Источники — AI: Эволюция интеллекта" },
      { name: "description", content: "Надёжные источники по истории ИИ: IBM, Институт Алана Тьюринга и статья о Transformer." },
      { property: "og:title", content: "Источники по истории ИИ" },
      { property: "og:description", content: "Проверенные ссылки и первоисточники." },
    ],
  }),
  component: () => (
    <div className={`${pageWrap} py-16`}>
      <SectionTitle eyebrow="Источники" title="Источники и литература" />
      <Sources defaultOpen />
    </div>
  ),
});
