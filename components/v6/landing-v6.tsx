import { ContactFormProvider } from "@/components/contact-form-provider";
import { IntroGate } from "@/components/intro/intro-gate";
import { ContactFab } from "@/components/shared/contact-fab";
import { V5Footer } from "@/components/v5/v5-sections";
import { V5Header } from "@/components/v5/v5-header";
import { V6PageContent } from "@/components/v6/v6-page-content";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { V5_IMAGES } from "@/lib/v5-content";

export function LandingV6() {
  return (
    <ContactFormProvider siteVariant="6" modalTheme="yacht-v6">
      <IntroGate heroImage={V5_IMAGES.hero} introVariant="v6">
        <div className="v4-theme v5-site v6-site">
          <V5Header />
          <main>
            <V6PageContent />
          </main>
          <V5Footer />
          <ContactFab />
        </div>
      </IntroGate>
      <ScrollProgress tone="accent" />
    </ContactFormProvider>
  );
}
