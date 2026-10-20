import { Link } from "@tanstack/react-router";
import { SectionTitle, pageWrap } from "@/components/site";

const applications = [
  { title: "Медицина", text: "Алгоритмы компьютерного зрения анализируют рентгеновские снимки и другие медицинские изображения, помогая специалистам замечать признаки возможных заболеваний. Такие системы используются как вспомогательный инструмент при обследовании пациентов." },
  { title: "Наука", text: "В астрономии алгоритмы машинного обучения находят закономерности в наблюдениях и помогают классифицировать космические объекты. В других научных областях подобные методы применяются для анализа экспериментов и больших массивов данных." },
  { title: "Образование", text: "Нейросеть может объяснить тему другими словами, разобрать математическую задачу по шагам или составить дополнительные упражнения. Например, ученик может попросить показать несколько способов решения одного уравнения." },
  { title: "Программирование", text: "С помощью Cursor, GitHub Copilot и Lovable можно создавать фрагменты кода, исправлять ошибки и разрабатывать сайты по текстовому описанию. В Lovable пользователь формулирует задачу обычными словами, а платформа помогает создавать и изменять веб-приложение." },
];

const limitations = [
  { title: "Скорость не гарантирует точность", text: "ИИ быстро создаёт полезные объяснения и черновики, но может уверенно выдавать неверные сведения, выдуманные факты или ссылки. Важные утверждения нужно сверять с надёжными первоисточниками." },
  { title: "Готовый код требует проверки", text: "ИИ ускоряет разработку, но сгенерированный код может содержать ошибки и уязвимости. Необходимо проверять работу сайта, доступ к данным и безопасность, а не только его внешний вид." },
  { title: "Результат зависит от данных и задачи", text: "ИИ обрабатывает большие объёмы информации, однако неполные, неточные или нерепрезентативные данные ухудшают ответ. Чёткий запрос помогает, но сам по себе не гарантирует правильный результат." },
  { title: "Ответственность остаётся у людей", text: "Использование ИИ затрагивает конфиденциальность, авторские права и предвзятость. Нельзя без разрешения загружать чужие личные данные; перед публикацией материалов важно проверить права и оценить, не воспроизводит ли результат несправедливые стереотипы." },
];

const future = [
  "Обычный диалоговый помощник отвечает на отдельный запрос. Агентный подход связывает несколько действий: система составляет план, использует разрешённые инструменты, оценивает промежуточный результат и продолжает работу. Такой подход уже применяется в некоторых продуктах, но не означает полной самостоятельности или безошибочности.",
  "Например, ИИ-помощник в Cursor или агентный режим GitHub Copilot может помочь найти причину ошибки на сайте, изменить несколько файлов и запустить тесты. В Lovable можно описать новую страницу, посмотреть результат и попросить исправить форму или навигацию. Возможности зависят от продукта, режима и предоставленного доступа; изменения нужно проверять человеку.",
  "В перспективе агенты могут брать на себя более длинные рабочие процессы и лучше согласовывать действия между инструментами. Это направление развития, а не обещание гарантированной автономности. Надёжность, защита данных и контроль доступа остаются важными задачами; значимые действия должны выполняться под человеческим контролем.",
];

function BlockHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 text-2xl font-semibold">
      <span aria-hidden className="h-7 w-1 shrink-0 rounded-full bg-gradient-accent" />
      {children}
    </h3>
  );
}

export function AiToday() {
  return (
    <section id="ai-today" className={`${pageWrap} scroll-mt-24 py-12 md:py-16`}>
      <SectionTitle eyebrow="Современность" title="ИИ сегодня: возможности, ограничения и будущее" />
      <div className="space-y-14 md:space-y-16">
        <div>
          <BlockHeading>Как ИИ меняет нашу жизнь</BlockHeading>
          <div className="grid gap-5 md:grid-cols-2">
            {applications.map((item) => (
              <article key={item.title} className="glass-card min-w-0 p-6 transition hover:border-primary/50">
                <h4 className="text-lg font-medium text-primary">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <BlockHeading>Возможности и ограничения ИИ</BlockHeading>
          <div className="grid gap-5 md:grid-cols-2">
            {limitations.map((item) => (
              <article key={item.title} className="glass-card min-w-0 p-6 transition hover:border-violet/50">
                <h4 className="text-lg font-medium text-violet">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="accent-panel mt-5 p-6 leading-relaxed text-foreground/90">Результаты ИИ следует проверять, особенно когда от точности зависят здоровье, безопасность, оценки или решения других людей. ИИ помогает в работе, но не снимает ответственности за её результат.</p>
        </div>
        <div>
          <BlockHeading>Будущее ИИ: от помощника к агенту</BlockHeading>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {future.map((text, i) => (
              <article key={i} className={`glass-card min-w-0 p-6 transition hover:border-primary/50 ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                <span aria-hidden className="mb-4 block h-0.5 w-8 rounded-full bg-gradient-accent" />
                <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
              </article>
            ))}
          </div>
          <Link to="/tools" className="mt-6 inline-flex rounded-full bg-gradient-accent px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
            Нейросети и ИИ-инструменты
          </Link>
        </div>
      </div>
    </section>
  );
}
