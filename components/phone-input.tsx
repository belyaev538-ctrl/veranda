"use client";

import { formatRuPhoneInput } from "@/lib/phone";
import { cn } from "@/lib/cn";

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
  required?: boolean;
};

export function PhoneInput({
  value,
  onChange,
  id,
  name,
  className,
  required = true,
}: PhoneInputProps) {
  return (
    <input
      type="tel"
      inputMode="tel"
      id={id}
      name={name}
      required={required}
      autoComplete="tel"
      value={value}
      maxLength={18}
      placeholder="+7 (___) ___-__-__"
      className={cn(className)}
      onChange={(e) => onChange(formatRuPhoneInput(e.target.value))}
      onKeyDown={(e) => {
        if (e.key.length === 1 && !/[\d+\s()\-]/.test(e.key)) {
          e.preventDefault();
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        onChange(formatRuPhoneInput(text));
      }}
    />
  );
}
