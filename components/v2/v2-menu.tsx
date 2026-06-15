"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useContactForm } from "@/components/contact-form-provider";
import { V2_MENU } from "@/lib/v2-content";
import { luxuryEase } from "@/lib/motion";

type V2MenuProps = {
  open: boolean;
  onClose: () => void;
};

export function V2Menu({ open, onClose }: V2MenuProps) {
  const { open: openForm } = useContactForm();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="v2-menu fixed inset-0 z-[70] flex flex-col bg-[#0d1322]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: luxuryEase }}
        >
          <div className="container-luxury flex h-[var(--v2-nav-height)] items-center justify-between">
            <p className="v2-menu-label">Меню</p>
            <button
              type="button"
              onClick={onClose}
              className="v2-menu-close"
              aria-label="Закрыть меню"
            >
              Закрыть
            </button>
          </div>

          <nav className="container-luxury flex flex-1 flex-col justify-center gap-2 py-12">
            {V2_MENU.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="v2-menu-item group"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: luxuryEase }}
              >
                <span className="v2-menu-numeral">{item.numeral}</span>
                <span className="v2-menu-title">{item.label}</span>
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
              className="v2-btn-outline"
            >
              Обсудить проект
            </button>
            <Link
              href="/v1"
              onClick={onClose}
              className="v2-nav-link mt-6 inline-block"
            >
              Вариант 1
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
