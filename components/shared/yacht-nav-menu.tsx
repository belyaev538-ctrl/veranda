"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ContactChannelLinks } from "@/components/shared/contact-channel-links";
import { useContactForm } from "@/components/contact-form-provider";
import { luxuryEase } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-media";

export type YachtNavMenuItem = {
  numeral: string;
  label: string;
  href: string;
};

type YachtNavMenuProps = {
  open: boolean;
  onClose: () => void;
  items: readonly YachtNavMenuItem[];
  otherVariant?: { label: string; href: string };
  menuContactBar?: boolean;
};

export function YachtNavMenu({
  open,
  onClose,
  items,
  otherVariant,
  menuContactBar = false,
}: YachtNavMenuProps) {
  const { open: openForm } = useContactForm();
  const isMobile = useIsMobile(767);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="v3-menu fixed inset-0 z-[70] flex flex-col bg-[#0d1322]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: luxuryEase }}
        >
          <div className="container-luxury flex h-[var(--v3-nav-height)] items-center justify-between border-b border-white/10">
            <p className="v3-menu-label">Меню</p>
            <button
              type="button"
              onClick={onClose}
              className="v3-menu-close"
              aria-label="Закрыть меню"
            >
              Закрыть
            </button>
          </div>

          <nav className="v3-menu-nav container-luxury flex min-h-0 flex-1 flex-col justify-center gap-1.5 overflow-y-auto py-8 tablet:gap-2 tablet:py-12">
            {items.map((item, i) =>
              isMobile ? (
                <a
                  key={`${item.numeral}-${item.href}`}
                  href={item.href}
                  onClick={onClose}
                  className="v3-menu-item group"
                >
                  <span className="v3-menu-numeral">{item.numeral}</span>
                  <span className="v3-menu-title">{item.label}</span>
                </a>
              ) : (
                <motion.a
                  key={`${item.numeral}-${item.href}`}
                  href={item.href}
                  onClick={onClose}
                  className="v3-menu-item group"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: luxuryEase }}
                >
                  <span className="v3-menu-numeral">{item.numeral}</span>
                  <span className="v3-menu-title">{item.label}</span>
                </motion.a>
              ),
            )}
          </nav>

          <div className="container-luxury border-t border-white/10 py-8">
            {menuContactBar ? (
              <div className="v3-menu-contact-bar">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openForm();
                  }}
                  className="v4-btn v4-btn--sm"
                >
                  Обсудить проект
                </button>
                <nav
                  className="v5-contact-fab v5-contact-fab--menu"
                  aria-label="Связаться с нами"
                >
                  <ContactChannelLinks variant="menu" onItemClick={onClose} />
                </nav>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openForm();
                }}
                className="v3-btn-outline"
              >
                Обсудить проект
              </button>
            )}
            {otherVariant && (
              <Link
                href={otherVariant.href}
                onClick={onClose}
                className="v3-nav-link mt-6 inline-block"
              >
                {otherVariant.label}
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
