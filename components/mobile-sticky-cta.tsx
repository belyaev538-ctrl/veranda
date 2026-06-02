"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useContactForm } from "@/components/contact-form-provider";
import { useEffect, useState } from "react";
import { luxuryEase } from "@/lib/motion";

/** Показываем после ухода с первого экрана (~85% высоты viewport) */
function useStickyCtaVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.85;
      setVisible(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return visible;
}

export function MobileStickyCta() {
  const { open: openContactForm } = useContactForm();
  const visible = useStickyCtaVisible();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl desktop:hidden"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: luxuryEase }}
        >
          <button
            type="button"
            onClick={openContactForm}
            className="btn-primary w-full"
          >
            Обсудить проект яхты
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
