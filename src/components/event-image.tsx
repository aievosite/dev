import { useState } from "react";

export type HistoricalImage = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
};

export function EventImage({ image }: { image?: HistoricalImage | undefined }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="mt-6">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-background">
        {image && !failed && (
          <img
            src={image.src}
            alt={image.alt}
            className="block h-full w-full object-contain"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {image && !failed && (
        <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
          <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
            {image.credit}
          </a>
        </figcaption>
      )}
    </figure>
  );
}