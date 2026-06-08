import { ContactFormProvider } from "@/components/contact-form-provider";
import { IntroGate } from "@/components/intro/intro-gate";
import { V5Header } from "@/components/v5/v5-header";
import { V5Hero } from "@/components/v5/v5-hero";
import {
  V5Collections,
  V5Contact,
  V5Custom,
  V5Faq,
  V5Footer,
  V5Gallery,
  V5Materials,
  V5Nda,
  V5Production,
  V5Statement,
  V5Visualization,
  V5VisualChapters,
  V5Why,
  V5YachtTourSection,
} from "@/components/v5/v5-sections";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { VersionSwitcherDock } from "@/components/shared/version-switcher";
import { V5_IMAGES } from "@/lib/v5-content";

export function LandingV5() {
  return (
    <ContactFormProvider siteVariant="5">
      <IntroGate heroImage={V5_IMAGES.hero} introVariant="v5">
        <div className="v4-theme v5-site">
          <V5Header />
          <main>
            <V5Hero />
            <V5Statement />
            <V5VisualChapters />
            <V5Production />
            <V5YachtTourSection />
            <V5Custom />
            <V5Collections />
            <V5Visualization />
            <V5Materials />
            <V5Nda />
            <V5Gallery />
            <V5Faq />
            <V5Contact />
            <V5Why />
          </main>
          <V5Footer />
        </div>
      </IntroGate>
      <ScrollProgress />
      <VersionSwitcherDock current="5" />
    </ContactFormProvider>
  );
}
