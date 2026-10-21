import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { useModalPageLock } from "@/hooks/use-modal-page-lock";
import { milestones, periods, eras, approaches, type Milestone } from "@/lib/content";
import { EventImage, type HistoricalImage } from "@/components/event-image";
import { EraImage } from "@/components/era-image";
import { eraImages } from "@/lib/era-images";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/history", label: "История ИИ" },
  { to: "/tools", label: "Нейросети и ИИ-инструменты" },
  { to: "/about", label: "Об авторе" },
] as const;

export function smoothScrollTo(id: string, duration = 750) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - 80;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { window.scrollTo(0, targetY); return; }
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const t0 = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, startY + (targetY - startY) * ease(t));
    if (t < 1) requestAnimationFrame(step); else root.style.scrollBehavior = prev;
  };
  requestAnimationFrame(step);
}

export function scrollToTop(duration = 650) {
  const startY = window.scrollY;
  if (startY <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { window.scrollTo(0, 0); return; }
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const t0 = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, startY * (1 - ease(t)));
    if (t < 1) requestAnimationFrame(step); else { window.scrollTo(0, 0); root.style.scrollBehavior = prev; }
  };
  requestAnimationFrame(step);
}

export function useGoToHomeSection(id: string) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  return (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    if (pathname === "/") smoothScrollTo(id);
    else navigate({ to: "/", hash: id }).then(() => setTimeout(() => smoothScrollTo(id), 80));
  };
}

export function useGoToTimeline() {
  return useGoToHomeSection("timeline");
}

function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try { localStorage.setItem("theme", next ? "light" : "dark"); } catch {}
  };
  const label = light ? "Включить тёмную тему" : "Включить светлую тему";
  return (
    <button onClick={toggle} aria-label={label} title={label} className="grid h-9 w-9 place-items-center rounded-full border bg-card text-foreground transition hover:border-primary hover:text-primary">
      {light ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      )}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const goTimeline = useGoToTimeline();
  const goAiToday = useGoToHomeSection("ai-today");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const goHome = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (pathname === "/") scrollToTop();
    else navigate({ to: "/" }).then(() => setTimeout(() => scrollToTop(0), 80));
  };
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" aria-label="На главную страницу" onClick={goHome} className="font-display text-sm font-semibold tracking-widest">
          AI <span className="text-gradient">/ ЭВОЛЮЦИЯ</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
          <a href="/#ai-today" onClick={goAiToday} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ИИ сегодня
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="/#timeline" onClick={goTimeline} className="hidden rounded-full bg-gradient-accent px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:inline-flex">
            Начать путешествие
          </a>
          <ThemeToggle />
          <button className="rounded-md border px-3 py-2 text-sm lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Меню">
            ☰
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-5 py-3 lg:hidden">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="py-2 text-muted-foreground hover:text-foreground">
              {n.label}
            </Link>
          ))}
          <a href="/#ai-today" onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goAiToday(), 80); }} className="py-2 text-muted-foreground hover:text-foreground">
            ИИ сегодня
          </a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-2">
        <div>
          <p className="font-display text-sm font-semibold tracking-widest">AI: Эволюция интеллекта</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Путеводитель по ключевым этапам истории искусственного интеллекта — от машины Тьюринга до генеративных моделей.
          </p>
        </div>
        <p className="text-sm text-muted-foreground md:text-right">
          Сайт является образовательным проектом и не преследует коммерческих целей.
          <br />© 2026
        </p>
      </div>
    </footer>
  );
}

export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

