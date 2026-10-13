import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { milestones, eras, quiz, approaches, primarySources, explanatorySources, type Milestone, type Source } from "@/lib/content";

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

function Article({ m, onClose }: { m: Milestone; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm animate-in fade-in sm:items-center sm:p-6" onClick={onClose}>
      <article role="dialog" aria-modal="true" aria-labelledby="art-title" onClick={(e) => e.stopPropagation()} className="glass-card max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-b-none p-6 text-left sm:rounded-b-xl md:p-10">
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
          <button onClick={() => setOpen(true)} className="mt-4 text-sm font-semibold text-primary hover:underline">Подробнее</button>
        </article>
      </div>
      {open && <Article m={m} onClose={() => setOpen(false)} />}
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

function EraCard({ e, i }: { e: (typeof eras)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="glass-card flex flex-col p-6">
      <p className="font-display text-4xl font-semibold text-muted-foreground/40">0{i + 1}</p>
      <p className="mt-4 text-xs uppercase tracking-widest text-primary">{e.period}</p>
      <h3 className="mt-2 text-lg font-medium">{e.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{e.text}</p>
      {open && <ul className="mt-4 space-y-2 border-t pt-4 text-sm animate-in fade-in">{e.more.map((t) => <li key={t} className="leading-relaxed text-foreground/90">— {t}</li>)}</ul>}
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-4 self-start text-sm font-semibold text-primary hover:underline">{open ? "Свернуть" : "Читать далее"}</button>
    </article>
  );
}

export function Eras() {
  return (
    <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {eras.map((e, i) => <EraCard key={e.title} e={e} i={i} />)}
    </div>
  );
}

export function Approaches() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approaches.map((a, i) => (
          <article key={a.title} className="glass-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Подход {i + 1}</p>
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
        Эти подходы не отделены друг от друга жёсткими границами: глубокие нейросети — разновидность машинного обучения, генеративные модели построены на глубоких сетях, а современные системы нередко сочетают обученные модели с явными правилами и поиском.
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

function SourceList({ items }: { items: Source[] }) {
  return (
    <ol className="space-y-4">
      {items.map((s) => (
        <li key={s.url} className="glass-card p-5">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary">{s.name} ↗</a>
          <p className="mt-1 text-sm text-foreground/80">{s.meta}</p>
          <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
          <p className="mt-2 break-all text-xs text-muted-foreground/70">{s.url}</p>
        </li>
      ))}
    </ol>
  );
}

export function Sources() {
  return (
    <div className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary">Первоисточники</h3>
          <p className="mb-4 text-sm text-muted-foreground">Оригинальные научные статьи и документы.</p>
          <SourceList items={primarySources} />
        </div>
        <div>
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-violet">Пояснительные материалы</h3>
          <p className="mb-4 text-sm text-muted-foreground">Ресурсы институтов и энциклопедий.</p>
          <SourceList items={explanatorySources} />
        </div>
      </div>
      <div className="glass-card space-y-3 p-5 text-sm text-muted-foreground">
        <p>Тексты на сайте — авторские пересказы, а не цитаты. Цифры (счёт матчей, доли ошибок, число параметров) приведены по первоисточникам и официальным материалам.</p>
        <p>Сведения о 2025–2026 годах описывают направления развития; конкретные заявления компаний стоит проверять по свежим независимым источникам.</p>
      </div>
    </div>
  );
}

export const pageWrap = "mx-auto max-w-6xl px-5";
