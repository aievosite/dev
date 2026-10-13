import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { milestones, eras, quiz, sources, type Milestone } from "@/lib/content";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/history", label: "История ИИ" },
  { to: "/quiz", label: "Викторина" },
  { to: "/sources", label: "Источники" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-sm font-semibold tracking-widest">
          AI <span className="text-gradient">/ ЭВОЛЮЦИЯ</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Основная навигация">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/history" className="hidden rounded-full bg-gradient-accent px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:inline-flex">
            Начать путешествие
          </Link>
          <button className="rounded-md border px-3 py-2 text-sm md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Меню">
            ☰
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-5 py-3 md:hidden">
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

function TimelineItem({ m, i }: { m: Milestone; i: number }) {
  const [open, setOpen] = useState(false);
  const left = i % 2 === 0;
  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-12">
      <span className="absolute left-0 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-accent shadow-glow md:left-1/2" aria-hidden />
      <div className={`ml-6 md:ml-0 ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}>
        <article className="glass-card p-6 transition hover:shadow-glow">
          <p className="font-display text-2xl font-semibold text-gradient">{m.year}</p>
          <h3 className="mt-2 text-lg font-medium">{m.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{m.short}</p>
          {open && <p className="mt-4 border-t pt-4 text-sm leading-relaxed text-foreground/90 animate-in fade-in">{m.details}</p>}
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-4 text-sm font-semibold text-primary hover:underline">
            {open ? "Свернуть" : "Подробнее"}
          </button>
        </article>
      </div>
    </li>
  );
}

export function Timeline() {
  return (
    <ol className="relative space-y-8 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border md:before:left-1/2">
      {milestones.map((m, i) => <TimelineItem key={m.year} m={m} i={i} />)}
    </ol>
  );
}

export function Eras() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {eras.map((e, i) => (
        <article key={e.title} className="glass-card p-6">
          <p className="font-display text-4xl font-semibold text-muted-foreground/40">0{i + 1}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-primary">{e.period}</p>
          <h3 className="mt-2 text-lg font-medium">{e.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{e.text}</p>
        </article>
      ))}
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
  const q = quiz[idx];
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

export function Sources() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Источники</h3>
        <ul className="space-y-4">
          {sources.map((s) => (
            <li key={s.url} className="glass-card p-5">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary">{s.name} ↗</a>
              <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
              <p className="mt-2 break-all text-xs text-muted-foreground/70">{s.url}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Общие пояснения</h3>
        <div className="glass-card space-y-3 p-5 text-sm text-muted-foreground">
          <p>Описания событий на сайте — краткие авторские пересказы общеизвестных фактов, а не цитаты.</p>
          <p>Даты приведены по годам публикаций и событий; для подробностей обращайтесь к первоисточникам слева.</p>
        </div>
      </div>
    </div>
  );
}

export const pageWrap = "mx-auto max-w-6xl px-5";
