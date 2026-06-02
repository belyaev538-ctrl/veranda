import { PhoneIcon } from "@/components/icons/phone-icon";
import { TelegramIcon } from "@/components/icons/telegram-icon";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { CONTACTS } from "@/lib/constants";
import { cn } from "@/lib/cn";

const ITEMS = [
  {
    label: "Telegram",
    href: CONTACTS.telegram,
    external: true,
    Icon: TelegramIcon,
  },
  {
    label: "WhatsApp",
    href: CONTACTS.whatsapp,
    external: true,
    Icon: WhatsAppIcon,
  },
  {
    label: CONTACTS.phone,
    href: CONTACTS.phoneHref,
    external: false,
    Icon: PhoneIcon,
  },
] as const;

type ContactLinksProps = {
  layout?: "row" | "column";
  align?: "start" | "end" | "center";
  className?: string;
};

export function ContactLinks({
  layout = "column",
  align = "start",
  className,
}: ContactLinksProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "row" ? "flex-wrap" : "flex-col",
        align === "end" && "items-end",
        align === "center" && "items-center",
        className,
      )}
    >
      {ITEMS.map(({ label, href, external, Icon }) => (
        <a
          key={label}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="contact-chip group"
        >
          <span className="contact-chip-icon" aria-hidden>
            <Icon className="text-ink/70 transition-colors group-hover:text-green" />
          </span>
          <span className="font-sans text-sm font-medium text-ink/80 transition-colors group-hover:text-green">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