function Article({ m, image, showImage, onClose }: { m: Milestone; image?: HistoricalImage | undefined; showImage?: boolean; onClose: () => void }) {
  useModalPageLock();
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    dialogRef.current?.focus({ preventScroll: true });
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("keydown", k);
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
  }, [onClose]);
  return createPortal(
    <div className="event-modal-overlay fixed inset-x-0 top-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm animate-in fade-in sm:items-center" onClick={onClose}>
      <article ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="art-title" onClick={(e) => e.stopPropagation()} className="glass-card event-modal article-scroll min-h-0 w-full max-w-2xl overflow-y-auto rounded-b-none p-6 text-left outline-none sm:rounded-b-xl md:p-10">
        <div className="sticky top-0 z-10 flex h-0 justify-end">
          <Button variant="ghost" onClick={onClose} aria-label="Закрыть" className="event-modal-close size-[36px] shrink-0 rounded-full border p-0 text-sm leading-none text-muted-foreground hover:text-foreground">✕</Button>
        </div>
        <div className="min-w-0 pr-14">
          <p className="font-display text-2xl font-semibold text-gradient">{m.year}</p>
          <h3 id="art-title" className="mt-2 text-2xl font-semibold">{m.title}</h3>
        </div>
        {showImage && <EventImage key={m.year} image={image} />}
        <div className="mt-6 space-y-6">
          {m.sections.map((s) => (
            <section key={s.h}>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{s.h}</h4>
              {s.p?.map((t) => <p key={t} className="mb-3 leading-relaxed text-foreground/90">{t}</p>)}
              {s.list && <ul className="space-y-2">{s.list.map((t) => <li key={t} className="flex gap-3 leading-relaxed text-foreground/90"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-accent" />{t}</li>)}</ul>}
            </section>
          ))}
          <div className="rounded-lg border-l-2 border-primary bg-primary/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Главное</p>
            <p className="mt-2 leading-relaxed">{m.takeaway}</p>
          </div>
        </div>
      </article>
    </div>, document.body
  );
}

function TimelineItem({ m, images }: { m: Milestone; images?: Record<string, HistoricalImage> | undefined }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <article className="glass-card flex h-full flex-col border-l-2 border-l-primary/60 p-5 transition hover:shadow-glow">
        <p className="font-display text-xl font-semibold text-gradient">{m.year}</p>
        <h4 className="mt-1.5 font-medium">{m.title}</h4>
        <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{m.short}</p>
        <button onClick={() => setOpen(true)} className="mt-3 self-start text-sm font-semibold text-primary hover:underline">Подробнее</button>
      </article>
      {open && <Article m={m} image={images?.[m.year]} showImage={images !== undefined} onClose={() => setOpen(false)} />}
    </li>
  );
}

export function Timeline({ images }: { images?: Record<string, HistoricalImage> } = {}) {
  return (
    <div>
      <nav aria-label="Периоды истории" className="sticky top-[65px] z-30 -mx-5 mb-10 flex gap-2 overflow-x-auto bg-transparent px-5 py-3">
        {periods.map((p) => (
          <a key={p.id} href={`#period-${p.id}`} className="shrink-0 rounded-full border px-4 py-2 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
            {p.label} <span className="text-xs opacity-70">{p.range}</span>
          </a>
        ))}
      </nav>
      <div className="space-y-12">
        {periods.map((p, i) => (
          <section key={p.id} id={`period-${p.id}`} className="scroll-mt-40 md:grid md:grid-cols-[200px_1fr] md:gap-8">
            <header className="mb-4 md:mb-0">
              <p className="font-display text-sm text-muted-foreground/50">0{i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{p.label}</h3>
              <p className="text-sm text-primary">{p.range}</p>
            </header>
            <ol className="grid gap-4 sm:grid-cols-2">
              {milestones.slice(p.from, p.to).map((m) => <TimelineItem key={m.year} m={m} images={images} />)}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Eras() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {eras.map((e, i) => {
        const image = eraImages[e.period];
        return (
        <li key={e.title} className="glass-card flex flex-col p-5 md:p-6">
          {image && <EraImage image={image} />}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-semibold text-muted-foreground/40">0{i + 1}</span>
            <span className="text-xs uppercase tracking-widest text-primary">{e.period}</span>
          </div>
          <h3 className="mt-2 text-lg font-medium">{e.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
          <ul className="mt-4 space-y-2 border-t pt-4 text-sm">
            {e.more.map((t) => <li key={t} className="leading-relaxed text-foreground/90">— {t}</li>)}
          </ul>
        </li>
        );
      })}
    </ol>
  );
}

export function Approaches() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approaches.map((a, i) => (
          <article key={a.title} className="glass-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Этап {i + 1}</p>
            <h3 className="mt-2 text-lg font-medium">{a.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{a.how}</p>
            <p className="mt-3 text-sm text-muted-foreground"><span className="text-foreground">Пример: </span>{a.example}</p>
            <dl className="mt-4 space-y-2 border-t pt-4 text-sm">
              <div><dt className="inline text-success">+ </dt><dd className="inline text-muted-foreground">{a.plus}</dd></div>
              <div><dt className="inline text-destructive">− </dt><dd className="inline text-muted-foreground">{a.minus}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

export const pageWrap = "mx-auto max-w-6xl px-5";
