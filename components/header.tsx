"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContactForm } from "@/components/contact-form-provider";
import { TelegramIcon } from "@/components/icons/telegram-icon";
import { Logo } from "@/components/logo";
import { BRAND_TAGLINE, CONTACTS, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Header() {
  const { open: openContactForm } = useContactForm();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      setOverHero(y < window.innerHeight * 0.72);
    };
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

  const lightOnHero = overHero && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "header-root fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "header-scrolled shadow-soft" : "header-on-hero",
        )}
      >
        <div className="container-luxury flex min-h-[74px] items-center justify-between border-b border-white/70 py-3 tablet:h-[74px] tablet:py-0">
          <Link href="/" className="group flex flex-col gap-1">
            <Logo light={lightOnHero} />
            <span
              className={cn(
                "hidden font-sans text-[11px] font-medium transition-colors tablet:block desktop:text-xs",
                lightOnHero ? "text-white/65" : "text-muted",
              )}
            >
              {BRAND_TAGLINE}
            </span>
          </Link>

          <nav className="hidden items-center gap-5 desktop:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link-luxury",
                  lightOnHero
                    ? "text-white/80 hover:text-white"
                    : "text-ink/75 hover:text-green",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 desktop:flex">
            <a
              href={CONTACTS.phoneHref}
              className={cn(
                "whitespace-nowrap font-sans text-sm font-semibold transition-colors",
                lightOnHero
                  ? "text-white/90 hover:text-white"
                  : "text-ink hover:text-green",
              )}
            >
              {CONTACTS.phone}
            </a>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                lightOnHero
                  ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                  : "border-ink/15 bg-white text-ink hover:border-ink/25 hover:text-green",
              )}
            >
              <TelegramIcon className="h-[20px] w-[20px]" />
            </a>
            <button
              type="button"
              onClick={openContactForm}
              className={cn(
                lightOnHero ? "btn-hero-secondary !px-6 !py-3" : "btn-primary !px-6 !py-3",
              )}
            >
              Обсудить проект яхты
            </button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 desktop:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "block h-px w-6 transition-all duration-300",
                  lightOnHero && !menuOpen ? "bg-white" : "bg-ink",
                  i === 0 && menuOpen && "translate-y-[7px] rotate-45",
                  i === 1 && menuOpen && "opacity-0",
                  i === 2 && menuOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            ))}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] flex flex-col bg-navy-deep desktop:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-8 pt-24">
              <div className="mb-12">
                <Logo light />
                <p className="mt-2 font-sans text-sm text-white/60">{BRAND_TAGLINE}</p>
              </div>

              <nav className="flex flex-col gap-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-4xl font-semibold text-white"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-10"
              >
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openContactForm();
                  }}
                  className="btn-hero-primary w-full text-center"
                >
                  Обсудить проект яхты
                </button>
                <a
                  href={CONTACTS.phoneHref}
                  className="text-center font-sans text-sm text-white/60"
                >
                  {CONTACTS.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
