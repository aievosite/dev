import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: markup is visible before hydration and without observers. */
export function ContentMotion({ children, calm = false }: { children: ReactNode; calm?: boolean }) {
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = scope.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (!preference.matches) element.dataset["motion"] = "revealing";
      }
    }, { threshold: 0.08 });
    const scan = () => {
      root.querySelectorAll<HTMLElement>(".glass-card, .accent-panel, .conclusion-card, h1, h2, h3, p").forEach((element) => {
        if (seen.has(element) || element.closest("[data-motion-static]") || element.parentElement?.closest(".glass-card, .accent-panel, .conclusion-card")) return;
        seen.add(element);
        const siblings = Array.from(element.parentElement?.children ?? []);
        const index = Math.max(0, siblings.indexOf(element));
        element.style.setProperty("--reveal-delay", `${Math.min(index, 3) * (calm ? 45 : 70)}ms`);
        observer.observe(element);
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(root, { childList: true, subtree: true });
    const finish = (event: Event) => {
      const element = event.target;
      if (element instanceof HTMLElement && element.dataset["motion"] === "revealing") element.dataset["motion"] = "done";
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const card = event.target.closest<HTMLElement>("[data-motion]");
      if (card) card.dataset["motion"] = "done";
    };
    root.addEventListener("animationend", finish);
    root.addEventListener("focusin", focus);

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      root.querySelectorAll<HTMLElement>("[data-timeline-progress]").forEach((track) => {
        const rect = track.getBoundingClientRect();
        const value = preference.matches ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.65 - rect.top) / rect.height));
        track.style.setProperty("--timeline-progress", String(value));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    updateProgress();
    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.removeEventListener("animationend", finish);
      root.removeEventListener("focusin", focus);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, [calm]);
  return <div ref={scope} className={`content-motion${calm ? " content-motion-calm" : ""}`}>{children}</div>;
}