"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import {
  PRIVACY_POLICY_META,
  PRIVACY_POLICY_SECTIONS,
} from "@/lib/privacy-policy-content";
import { luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type PrivacyPolicyTheme = "light" | "yacht-v6";

type PrivacyPolicyContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const PrivacyPolicyContext = createContext<PrivacyPolicyContextValue | null>(null);

export function usePrivacyPolicy() {
  const ctx = useContext(PrivacyPolicyContext);
  if (!ctx) {
    throw new Error("usePrivacyPolicy must be used within PrivacyPolicyProvider");
  }
  return ctx;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PrivacyPolicyModal({
  open,
  onClose,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  theme: PrivacyPolicyTheme;
}) {
  const titleId = useId();
  const isYachtV6 = theme === "yacht-v6";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 tablet:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: luxuryEase }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            aria-label="Закрыть"
            className={cn(
              "absolute inset-0 backdrop-blur-md",
              isYachtV6 ? "bg-[#020B1F]/72" : "bg-[#051227]/55",
            )}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            className={cn(
              "privacy-policy-modal contact-modal-panel relative z-[1] flex max-h-[min(92vh,820px)] w-full max-w-[640px] flex-col overflow-hidden rounded-luxury",
              isYachtV6
                ? "contact-modal-panel--yacht-v6 privacy-policy-modal--yacht-v6"
                : "bg-[#FAF8F5] shadow-[0_24px_80px_rgba(5,18,39,0.28)]",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "contact-modal-header flex items-start justify-between gap-4 px-6 py-5 tablet:px-8",
                isYachtV6 ? "border-b border-white/10" : "border-b border-border/70",
              )}
            >
              <div>
                <p
                  className={cn(
                    "contact-modal-eyebrow",
                    isYachtV6
                      ? "v5-type-eyebrow text-[var(--v4-accent)]"
                      : "font-sans text-[10px] font-medium tracking-[0.2em] text-green",
                  )}
                >
                  VERANDARU
                </p>
                <h2
                  id={titleId}
                  className={cn(
                    "contact-modal-title mt-2 tracking-tight",
                    isYachtV6
                      ? "v5-type-display-md text-white"
                      : "font-display text-2xl font-semibold text-ink",
                  )}
                >
                  {PRIVACY_POLICY_META.title}
                </h2>
                <p
                  className={cn(
                    "contact-modal-subtitle mt-2 leading-relaxed",
                    isYachtV6
                      ? "v5-type-body text-white/65"
                      : "font-sans text-sm text-muted",
                  )}
                >
                  {PRIVACY_POLICY_META.subtitle}
                </p>
              </div>
              <button
                type="button"
                aria-label="Закрыть политику конфиденциальности"
                onClick={onClose}
                className={cn(
                  "contact-modal-close flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                  isYachtV6
                    ? "border border-white/14 bg-white/10 text-white/80 hover:border-white/25 hover:text-white"
                    : "border border-ink/10 bg-white text-ink/70 hover:border-ink/20 hover:text-ink",
                )}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="privacy-policy-modal__body overflow-y-auto px-6 py-6 tablet:px-8">
              <div className="privacy-policy-content">
                {PRIVACY_POLICY_SECTIONS.map((section) => (
                  <section key={section.title} className="privacy-policy-section">
                    <h3 className="privacy-policy-section__title">{section.title}</h3>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="privacy-policy-section__p">
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PrivacyPolicyProvider({
  children,
  theme = "light",
}: {
  children: ReactNode;
  theme?: PrivacyPolicyTheme;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <PrivacyPolicyContext.Provider value={{ open, close, isOpen }}>
      {children}
      <PrivacyPolicyModal open={isOpen} onClose={close} theme={theme} />
    </PrivacyPolicyContext.Provider>
  );
}

export function PrivacyPolicyLink({
  className,
  children = "политикой конфиденциальности",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { open } = usePrivacyPolicy();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
