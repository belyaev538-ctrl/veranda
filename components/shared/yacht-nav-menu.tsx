"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useContactForm } from "@/components/contact-form-provider";
import { luxuryEase } from "@/lib/motion";

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
};

export function YachtNavMenu({
  open,
  onClose,
  items,
  otherVariant,
}: YachtNavMenuProps) {
  const { open: openForm } = useContactForm();

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
          <div className="container-luxury flex h-[var(--v3-nav-height)] items-center justify-between">
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

          <nav className="container-luxury flex flex-1 flex-col justify-center gap-2 py-12">
            {items.map((item, i) => (
              <motion.a
                key={item.href}
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
            ))}
          </nav>

          <div className="container-luxury border-t border-white/10 py-8">
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
