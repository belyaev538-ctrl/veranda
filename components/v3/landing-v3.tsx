import { ContactFormProvider } from "@/components/contact-form-provider";
import { IntroGate } from "@/components/intro/intro-gate";
import { V3Concepts } from "@/components/v3/v3-concepts";
import { V3Header } from "@/components/v3/v3-header";
import { V3Journey } from "@/components/v3/v3-journey";
import { V3Pillars } from "@/components/v3/v3-pillars";
import { V3ScrollProgress } from "@/components/v3/v3-scroll-progress";
import { V3Contact, V3Footer } from "@/components/v3/v3-sections";
import { VersionSwitcherDock } from "@/components/shared/version-switcher";
import { V3_IMAGES, V3_INTRO_COORDS } from "@/lib/v3-content";

export function LandingV3() {
  return (
    <ContactFormProvider siteVariant="3">
      <IntroGate
        heroImage={V3_IMAGES.hero}
        introVariant="v3"
        scrollCoords={V3_INTRO_COORDS}
      >
        <div className="v3-theme font-light">
          <V3ScrollProgress />
          <V3Header />
          <main>
            <V3Pillars />
            <V3Concepts />
            <V3Journey />
            <V3Contact />
          </main>
          <V3Footer />
        </div>
      </IntroGate>
      <VersionSwitcherDock current="3" />
    </ContactFormProvider>
  );
}
