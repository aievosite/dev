import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Нейросети и ИИ-инструменты — AI: Эволюция интеллекта" },
      { name: "description", content: "Каталог ИИ-инструментов: ассистенты, поиск, программирование, изображения, видео и звук — для каких задач подходит каждый." },
      { property: "og:title", content: "Нейросети и ИИ-инструменты — каталог" },
      { property: "og:description", content: "Какой ИИ-инструмент выбрать для учёбы, исследований, кода и творчества." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => { throw redirect({ to: "/", hash: "ai-tools", replace: true }); },
});
