"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { V2Menu } from "@/components/v2/v2-menu";
import { cn } from "@/lib/cn";

export function V2Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
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
          "v2-header fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled ? "v2-header--scrolled" : "bg-transparent",
        )}
      >
        <div className="container-luxury grid h-[var(--v2-nav-height)] grid-cols-3 items-center">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="v2-menu-trigger justify-self-start"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <span className="v2-menu-burger" aria-hidden>
              <span className="v2-menu-burger__line" />
              <span className="v2-menu-burger__line" />
              <span className="v2-menu-burger__line" />
            </span>
            <span className="v2-menu-trigger__label">Меню</span>
          </button>

          <a href="#v2-hero" className="justify-self-center" aria-label="VERANDARU">
            <Logo light className="!h-5 desktop:!h-6" />
          </a>

          <a href="#v2-contact" className="v2-nav-link justify-self-end">
            Контакты
          </a>
        </div>
      </header>

      <V2Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
