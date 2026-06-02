"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  CONTACT_CHANNELS,
  LEGAL,
  type ContactChannelId,
} from "@/lib/constants";
import { luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

type ContactFormContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) {
    throw new Error("useContactForm must be used within ContactFormProvider");
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

function ContactFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const formId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channels, setChannels] = useState<ContactChannelId[]>([]);
  const [telegramHandle, setTelegramHandle] = useState("");
  const [comment, setComment] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const telegramSelected = channels.includes("telegram");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleChannel = (id: ContactChannelId) => {
    setChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
    setError(null);
  };

  const resetAndClose = () => {
    onClose();
    window.setTimeout(() => {
      setName("");
      setPhone("");
      setChannels([]);
      setTelegramHandle("");
      setComment("");
      setPrivacyAccepted(false);
      setSubmitted(false);
      setError(null);
    }, 400);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      setError("Подтвердите согласие с политикой конфиденциальности.");
      return;
    }
    if (channels.length === 0) {
      setError("Выберите хотя бы один удобный канал для связи.");
      return;
    }
    if (telegramSelected && !telegramHandle.trim()) {
      setError("Укажите никнейм или ссылку в Telegram.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 tablet:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: luxuryEase }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-title`}
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0 bg-[#051227]/55 backdrop-blur-md"
            onClick={resetAndClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            className="contact-modal-panel relative z-[1] flex max-h-[min(92vh,820px)] w-full max-w-[520px] flex-col overflow-hidden rounded-luxury bg-[#FAF8F5] shadow-[0_24px_80px_rgba(5,18,39,0.28)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/70 px-6 py-5 tablet:px-8">
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] text-green">
                  VERANDARU
                </p>
                <h2
                  id={`${formId}-title`}
                  className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink"
                >
                  Обсудить проект яхты
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Оставьте контакты — перезвоним или напишем в выбранном мессенджере.
                </p>
              </div>
              <button
                type="button"
                aria-label="Закрыть форму"
                onClick={resetAndClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70 transition-colors hover:border-ink/20 hover:text-ink"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 tablet:px-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <p className="font-display text-xl font-semibold text-ink">
                    Заявка отправлена
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
                    Мы свяжемся с вами в ближайшее время удобным способом.
                  </p>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="btn-primary mt-8 px-10"
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid gap-5">
                    <label className="contact-field">
                      <span className="contact-field-label">Имя</span>
                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Как к вам обращаться"
                        className="contact-field-input"
                      />
                    </label>
                    <label className="contact-field">
                      <span className="contact-field-label">Телефон</span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="contact-field-input"
                      />
                    </label>
                  </div>

                  <fieldset className="border-0 p-0">
                    <legend className="contact-field-label mb-3">
                      Удобный канал для связи
                    </legend>
                    <div className="flex flex-col gap-2">
                      {CONTACT_CHANNELS.map((channel) => {
                        const checked = channels.includes(channel.id);
                        return (
                          <div key={channel.id}>
                            <label
                              className={cn(
                                "contact-channel-option",
                                checked && "contact-channel-option--active",
                              )}
                            >
                              <input
                                type="checkbox"
                                className="contact-channel-checkbox"
                                checked={checked}
                                onChange={() => toggleChannel(channel.id)}
                              />
                              <span className="font-sans text-sm font-medium text-ink">
                                {channel.label}
                              </span>
                            </label>
                            {checked && channel.phoneHint && (
                              <p className="mt-2 pl-9 font-sans text-xs leading-relaxed text-muted">
                                {channel.phoneHint}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>

                  <AnimatePresence>
                    {telegramSelected && (
                      <motion.label
                        key="telegram-handle"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: luxuryEase }}
                        className="contact-field overflow-hidden"
                      >
                        <span className="contact-field-label">
                          Никнейм в Telegram
                        </span>
                        <input
                          type="text"
                          name="telegram"
                          required
                          value={telegramHandle}
                          onChange={(e) => setTelegramHandle(e.target.value)}
                          placeholder="@username или ссылка t.me/..."
                          className="contact-field-input"
                        />
                      </motion.label>
                    )}
                  </AnimatePresence>

                  <label className="contact-field">
                    <span className="contact-field-label">
                      Комментарий{" "}
                      <span className="font-normal text-muted">(необязательно)</span>
                    </span>
                    <textarea
                      name="comment"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Модель яхты, зона на борту, пожелания"
                      className="contact-field-input resize-none"
                    />
                  </label>

                  {error && (
                    <p className="rounded-brand bg-red-50 px-3 py-2 font-sans text-xs text-red-800">
                      {error}
                    </p>
                  )}

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      checked={privacyAccepted}
                      onChange={(e) => {
                        setPrivacyAccepted(e.target.checked);
                        setError(null);
                      }}
                      className="contact-consent-checkbox mt-0.5"
                    />
                    <span className="font-sans text-[11px] leading-relaxed text-muted">
                      Отправляя заявку, я соглашаюсь с{" "}
                      <a
                        href={LEGAL.privacyPolicyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink/80 underline decoration-ink/25 underline-offset-2 transition-colors hover:text-green"
                      >
                        политикой конфиденциальности
                      </a>
                      .
                    </span>
                  </label>

                  <button type="submit" className="btn-primary w-full">
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactFormContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactFormModal open={isOpen} onClose={close} />
    </ContactFormContext.Provider>
  );
}
