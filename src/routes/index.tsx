import { createFileRoute, Link } from "@tanstack/react-router";
import neural from "@/assets/neural.jpg";
import { historyImages } from "@/lib/history-images";
import { Approaches, Eras, SectionTitle, Timeline, pageWrap, useGoToTimeline } from "@/components/site";
import { AiToday } from "@/components/ai-today";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI: Эволюция интеллекта — история искусственного интеллекта" },
      { name: "description", content: "История искусственного интеллекта, его возможности и ограничения сегодня, каталог 21 ИИ-инструмента и викторина." },
      { property: "og:title", content: "AI: Эволюция интеллекта" },
      { property: "og:description", content: "От истории ИИ к современным применениям, агентам и практическим инструментам — с викториной для проверки знаний." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const goTimeline = useGoToTimeline();
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
          <a href="#timeline" onClick={goTimeline} className="mt-8 inline-flex rounded-full bg-gradient-accent px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
            Исследовать историю
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-10 rounded-full bg-gradient-accent opacity-20 blur-3xl" aria-hidden />
          <img src={neural} alt="Абстрактная нейронная сеть в форме мозга" width={1024} height={1024} className="relative animate-float rounded-full hero-blend" />
        </div>
      </section>

      <section id="timeline" className={`${pageWrap} scroll-mt-24 py-12 md:py-16`}>
        <SectionTitle eyebrow="Хронология" title="Девять этапов, которые определили историю ИИ" text="Нажмите «Подробнее», чтобы открыть подробную статью о каждом этапе." />
        <Timeline images={historyImages} />
        <div className="mt-24">
          <SectionTitle eyebrow="Как развивался ИИ" title="Шесть этапов развития ИИ" text="Главные идеи, которые связывают историю с современными ИИ-инструментами." />
          <Approaches />
        </div>
      </section>

      <section className={`${pageWrap} py-12 md:py-16`}>
        <SectionTitle eyebrow="Эпохи" title="Четыре эпохи развития" />
        <Eras />
      </section>

      <AiToday />

      <section className={`${pageWrap} py-12 md:py-16`}>
        <div className="cta-panel max-w-3xl p-7 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Викторина</p>
          <h2 className="mt-3 text-2xl font-semibold">Насколько хорошо ты знаешь историю ИИ?</h2>
          <p className="mt-3 text-foreground/85">Шесть вопросов — проверьте себя за пару минут.</p>
          <Link to="/quiz" className="mt-7 inline-flex rounded-full bg-gradient-accent px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
            Пройти викторину
          </Link>
        </div>
      </section>
    </>
  );
}
