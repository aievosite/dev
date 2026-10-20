import { Link } from "@tanstack/react-router";
import { SectionTitle, pageWrap } from "@/components/site";

const applications = [
  { title: "Медицина", text: "Алгоритмы компьютерного зрения анализируют рентгеновские снимки и другие медицинские изображения, помогая специалистам замечать признаки возможных заболеваний. Такие системы используются как вспомогательный инструмент при обследовании пациентов." },
  { title: "Наука", text: "В астрономии алгоритмы машинного обучения находят закономерности в наблюдениях и помогают классифицировать космические объекты. В других научных областях подобные методы применяются для анализа экспериментов и больших массивов данных." },
  { title: "Образование", text: "Нейросеть может объяснить тему другими словами, разобрать математическую задачу по шагам или составить дополнительные упражнения. Например, ученик может попросить показать несколько способов решения одного уравнения." },
  { title: "Программирование", text: "С помощью Cursor, GitHub Copilot и Lovable можно создавать фрагменты кода, исправлять ошибки и разрабатывать сайты по текстовому описанию. В Lovable пользователь формулирует задачу обычными словами, а платформа помогает создавать и изменять веб-приложение." },
];

const possibilities = [
  { title: "Быстрые объяснения и черновики", text: "Нейросеть объясняет тему простыми словами, создаёт черновики текстов и подсказывает идеи. Первый вариант легко переформулировать или дополнить." },
  { title: "Ускорение разработки", text: "Инструменты для программирования пишут код, находят ошибки и собирают страницы по описанию. То, что занимало дни, сейчас делается за часы." },
  { title: "Анализ больших данных", text: "Алгоритмы машинного обучения обрабатывают объёмы данных, которые человек не просмотрел бы вручную: находят закономерности, распознают объекты." },
  { title: "Создание визуального контента", text: "Генеративные модели создают изображения по описанию, преобразуют готовые материалы и меняют их стиль — например, карандашный набросок превращается в цветную картинку. Это удобно для иллюстраций и обложек проектов." },
];

const limitations = [
  { title: "Скорость не гарантирует точность", text: "ИИ может уверенно выдавать неверные сведения, выдуманные факты или ссылки. Важные утверждения нужно сверять с надёжными первоисточниками." },
  { title: "Готовый код требует проверки", text: "Сгенерированный код может содержать ошибки и уязвимости. Необходимо проверять работу сайта, доступ к данным и безопасность, а не только его внешний вид." },
  { title: "Результат зависит от данных и задачи", text: "Неполные, неточные или нерепрезентативные данные ухудшают ответ. Чёткий запрос помогает, но сам по себе не гарантирует правильный результат." },
  { title: "Ответственность остаётся у людей", text: "Использование ИИ затрагивает конфиденциальность, авторские права и предвзятость. Нельзя без разрешения загружать чужие личные данные; перед публикацией важно проверить права и оценить, не воспроизводит ли результат стереотипы." },
];

const future = [
  "Обычный диалоговый помощник отвечает на отдельные запросы. Агентный подход позволяет системе последовательно выполнять несколько действий: составлять план, использовать доступные инструменты и учитывать промежуточные результаты. Возможности таких систем зависят от конкретного продукта и предоставленных ему прав.",
  "Например, при разработке сайта ИИ-инструмент может предложить изменение интерфейса, помочь исправить ошибку или подготовить код для новой функции. Человек определяет задачу, оценивает результат и решает, какие изменения оставить.",
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
                <h4 className="text-2xl font-bold leading-tight tracking-tight text-primary md:text-3xl">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <BlockHeading>Возможности и ограничения ИИ</BlockHeading>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-success">
                <span aria-hidden className="h-4 w-1 rounded-full bg-success/70" />
                Возможности
              </p>
              <div className="space-y-4">
                {possibilities.map((item) => (
                  <article key={item.title} className="glass-card min-w-0 border-l-2 border-l-success/50 p-5 transition hover:border-success/40 md:flex md:min-h-[168px] md:flex-col md:justify-center">
                    <h4 className="text-base font-medium text-success">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-destructive">
                <span aria-hidden className="h-4 w-1 rounded-full bg-destructive/70" />
                Ограничения
              </p>
              <div className="space-y-4">
                {limitations.map((item) => (
                  <article key={item.title} className="glass-card min-w-0 border-l-2 border-l-destructive/50 p-5 transition hover:border-destructive/40 md:flex md:min-h-[168px] md:flex-col md:justify-center">
                    <h4 className="text-base font-medium text-destructive">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <p className="accent-panel mt-5 p-6 leading-relaxed text-foreground/90">Результаты ИИ следует проверять, особенно когда от точности зависят здоровье, безопасность, оценки или решения других людей. ИИ помогает в работе, но не снимает ответственности за её результат.</p>
        </div>
        <div className="glass-card min-w-0 p-6 md:p-8">
          <BlockHeading>Будущее ИИ: от помощника к агенту</BlockHeading>
          <div className="space-y-4">
            {future.map((text, i) => (
              <p key={i} className="leading-relaxed text-foreground/90">{text}</p>
            ))}
          </div>
          <p className="mt-6 border-t border-border/60 pt-6 text-sm leading-relaxed text-muted-foreground">
            Хотите попробовать современные ИИ-инструменты на практике? Посмотрите, какие нейросети помогают работать с текстом, изображениями, поиском информации и программированием.
          </p>
          <Link
            to="/tools"
            className="group mt-3 inline-flex min-h-11 items-center gap-1.5 font-medium text-primary transition hover:text-violet"
          >
            Изучить нейросети и ИИ-инструменты
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
