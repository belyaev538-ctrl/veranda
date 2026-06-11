import { ContactFormProvider } from "@/components/contact-form-provider";
import { IntroGate } from "@/components/intro/intro-gate";
import { ContactFab } from "@/components/shared/contact-fab";
import { V5Footer } from "@/components/v5/v5-sections";
import { V5Header } from "@/components/v5/v5-header";
import { V5PageContent } from "@/components/v5/v5-page-content";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { V5_IMAGES } from "@/lib/v5-content";

export function LandingV5() {
  return (
    <ContactFormProvider siteVariant="5">
      <IntroGate heroImage={V5_IMAGES.hero} introVariant="v5">
        <div className="v4-theme v5-site">
          <V5Header />
          <main>
            <V5PageContent />
          </main>
          <V5Footer />
          <ContactFab />
        </div>
      </IntroGate>
      <ScrollProgress tone="accent" />
    </ContactFormProvider>
  );
}
