import { ContactFormProvider } from "@/components/contact-form-provider";
import { IntroGate } from "@/components/intro/intro-gate";
import { V2Concepts } from "@/components/v2/v2-concepts";
import { V2Header } from "@/components/v2/v2-header";
import { V2Hero } from "@/components/v2/v2-hero";
import { V2Intro } from "@/components/v2/v2-intro";
import { V2Journey } from "@/components/v2/v2-journey";
import { V2Pillars } from "@/components/v2/v2-pillars";
import { V2ScrollProgress } from "@/components/v2/v2-scroll-progress";
import { V2Contact, V2Footer } from "@/components/v2/v2-sections";
import { V2_IMAGES } from "@/lib/v2-content";

export function LandingV2() {
  return (
    <ContactFormProvider siteVariant="2">
      <IntroGate heroImage={V2_IMAGES.hero}>
        <div className="v2-theme font-light">
          <V2ScrollProgress />
          <V2Header />
          <main>
            <V2Hero />
            <V2Intro />
            <V2Pillars />
            <V2Concepts />
            <V2Journey />
            <V2Contact />
          </main>
          <V2Footer />
        </div>
      </IntroGate>
    </ContactFormProvider>
  );
}
