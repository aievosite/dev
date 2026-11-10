import { Link } from "@tanstack/react-router";
import { GlassCube } from "@/components/glass-cube";
import { pageWrap } from "@/components/site";
import { Button } from "@/components/ui/button";

/** Unchanged text entrance beside a generated, theme-aware glass illustration. */
export function Hero() {
  return (
    <>
    <div className="hero-corner-glow" aria-hidden="true" />
    <section className={`${pageWrap} hero-stage grid items-center gap-10 py-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:py-24`}>
      <div className="hero-copy min-w-0">
        <p className="hero-enter hero-d1 mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">1936 — 2026</p>
        <h1 className="hero-enter hero-d2 relative z-10 text-4xl font-semibold leading-[1.1] lg:text-5xl xl:text-6xl">
          От первых алгоритмов до <span className="text-gradient">искусственного интеллекта</span> будущего
        </h1>
        <p className="hero-enter hero-d3 mt-6 max-w-lg text-lg text-muted-foreground">
          От первых алгоритмов до генеративных нейросетей. Десятилетия открытий и технологических прорывов.
        </p>
        <Button asChild className="hero-enter hero-d4 hero-cta mt-8 h-auto min-h-14 w-[266px] max-w-full whitespace-nowrap rounded-full bg-gradient-accent px-5 py-5 text-lg font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
          <Link to="/history">Исследовать историю</Link>
        </Button>
      </div>

      <div className="hero-visual relative min-w-0">
        <GlassCube />
      </div>
    </section>
    </>
  );
}
