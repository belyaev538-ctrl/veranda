import { V2Hero } from "@/components/v2/v2-hero";
import { markIntroSeen } from "@/lib/intro-storage";
import { V5_HERO_LINES, V5_IMAGES } from "@/lib/v5-content";

export function V5Hero() {
  return (
    <V2Hero
      sectionId="v5-hero"
      heroImage={V5_IMAGES.hero}
      heroLines={V5_HERO_LINES}
      scrollZoomMultiplier={3}
      scrollLinesFromStart
      heroScrollHeight="420vh"
      heroEndFlicker
      lightRays
      lightRaysColor="#7ec8ff"
      heroImageLoader
      heroCompassCenter
      onHeroLoaderDismissed={() => markIntroSeen("v5")}
    />
  );
}
