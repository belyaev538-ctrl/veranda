import { YachtNavHeader } from "@/components/shared/yacht-nav-header";
import { V3_MENU } from "@/lib/v3-content";

export function V3Header() {
  return (
    <YachtNavHeader
      heroHref="#v3-pillars"
      contactHref="#v3-contact"
      menuItems={V3_MENU}
      otherVariant={{ label: "Вариант 1", href: "/" }}
    />
  );
}
