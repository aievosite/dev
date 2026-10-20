import { createFileRoute } from "@tanstack/react-router";
import neural from "@/assets/neural.jpg";
import { historyImages } from "@/lib/history-images";
import { Approaches, Eras, SectionTitle, Timeline, pageWrap, useGoToTimeline } from "@/components/site";
import { AiToday } from "@/components/ai-today";

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
        <div className="conclusion-card p-7 md:p-9">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
            Искусственный интеллект <span className="text-gradient">меняет мир</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/90">
            Восемьдесят лет назад искусственный интеллект был гипотезой о мыслящей машине, а сегодня это программы, которые пишут код, находят галактики в наблюдениях и объясняют сложные темы простыми словами. Они не отменяют работу человека — они забирают рутину и открывают доступ к задачам, на которые раньше уходили годы подготовки.
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed">
            <span className="text-gradient">Поэтому важно понимать, как устроены эти системы, и осознанно решать, каким из их ответов можно доверять.</span>
          </p>
        </div>
      </section>
    </>
  );
}
