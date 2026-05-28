"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { BRAND_TAGLINE, CONTACTS, FOOTER_DESCRIPTION, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-white pb-14 pt-16 desktop:pb-20 desktop:pt-20">
      <div className="footer-gradient-line absolute inset-x-0 top-0" />
      <div className="container-luxury">
        <div className="grid grid-cols-1 gap-12 desktop:grid-cols-3 desktop:gap-8">
          <div>
            <Logo className="!h-7 desktop:!h-8" />
            <p className="mt-2 font-sans text-xs text-muted/80">{BRAND_TAGLINE}</p>
            <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-muted/90">
              {FOOTER_DESCRIPTION}
            </p>
          </div>

          <nav className="flex flex-col gap-4 desktop:items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs font-medium text-ink/60 transition-colors hover:text-green"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="desktop:text-right">
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted/70">
              Контакты
            </p>
            <div className="mt-4 flex flex-col gap-2 desktop:items-end">
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-ink/70 transition-colors hover:text-green"
              >
                Telegram
              </a>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-ink/70 transition-colors hover:text-green"
              >
                WhatsApp
              </a>
              <a
                href={CONTACTS.phoneHref}
                className="font-sans text-sm text-ink/70 transition-colors hover:text-green"
              >
                {CONTACTS.phone}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-border/60 pt-8 font-sans text-xs text-muted/70">
          © VERANDARU
        </p>
      </div>
    </footer>
  );
}
