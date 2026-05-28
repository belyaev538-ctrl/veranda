import { Cta } from "@/components/cta";
import { EditorialGrid } from "@/components/editorial-grid";
import { FilmGrain } from "@/components/film-grain";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Materials } from "@/components/materials";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { ScrollMotionProvider } from "@/components/motion/scroll-provider";
import { Philosophy } from "@/components/philosophy";
import { Production } from "@/components/production";
import { Service } from "@/components/service";
import { SocialProof } from "@/components/social-proof";
import { TrustBar } from "@/components/trust-bar";

export default function Home() {
  return (
    <>
      <Header />
      <ScrollMotionProvider>
        <FilmGrain />
        <Hero />
        <TrustBar />
        <Philosophy />
        <Production />
        <EditorialGrid />
        <Materials />
        <Service />
        <SocialProof />
        <Gallery />
        <Cta />
      </ScrollMotionProvider>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
