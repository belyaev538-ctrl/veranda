"use client";

import { useContactForm } from "@/components/contact-form-provider";
import { CONTACTS } from "@/lib/constants";
import { cn } from "@/lib/cn";

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9"
        y="3"
        width="6"
        height="4"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 12h6M9 16h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CONTACT_CHANNEL_ITEMS = [
  {
    id: "form",
    label: "Обсудить проект",
    icon: FormIcon,
    openForm: true as const,
  },
  {
    id: "telegram",
    href: CONTACTS.telegram,
    label: "Написать в Telegram",
    icon: TelegramIcon,
    external: true as const,
  },
  {
    id: "whatsapp",
    href: CONTACTS.whatsapp,
    label: "Написать в WhatsApp",
    icon: WhatsAppIcon,
    external: true as const,
  },
  {
    id: "phone",
    href: CONTACTS.phoneHref,
    label: `Позвонить: ${CONTACTS.phone}`,
    icon: PhoneIcon,
    external: false as const,
  },
] as const;

type ContactChannelLinksProps = {
  className?: string;
  btnClassName?: string;
  onItemClick?: () => void;
  /** fab — вертикальный столбец с кнопкой формы; menu — горизонтально без формы */
  variant?: "fab" | "menu";
};

export function ContactChannelLinks({
  className,
  btnClassName = "v5-contact-fab__btn",
  onItemClick,
  variant = "fab",
}: ContactChannelLinksProps) {
  const { open: openForm } = useContactForm();

  const items =
    variant === "menu"
      ? CONTACT_CHANNEL_ITEMS.filter((item) => item.id !== "form")
      : CONTACT_CHANNEL_ITEMS;

  return (
    <div
      className={cn(
        "flex items-center gap-[3px]",
        variant === "menu" ? "flex-row" : "flex-col",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;

        if ("openForm" in item && item.openForm) {
          return (
            <button
              key={item.id}
              type="button"
              className={cn(btnClassName)}
              aria-label={item.label}
              onClick={() => {
                openForm();
                onItemClick?.();
              }}
            >
              <Icon />
            </button>
          );
        }

        if ("href" in item) {
          if (item.id === "phone" && variant === "menu") {
            return (
              <a
                key={item.id}
                href={item.href}
                className="v5-menu-contact-phone"
                aria-label={item.label}
                onClick={onItemClick}
              >
                <span className="v5-contact-fab__btn v5-contact-fab__btn--phone" aria-hidden>
                  <Icon />
                </span>
                <span className="v5-menu-contact-phone__number">{CONTACTS.phone}</span>
              </a>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(btnClassName)}
              aria-label={item.label}
              onClick={onItemClick}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon />
            </a>
          );
        }

        return null;
      })}
    </div>
  );
}
