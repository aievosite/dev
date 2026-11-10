import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI: Эволюция интеллекта — история искусственного интеллекта" },
      { name: "description", content: "История искусственного интеллекта, его возможности и ограничения сегодня и каталог 21 ИИ-инструмента." },
      { property: "og:title", content: "AI: Эволюция интеллекта" },
      { property: "og:description", content: "От истории ИИ к современным применениям, агентам и практическим инструментам." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Hero />;
}
