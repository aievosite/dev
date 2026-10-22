type SectionBannerProps = {
  src: string;
  alt: string;
  position?: string;
};

export function SectionBanner({ src, alt, position = "object-center" }: SectionBannerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden bg-muted sm:aspect-[3/1] lg:aspect-[4/1]">
      <img
        src={src}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className={`h-full w-full object-cover ${position}`}
      />
    </div>
  );
}