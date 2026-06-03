"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import {
  YachtNavMenu,
  type YachtNavMenuItem,
} from "@/components/shared/yacht-nav-menu";
import { cn } from "@/lib/cn";

type YachtNavHeaderProps = {
  heroHref: string;
  contactHref: string;
  menuItems: readonly YachtNavMenuItem[];
  otherVariant?: { label: string; href: string };
};

/** Шапка v3: Меню — логотип — Контакты */
export function YachtNavHeader({
  heroHref,
  contactHref,
  menuItems,
  otherVariant,
}: YachtNavHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "v3-header fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled ? "v3-header--scrolled" : "bg-transparent",
        )}
      >
        <div className="container-luxury grid h-[var(--v3-nav-height)] grid-cols-3 items-center">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="v3-menu-trigger justify-self-start"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <span className="v3-menu-burger" aria-hidden>
              <span className="v3-menu-burger__line" />
              <span className="v3-menu-burger__line" />
              <span className="v3-menu-burger__line" />
            </span>
            <span className="v3-menu-trigger__label">Меню</span>
          </button>

          <a href={heroHref} className="justify-self-center" aria-label="VERANDARU">
            <Logo light className="!h-5 desktop:!h-6" />
          </a>

          <a
            href={contactHref}
            className="v3-nav-link justify-self-end"
          >
            Контакты
          </a>
        </div>
      </header>

      <YachtNavMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        otherVariant={otherVariant}
      />
    </>
  );
}
