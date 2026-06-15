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
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { CONTACT_CHANNELS, type ContactChannelId } from "@/lib/constants";
import { PrivacyPolicyLink } from "@/components/shared/privacy-policy-provider";
import { luxuryEase } from "@/lib/motion";
import { PhoneInput } from "@/components/phone-input";
import { submitLead } from "@/lib/submit-lead";
import { validateRuPhone } from "@/lib/phone";
import type { SiteVariant } from "@/lib/site-variant";
import {
  CONTACT_FORM_COPY,
  getCatalogFormSubtitle,
  type ContactFormOpenOptions,
} from "@/lib/contact-form-presets";
import { cn } from "@/lib/cn";
import { PrivacyPolicyProvider } from "@/components/shared/privacy-policy-provider";

type ContactFormContextValue = {
  open: (options?: ContactFormOpenOptions | ReactMouseEvent<HTMLElement>) => void;
  close: () => void;
  isOpen: boolean;
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);
const SiteVariantContext = createContext<SiteVariant>("1");

export function useSiteVariant() {
  return useContext(SiteVariantContext);
}

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
  siteVariant,
  modalTheme,
  openOptions,
}: {
  open: boolean;
  onClose: () => void;
  siteVariant: SiteVariant;
  modalTheme: ContactModalTheme;
  openOptions: ContactFormOpenOptions;
}) {
  const isYachtV6 = modalTheme === "yacht-v6";
  const fieldLabelClass = cn("contact-field-label", isYachtV6 && "text-white");
  const intent = openOptions.intent ?? "project";
  const isCatalog = intent === "catalog";
  const copy = CONTACT_FORM_COPY[intent];
  const formSubtitle = isCatalog
    ? getCatalogFormSubtitle(openOptions.catalogCollection)
    : copy.subtitle;
  const formId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channels, setChannels] = useState<ContactChannelId[]>([]);
  const [telegramHandle, setTelegramHandle] = useState("");
  const [comment, setComment] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    if (!open) return;
    if (isCatalog && openOptions.catalogCollection) {
      setComment(openOptions.catalogCollection);
    }
  }, [open, isCatalog, openOptions.catalogCollection]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      setError("Подтвердите согласие с политикой конфиденциальности.");
      return;
    }
    if (channels.length === 0) {
      setError(
        isCatalog
          ? "Выберите, куда отправить каталог."
          : "Выберите хотя бы один удобный канал для связи.",
      );
      return;
    }
    if (telegramSelected && !telegramHandle.trim()) {
      setError("Укажите никнейм или ссылку в Telegram.");
      return;
    }

    const phoneCheck = validateRuPhone(phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.error ?? "Некорректный номер телефона.");
      return;
    }

    setError(null);
    setSubmitting(true);

    const result = await submitLead({
      name: name.trim(),
      phone: phoneCheck.formatted ?? phone.trim(),
      source: "modal",
      variant: siteVariant,
      channels,
      telegramHandle: telegramSelected ? telegramHandle.trim() : undefined,
      comment: comment.trim() || undefined,
      requestType: intent,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] flex",
            isYachtV6
              ? "items-stretch justify-stretch p-0 tablet:items-center tablet:justify-center tablet:p-6"
              : "items-center justify-center p-4 tablet:p-6",
          )}
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
            className={cn(
              "absolute inset-0 backdrop-blur-md",
              isYachtV6 ? "bg-[#020B1F]/72" : "bg-[#051227]/55",
            )}
            onClick={resetAndClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            className={cn(
              "contact-modal-panel relative z-[1] flex w-full flex-col overflow-hidden",
              isYachtV6 && "contact-modal-panel--yacht-v6",
              isYachtV6
                ? "h-[100dvh] max-h-none max-w-none rounded-none tablet:h-auto tablet:max-h-[min(92vh,820px)] tablet:max-w-[520px]"
                : "max-h-[min(92vh,820px)] max-w-[520px] rounded-luxury",
              !isYachtV6 && "bg-[#FAF8F5] shadow-[0_24px_80px_rgba(5,18,39,0.28)]",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "contact-modal-header flex shrink-0 items-start justify-between gap-4 px-6 py-5 tablet:px-8",
                isYachtV6 ? "border-b border-white/10" : "border-b border-border/70",
              )}
            >
              <div className={cn(isYachtV6 && "min-w-0 flex-1")}>
                {!isYachtV6 && (
                  <p className="contact-modal-eyebrow font-sans text-[10px] font-medium tracking-[0.2em] text-green">
                    VERANDARU
                  </p>
                )}
                {isYachtV6 ? (
                  <h2
                    id={`${formId}-title`}
                    className="contact-modal-title v5-type-display-md text-white"
                  >
                    Форма заявки
                  </h2>
                ) : (
                  <h2
                    id={`${formId}-title`}
                    className="contact-modal-title mt-2 font-display text-2xl font-semibold tracking-tight text-ink"
                  >
                    {copy.title}
                  </h2>
                )}
                {!isYachtV6 && (
                  <p className="contact-modal-subtitle mt-2 font-sans text-sm leading-relaxed text-muted">
                    {formSubtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Закрыть форму"
                onClick={resetAndClose}
                className={cn(
                  "contact-modal-close flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                  isYachtV6
                    ? "border border-white/14 bg-white/10 text-white/30 hover:border-white/25"
                    : "border border-ink/10 bg-white text-ink/70 hover:border-ink/20 hover:text-ink",
                )}
              >
                <CloseIcon />
              </button>
            </div>

            {isYachtV6 && (
              <div className="contact-modal-lead shrink-0 px-6 py-4 text-center tablet:px-8 tablet:py-5">
                <p className="contact-modal-subtitle contact-modal-subtitle--v6-lead v4-display-title text-white">
                  {formSubtitle}
                </p>
              </div>
            )}

            <div
              className={cn(
                "contact-modal-body overflow-y-auto px-6 py-6 tablet:px-8",
                isYachtV6 && "contact-modal-body--yacht-v6",
              )}
            >
              {submitted ? (
                <div className="py-8 text-center">
                  <p
                    className={cn(
                      "contact-modal-success-title text-xl font-semibold tracking-tight",
                      isYachtV6
                        ? "v5-type-display-md text-white"
                        : "font-display text-ink",
                    )}
                  >
                    {copy.successTitle}
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      isYachtV6
                        ? "v5-type-body text-white/65"
                        : "font-sans text-muted",
                    )}
                  >
                    {copy.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className={cn(
                      "mt-8",
                      isYachtV6 ? "v4-btn contact-modal-submit" : "btn-primary px-10",
                    )}
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className={cn(
                    "flex flex-col gap-6",
                    isYachtV6 && "contact-modal-form--yacht-v6",
                  )}
                >
                  <div className="grid gap-5">
                    <label className="contact-field">
                      <span className={fieldLabelClass}>Имя</span>
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
                      <span className={fieldLabelClass}>Телефон</span>
                      <PhoneInput
                        name="phone"
                        value={phone}
                        onChange={setPhone}
                        className="contact-field-input"
                      />
                    </label>
                  </div>

                  <fieldset className="border-0 p-0">
                    <legend className={cn(fieldLabelClass, "mb-3")}>
                      {copy.channelsLegend}
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
                              <span
                                className={cn(
                                  isYachtV6
                                    ? "contact-channel-option__label"
                                    : "text-sm font-medium font-sans text-ink",
                                )}
                              >
                                {channel.label}
                              </span>
                            </label>
                            {checked && channel.phoneHint && (
                              <p
                                className={cn(
                                  "mt-2 pl-9 text-xs leading-relaxed",
                                  isYachtV6 ? "font-sans text-white/50" : "font-sans text-muted",
                                )}
                              >
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
                        <span className={fieldLabelClass}>
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
                    <span className={fieldLabelClass}>
                      {copy.commentLabel}{" "}
                      <span
                        className={cn(
                          "font-normal",
                          isYachtV6 ? "text-white" : "text-muted",
                        )}
                      >
                        {copy.commentOptional}
                      </span>
                    </span>
                    <textarea
                      name="comment"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={copy.commentPlaceholder}
                      className="contact-field-input resize-none"
                    />
                  </label>

                  {error && (
                    <p
                      className={cn(
                        "contact-modal-error px-3 py-2 text-xs",
                        isYachtV6 ? "font-sans" : "rounded-brand bg-red-50 font-sans text-red-800",
                      )}
                    >
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
                    <span
                      className={cn(
                        "text-[11px] leading-relaxed",
                        isYachtV6 ? "font-sans text-white/55" : "font-sans text-muted",
                      )}
                    >
                      Отправляя заявку, я соглашаюсь с{" "}
                      <PrivacyPolicyLink
                        className={cn(
                          "underline underline-offset-2 transition-colors",
                          isYachtV6
                            ? "text-white/80 decoration-white/25 hover:text-[var(--v4-accent)]"
                            : "text-ink/80 decoration-ink/25 hover:text-green",
                        )}
                      />
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    className={cn(
                      "disabled:cursor-not-allowed disabled:opacity-60",
                      isYachtV6
                        ? "v4-btn contact-modal-submit"
                        : "btn-primary w-full",
                    )}
                    disabled={submitting}
                  >
                    {submitting ? copy.submitting : copy.submit}
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

export type ContactModalTheme = "light" | "yacht-v6";
export type { ContactFormOpenOptions } from "@/lib/contact-form-presets";

export function ContactFormProvider({
  children,
  siteVariant = "1",
  modalTheme = "light",
}: {
  children: ReactNode;
  siteVariant?: SiteVariant;
  modalTheme?: ContactModalTheme;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState<ContactFormOpenOptions>({
    intent: "project",
  });

  const open = useCallback(
    (options?: ContactFormOpenOptions | ReactMouseEvent<HTMLElement>) => {
      const resolved: ContactFormOpenOptions =
        options && typeof options === "object" && "nativeEvent" in options
          ? { intent: "project" }
          : {
              intent: (options as ContactFormOpenOptions | undefined)?.intent ?? "project",
              catalogCollection: (options as ContactFormOpenOptions | undefined)
                ?.catalogCollection,
            };
      setOpenOptions(resolved);
      setIsOpen(true);
    },
    [],
  );
  const close = useCallback(() => setIsOpen(false), []);

  const privacyTheme = modalTheme === "yacht-v6" ? "yacht-v6" : "light";

  return (
    <PrivacyPolicyProvider theme={privacyTheme}>
      <SiteVariantContext.Provider value={siteVariant}>
        <ContactFormContext.Provider value={{ open, close, isOpen }}>
          {children}
          <ContactFormModal
            open={isOpen}
            onClose={close}
            siteVariant={siteVariant}
            modalTheme={modalTheme}
            openOptions={openOptions}
          />
        </ContactFormContext.Provider>
      </SiteVariantContext.Provider>
    </PrivacyPolicyProvider>
  );
}
