import { useState } from "react";
import type { HistoricalImage } from "@/components/event-image";

export function EraImage({ image }: { image: HistoricalImage }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="-mx-5 -mt-5 mb-5 md:-mx-6 md:-mt-6">
      <div className="aspect-video w-full overflow-hidden rounded-t-[var(--radius-xl)] bg-background">
        <img src={image.src} alt={image.alt} width={1600} height={900} loading="lazy" decoding="async" className="block h-full w-full object-cover" onError={() => setFailed(true)} />
      </div>
      <figcaption className="mt-2 px-5 text-[10px] leading-relaxed text-muted-foreground md:px-6">
        <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">{image.credit}</a>
      </figcaption>
    </figure>
  );
}