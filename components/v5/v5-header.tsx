import { YachtNavHeader } from "@/components/shared/yacht-nav-header";
import { V5_NAV_MENU } from "@/lib/v5-content";

export function V5Header() {
  return (
    <YachtNavHeader
      heroHref="#v5-hero"
      contactHref="#v5-contact"
      menuItems={V5_NAV_MENU}
      otherVariant={{ label: "Вариант 3", href: "/v3" }}
    />
  );
}
