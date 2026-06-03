import { ContactFormProvider } from "@/components/contact-form-provider";
import { Cta } from "@/components/cta";
import { EditorialGrid } from "@/components/editorial-grid";
import { FilmGrain } from "@/components/film-grain";
import { Footer } from "@/components/footer";
import { Founder } from "@/components/founder";
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
import { Workflow } from "@/components/workflow";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { VersionSwitcherDock } from "@/components/shared/version-switcher";
import type { SiteVariant } from "@/lib/site-variant";

type LandingPageProps = {
  variant?: SiteVariant;
};

export function LandingPage({ variant = "1" }: LandingPageProps) {
  return (
    <ContactFormProvider siteVariant={variant}>
      <Header />
      <ScrollMotionProvider>
        <FilmGrain />
        <Hero />
        <Philosophy />
        <Production />
        <Workflow />
        <EditorialGrid />
        <Materials />
        <Service />
        <SocialProof />
        <Gallery />
        <Cta />
        <Founder />
      </ScrollMotionProvider>
      <Footer />
      <MobileStickyCta />
      <ScrollProgress tone="light" />
      <VersionSwitcherDock current={variant} />
    </ContactFormProvider>
  );
}
