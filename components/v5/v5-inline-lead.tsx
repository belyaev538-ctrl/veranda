"use client";

import { FormEvent, useId, useState } from "react";
import { PhoneInput } from "@/components/phone-input";
import { useSiteVariant } from "@/components/contact-form-provider";
import { submitLead } from "@/lib/submit-lead";
import { validateRuPhone } from "@/lib/phone";
import { cn } from "@/lib/cn";

export function V5InlineLeadForm({ className }: { className?: string }) {
  const formId = useId();
  const siteVariant = useSiteVariant();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneCheck = validateRuPhone(phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.error ?? "Некорректный номер телефона.");
      return;
    }
    if (!name.trim()) {
      setError("Укажите имя.");
      return;
    }

    setError(null);
    setSubmitting(true);

    const fileNote = fileLabel ? `\n[Файл: ${fileLabel}]` : "";
    const result = await submitLead({
      name: name.trim(),
      phone: phoneCheck.formatted ?? phone.trim(),
      source: "cta",
      variant: siteVariant,
      comment: (comment.trim() + fileNote).trim() || undefined,
    });

    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
    setName("");
    setPhone("");
    setComment("");
    setFileLabel(null);
    e.currentTarget.reset();
  };

  if (submitted) {
    return (
      <p className={cn("v4-inline-lead__success text-white/80", className)}>
        Спасибо. Мы свяжемся с вами в ближайшее время.
      </p>
    );
  }

  return (
    <form
      id={formId}
      className={cn("v4-inline-lead", className)}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="v4-inline-lead__grid">
        <label className="v4-inline-lead__field">
          <span className="v4-inline-lead__label">Имя</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="v4-inline-lead__input"
            autoComplete="name"
            required
          />
        </label>
        <label className="v4-inline-lead__field">
          <span className="v4-inline-lead__label">Телефон</span>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            className="v4-inline-lead__input v4-inline-lead__input--phone"
          />
        </label>
      </div>
      <label className="v4-inline-lead__field">
        <span className="v4-inline-lead__label">Комментарий</span>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="v4-inline-lead__input v4-inline-lead__textarea"
        />
      </label>
      <label className="v4-inline-lead__attach">
        <input
          type="file"
          className="sr-only"
          accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.dxf"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setFileLabel(f ? f.name : null);
          }}
        />
        <span className="v4-inline-lead__attach-btn">Прикрепить проект</span>
        {fileLabel && (
          <span className="v4-inline-lead__file-name">{fileLabel}</span>
        )}
      </label>
      {error && <p className="v4-inline-lead__error">{error}</p>}
      <button type="submit" className="v4-btn w-full max-w-xs" disabled={submitting}>
        {submitting ? "Отправка…" : "Отправить"}
      </button>
    </form>
  );
}
