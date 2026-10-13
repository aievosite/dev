import { createFileRoute } from "@tanstack/react-router";
import { Quiz, SectionTitle, pageWrap } from "@/components/site";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Викторина по истории ИИ — AI: Эволюция интеллекта" },
      { name: "description", content: "Проверьте свои знания истории искусственного интеллекта в короткой викторине." },
      { property: "og:title", content: "Викторина: насколько хорошо ты знаешь историю ИИ?" },
      { property: "og:description", content: "Шесть вопросов об истории искусственного интеллекта." },
    ],
  }),
  component: () => (
    <div className={`${pageWrap} max-w-3xl py-16`}>
      <SectionTitle eyebrow="Викторина" title="Насколько хорошо ты знаешь историю ИИ?" />
      <Quiz />
    </div>
  ),
});
