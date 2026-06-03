import { YachtNavHeader } from "@/components/shared/yacht-nav-header";
import { V4_NAV_MENU } from "@/lib/v4-content";

export function V4Header() {
  return (
    <YachtNavHeader
      heroHref="#v4-hero"
      contactHref="#v4-contact"
      menuItems={V4_NAV_MENU}
      otherVariant={{ label: "Вариант 3", href: "/v3" }}
    />
  );
}
