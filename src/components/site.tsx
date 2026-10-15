import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { milestones, periods, eras, quiz, approaches, type Milestone } from "@/lib/content";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/history", label: "История ИИ" },
  { to: "/tools", label: "Нейросети и ИИ-инструменты" },
  { to: "/quiz", label: "Викторина" },
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

export function useGoToTimeline() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  return (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    if (pathname === "/") smoothScrollTo("timeline");
    else navigate({ to: "/" }).then(() => setTimeout(() => smoothScrollTo("timeline"), 80));
  };
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
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-sm font-semibold tracking-widest">
          AI <span className="text-gradient">/ ЭВОЛЮЦИЯ</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
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
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-muted-foreground hover:text-foreground">
              {n.label}
            </Link>
          ))}
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

function Article({ m, onClose }: { m: Milestone; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm animate-in fade-in sm:items-center sm:p-6" onClick={onClose}>
      <article role="dialog" aria-modal="true" aria-labelledby="art-title" onClick={(e) => e.stopPropagation()} className="glass-card article-scroll max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-b-none p-6 text-left sm:rounded-b-xl md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold text-gradient">{m.year}</p>
            <h3 id="art-title" className="mt-2 text-2xl font-semibold">{m.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Закрыть" className="rounded-full border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">✕</button>
        </div>
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
    </div>
  );
}

function TimelineItem({ m }: { m: Milestone }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <article className="glass-card flex h-full flex-col border-l-2 border-l-primary/60 p-5 transition hover:shadow-glow">
        <p className="font-display text-xl font-semibold text-gradient">{m.year}</p>
        <h4 className="mt-1.5 font-medium">{m.title}</h4>
        <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{m.short}</p>
        <button onClick={() => setOpen(true)} className="mt-3 self-start text-sm font-semibold text-primary hover:underline">Подробнее</button>
      </article>
      {open && <Article m={m} onClose={() => setOpen(false)} />}
    </li>
  );
}

export function Timeline() {
  return (
    <div>
      <nav aria-label="Периоды истории" className="sticky top-[65px] z-30 -mx-5 mb-10 flex gap-2 overflow-x-auto bg-background/85 px-5 py-3 backdrop-blur-md">
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
              {milestones.slice(p.from, p.to).map((m) => <TimelineItem key={m.year} m={m} />)}
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
      {eras.map((e, i) => (
        <li key={e.title} className="glass-card flex flex-col p-5 md:p-6">
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
      ))}
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
      <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
        Эти этапы — не простая смена технологий, при которой старое исчезает. Подходы сосуществуют: правила и поиск по-прежнему используются там, где нужна точность и объяснимость, глубокие нейросети — разновидность машинного обучения, а генеративные модели построены на глубоких сетях.
      </p>
    </div>
  );
}

export function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = idx >= quiz.length;
  if (done)
    return (
      <div className="glass-card p-8 text-center">
        <p className="font-display text-5xl font-semibold text-gradient">{score} / {quiz.length}</p>
        <p className="mt-4 text-muted-foreground">{score === quiz.length ? "Превосходно! Вы отлично знаете историю ИИ." : score >= quiz.length / 2 ? "Хороший результат! Загляните в хронологию, чтобы узнать больше." : "Есть куда расти — история ИИ ждёт вас."}</p>
        <button onClick={() => { setIdx(0); setScore(0); setPicked(null); }} className="mt-6 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-primary-foreground">Пройти ещё раз</button>
      </div>
    );
  const q = quiz[idx]!;
  return (
    <div className="glass-card p-6 md:p-8">
      <p className="text-xs uppercase tracking-widest text-primary">Вопрос {idx + 1} из {quiz.length}</p>
      <h3 className="mt-3 text-xl font-medium">{q.q}</h3>
      <div className="mt-6 grid gap-3">
        {q.options.map((o, i) => {
          const state = picked === null ? "border-border hover:border-primary" : i === q.answer ? "border-success bg-success/10" : i === picked ? "border-destructive bg-destructive/10" : "border-border opacity-60";
          return (
            <button key={o} disabled={picked !== null} onClick={() => { setPicked(i); if (i === q.answer) setScore((s) => s + 1); }} className={`rounded-lg border px-4 py-3 text-left text-sm transition ${state}`}>
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button onClick={() => { setIdx(idx + 1); setPicked(null); }} className="mt-6 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-primary-foreground">
          {idx + 1 === quiz.length ? "Узнать результат" : "Следующий вопрос"}
        </button>
      )}
    </div>
  );
}


export const pageWrap = "mx-auto max-w-6xl px-5";
