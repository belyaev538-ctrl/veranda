import { ContactChannelLinks } from "@/components/shared/contact-channel-links";

export function ContactFab() {
  return (
    <nav
      className="v5-contact-fab"
      aria-label="Связаться с нами"
    >
      <ContactChannelLinks />
    </nav>
  );
}
