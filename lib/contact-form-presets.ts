export type ContactFormIntent = "project" | "catalog";

export type ContactFormOpenOptions = {
  intent?: ContactFormIntent;
  /** Коллекция с карточки (Лагун, Дюна и т.д.) */
  catalogCollection?: string;
};

export const CONTACT_FORM_COPY = {
  project: {
    title: "Обсудить проект яхты",
    subtitle:
      "Оставьте контакты, и мы перезвоним или напишем в выбранном мессенджере.",
    channelsLegend: "Удобный канал для связи",
    commentLabel: "Комментарий",
    commentOptional: "(необязательно)",
    commentPlaceholder: "Модель яхты, зона на борту, пожелания",
    submit: "Отправить заявку",
    submitting: "Отправляем…",
    successTitle: "Ваша заявка отправлена",
    successBody: "Свяжемся с вами в ближайшее время.",
  },
  catalog: {
    title: "Запросить каталог",
    subtitle:
      "Укажите контакты и канал, и мы отправим актуальный каталог коллекций VERANDARU.",
    channelsLegend: "Куда отправить каталог",
    commentLabel: "Какая коллекция интересует",
    commentOptional: "(необязательно)",
    commentPlaceholder: "Лагун, Дюна, Бриз или все коллекции",
    submit: "Получить каталог",
    submitting: "Отправляем…",
    successTitle: "Запрос принят",
    successBody: "Отправим каталог в выбранный канал в ближайшее время.",
  },
} as const;

export function getCatalogFormSubtitle(collection?: string): string {
  if (collection) {
    return `Отправим каталог коллекции «${collection}» в выбранный канал.`;
  }
  return CONTACT_FORM_COPY.catalog.subtitle;
}
