import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { Tool } from "@/lib/tools";
import { SectionTitle, pageWrap } from "@/components/site";
import { toolCategories, tools } from "@/lib/tools";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Нейросети и ИИ-инструменты — AI: Эволюция интеллекта" },
      { name: "description", content: "Каталог ИИ-инструментов: ассистенты, поиск, программирование, изображения, видео и звук — для каких задач подходит каждый." },
      { property: "og:title", content: "Нейросети и ИИ-инструменты — каталог" },
      { property: "og:description", content: "Какой ИИ-инструмент выбрать для учёбы, исследований, кода и творчества." },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => (!cat || t.category === cat) && (!q || [t.name, t.what, t.tasks, t.kind].join(" ").toLowerCase().includes(q)));
  }, [query, cat]);
  const reset = () => { setQuery(""); setCat(null); };
  const chip = (active: boolean) => `shrink-0 rounded-full border px-4 py-2 text-sm transition ${active ? "border-primary bg-primary/15 text-foreground" : "text-muted-foreground hover:border-primary hover:text-foreground"}`;

  return (
    <div className={`${pageWrap} py-16`}>
      <SectionTitle eyebrow="Современность" title="Нейросети и ИИ-инструменты" text="Практический путеводитель: какой инструмент подходит для учёбы, исследований, программирования и творчества. Обратите внимание: одни продукты — это модели, другие — приложения или платформы, которые дают доступ к одной или нескольким моделям." />

      <div className="space-y-4">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по названию или задаче: например, «презентация» или «код»" aria-label="Поиск инструментов" className="w-full rounded-xl border bg-card px-5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary" />
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Категории">
          <button onClick={() => setCat(null)} className={chip(cat === null)} aria-pressed={cat === null}>Все</button>
          {toolCategories.map((c) => (
            <button key={c} onClick={() => setCat(cat === c ? null : c)} className={chip(cat === c)} aria-pressed={cat === c}>{c}</button>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Найдено: {list.length}</span>
          {(query || cat) && <button onClick={reset} className="font-semibold text-primary hover:underline">Сбросить фильтры</button>}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="glass-card mt-8 p-10 text-center">
          <p className="font-medium">Ничего не найдено</p>
          <p className="mt-2 text-sm text-muted-foreground">Попробуйте другой запрос или выберите другую категорию.</p>
          <button onClick={reset} className="mt-5 rounded-full bg-gradient-accent px-5 py-2 text-sm font-semibold text-primary-foreground">Показать все инструменты</button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <article key={t.name} className="glass-card flex flex-col p-6 transition hover:shadow-glow">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.category}</p>
              <div className="mt-3 flex items-center gap-3"><ToolLogo t={t} /><h3 className="text-xl font-semibold">{t.name}</h3></div>
              <p className="mt-1 text-xs text-muted-foreground">{t.kind}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">{t.what}</p>
              <dl className="mt-4 flex-1 space-y-3 border-t pt-4 text-sm">
                <div><dt className="font-medium">Для каких задач</dt><dd className="mt-0.5 text-muted-foreground">{t.tasks}</dd></div>
                <div><dt className="font-medium text-success">Преимущества</dt><dd className="mt-0.5 text-muted-foreground">{t.pros}</dd></div>
                <div><dt className="font-medium text-destructive">Ограничения</dt><dd className="mt-0.5 text-muted-foreground">{t.cons}</dd></div>
              </dl>
              {t.url && <a href={t.url} target="_blank" rel="noopener noreferrer" className="mt-5 self-start text-sm font-semibold text-primary hover:underline">Официальный сайт ↗</a>}
            </article>
          ))}
        </div>
      )}
      <p className="mt-10 text-sm text-muted-foreground">Возможности, тарифы и доступность сервисов часто меняются — уточняйте актуальные условия на официальных сайтах.</p>
    </div>
  );
}

const logoDomain: Record<string, string> = { YandexGPT: "ya.ru", "Google Veo": "deepmind.google", "Google Gemini": "gemini.google.com" };

function ToolLogo({ t }: { t: Tool }) {
  const [failed, setFailed] = useState(false);
  const domain = logoDomain[t.name] ?? (t.url ? new URL(t.url).hostname : "");
  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border bg-card">
      {domain && !failed ? (
        <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={`Логотип ${t.name}`} width={30} height={30} loading="lazy" onError={() => setFailed(true)} className="h-7 w-7 rounded-[8px] object-contain" />
      ) : (
        <span className="text-sm font-semibold text-gradient">{t.name.slice(0, 2)}</span>
      )}
    </span>
  );
}
