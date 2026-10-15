import { createFileRoute, Link } from "@tanstack/react-router";
import neural from "@/assets/neural-brain.png";
import { Approaches, Eras, SectionTitle, Timeline, pageWrap, useGoToTimeline } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI: Эволюция интеллекта — история искусственного интеллекта" },
      { name: "description", content: "От машины Тьюринга до генеративного ИИ 2026 года: ключевые вехи истории искусственного интеллекта." },
      { property: "og:title", content: "AI: Эволюция интеллекта" },
      { property: "og:description", content: "Интерактивная хронология истории искусственного интеллекта." },
    ],
  }),
  component: Index,
});

function Index() {
  const goTimeline = useGoToTimeline();
  return (
    <>
      <section className={`${pageWrap} grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-12 md:py-20`}>
        <div className="relative z-10 min-w-0">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">1936 — 2026</p>
          <h1 className="text-3xl font-semibold leading-[1.15] [overflow-wrap:anywhere] sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
            От первых алгоритмов до <span className="text-gradient">искусственного интеллекта</span> будущего
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            От первых алгоритмов до генеративных нейросетей. Десятилетия открытий и технологических прорывов.
          </p>
          <a href="#timeline" onClick={goTimeline} className="mt-8 inline-flex rounded-full bg-gradient-accent px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
            Исследовать историю
          </a>
        </div>
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-sm md:max-w-md">
          <div className="absolute inset-[20%] rounded-full bg-gradient-accent opacity-25 blur-3xl" aria-hidden />
          <img src={neural} alt="Абстрактная нейронная сеть в форме мозга" width={1024} height={1024} className="relative h-auto w-full animate-float" />
        </div>
      </section>

      <section id="timeline" className={`${pageWrap} scroll-mt-24 py-12 md:py-16`}>
        <SectionTitle eyebrow="Хронология" title="Девять этапов, которые определили историю ИИ" text="Нажмите «Подробнее», чтобы открыть подробную статью о каждом этапе." />
        <Timeline />
      </section>

      <section className={`${pageWrap} py-12 md:py-16`}>
        <SectionTitle eyebrow="Как развивался ИИ" title="Шесть этапов развития ИИ" text="Главные идеи, которые связывают историю с современными ИИ-инструментами." />
        <Approaches />
      </section>

      <section className={`${pageWrap} py-12 md:py-16`}>
        <SectionTitle eyebrow="Эпохи" title="Четыре эпохи развития" />
        <Eras />
      </section>

      <section className={`${pageWrap} py-12 md:py-16`}>
        <div className="glass-card relative overflow-hidden p-10 md:p-14">
          <div className="absolute inset-0 bg-gradient-accent opacity-10" aria-hidden />
          <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-primary">Современность</p>
          <h2 className="relative mt-3 text-2xl font-semibold md:text-4xl">Нейросети и ИИ-инструменты</h2>
          <p className="relative mt-4 max-w-2xl text-muted-foreground">Познакомьтесь с ИИ-инструментами для учёбы, исследований, программирования и творчества: 21 сервис с описанием задач, преимуществ и ограничений.</p>
          <Link to="/tools" className="relative mt-8 inline-flex rounded-full bg-gradient-accent px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">Открыть каталог →</Link>
        </div>
      </section>

      <section className={`${pageWrap} py-12 md:py-16`}>
        <div className="glass-card relative overflow-hidden p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-gradient-accent opacity-10" aria-hidden />
          <h2 className="relative text-2xl font-semibold md:text-4xl">Насколько хорошо ты знаешь историю ИИ?</h2>
          <p className="relative mt-4 text-muted-foreground">Шесть вопросов — проверьте себя за пару минут.</p>
          <Link to="/quiz" className="relative mt-8 inline-flex rounded-full bg-gradient-accent px-7 py-3.5 font-semibold text-primary-foreground">
            Пройти викторину
          </Link>
        </div>
      </section>
    </>
  );
}
