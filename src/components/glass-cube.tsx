import emblemImage from "@/assets/emblem-hero.png";

/** Site emblem in the hero: rises with the copy, floats slowly, framed by the arc and glow. */
export function GlassCube() {
  return (
    <div className="glass-cube">
      <div className="glass-cube-enter">
        <div className="glass-cube-object">
          <img src={emblemImage} alt="Эмблема сайта «AI: Эволюция интеллекта»"
            width={1280} height={1280} fetchPriority="high" decoding="async" className="glass-cube-image" />
        </div>
      </div>
    </div>
  );
}
