/** Нормализация: только цифры, 11 символов, код страны 7 */
export function normalizeRuPhoneDigits(input: string): string {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (digits.length > 0 && !digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  return digits.slice(0, 11);
}

/** Маска ввода: +7 (XXX) XXX-XX-XX */
export function formatRuPhoneInput(raw: string): string {
  const digits = normalizeRuPhoneDigits(raw);
  if (!digits) return "";

  const national = digits.slice(1);
  let formatted = "+7";

  if (national.length > 0) {
    formatted += ` (${national.slice(0, 3)}`;
  }
  if (national.length >= 3) {
    formatted += ")";
  }
  if (national.length > 3) {
    formatted += ` ${national.slice(3, 6)}`;
  }
  if (national.length > 6) {
    formatted += `-${national.slice(6, 8)}`;
  }
  if (national.length > 8) {
    formatted += `-${national.slice(8, 10)}`;
  }

  return formatted;
}

export type PhoneValidation = {
  valid: boolean;
  error?: string;
  normalized?: string;
  formatted?: string;
};

/**
 * Российский номер: 7 + 10 цифр, код оператора/региона 3, 4, 8 или 9.
 */
export function validateRuPhone(input: string): PhoneValidation {
  const digits = normalizeRuPhoneDigits(input);

  if (digits.length === 0) {
    return { valid: false, error: "Укажите номер телефона." };
  }

  if (digits.length < 11) {
    return { valid: false, error: "Введите номер полностью: +7 и 10 цифр." };
  }

  if (!/^7[3489]\d{9}$/.test(digits)) {
    return {
      valid: false,
      error: "Некорректный номер. Проверьте код города или оператора.",
    };
  }

  const national = digits.slice(1);
  if (/^(\d)\1{9}$/.test(national)) {
    return { valid: false, error: "Проверьте правильность номера." };
  }

  const formatted = formatRuPhoneInput(digits);
  return {
    valid: true,
    normalized: digits,
    formatted,
  };
}
