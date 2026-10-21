import { JourneyNext } from "@/components/journey-next";
import { pageWrap } from "@/components/site";

export function Conclusion() {
  return (
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
      <JourneyNext to="/about">Об авторе</JourneyNext>
    </section>
  );
}