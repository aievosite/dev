import { createFileRoute, Link } from "@tanstack/react-router";
import neural from "@/assets/neural.jpg";
import { pageWrap } from "@/components/site";
import { Button } from "@/components/ui/button";

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
  return (
    <>
      <section className={`${pageWrap} grid items-center gap-10 py-12 md:py-16 md:grid-cols-2 md:py-24`}>
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">1936 — 2026</p>
          <h1 className="relative z-10 text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl">
            От первых алгоритмов до <span className="text-gradient">искусственного интеллекта</span> будущего
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            От первых алгоритмов до генеративных нейросетей. Десятилетия открытий и технологических прорывов.
          </p>
          <Button asChild className="mt-8 h-auto min-h-14 w-[233px] max-w-full whitespace-nowrap rounded-full bg-gradient-accent px-3 py-5 text-lg font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
            <Link to="/history">Исследовать историю</Link>
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-10 rounded-full bg-gradient-accent opacity-20 blur-3xl" aria-hidden />
          <img src={neural} alt="Абстрактная нейронная сеть в форме мозга" width={1024} height={1024} className="relative animate-float rounded-full hero-blend" />
        </div>
      </section>

    </>
  );
}
