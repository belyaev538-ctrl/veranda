import { ContactFormProvider } from "@/components/contact-form-provider";
import { IntroGate } from "@/components/intro/intro-gate";
import { V4Header } from "@/components/v4/v4-header";
import { V4Hero } from "@/components/v4/v4-hero";
import {
  V4Collections,
  V4Contact,
  V4Custom,
  V4Faq,
  V4Footer,
  V4Gallery,
  V4Materials,
  V4Nda,
  V4Production,
  V4Statement,
  V4Visualization,
  V4VisualChapters,
  V4Why,
  V4YachtAreas,
} from "@/components/v4/v4-sections";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { V4_IMAGES } from "@/lib/v4-content";

export function LandingV4() {
  return (
    <ContactFormProvider siteVariant="4">
      <IntroGate heroImage={V4_IMAGES.hero} introVariant="v4">
        <div className="v4-theme">
          <V4Header />
          <main>
            <V4Hero />
            <V4Statement />
            <V4VisualChapters />
            <V4Production />
            <V4YachtAreas />
            <V4Custom />
            <V4Visualization />
            <V4Collections />
            <V4Materials />
            <V4Nda />
            <V4Why />
            <V4Faq />
            <V4Gallery />
            <V4Contact />
          </main>
          <V4Footer />
        </div>
      </IntroGate>
      <ScrollProgress />
    </ContactFormProvider>
  );
}
