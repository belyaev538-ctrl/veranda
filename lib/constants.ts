export const NAV_LINKS = [
  { label: "Коллекции", href: "#collections" },
  { label: "Яхтенные проекты", href: "#projects" },
  { label: "Материалы", href: "#materials" },
  { label: "Производство", href: "#production" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const BRAND_TAGLINE = "мебель для яхт";

export const FOOTER_DESCRIPTION =
  "Премиальная outdoor-мебель и кастомные решения для яхт.";

export const CONTACTS = {
  telegram: "https://t.me/verandaru",
  whatsapp: "https://wa.me/74951513064",
  phone: "+7 (495) 151 30 64",
  phoneHref: "tel:+74951513064",
} as const;

export const LEGAL = {
  privacyPolicyUrl: "https://top.veranda.ru/policy",
} as const;

export type ContactChannelId = "telegram" | "whatsapp" | "max";

export const CONTACT_CHANNELS: ReadonlyArray<{
  id: ContactChannelId;
  label: string;
  phoneHint?: string;
}> = [
  { id: "telegram", label: "Telegram" },
  {
    id: "whatsapp",
    label: "WhatsApp",
    phoneHint: "Свяжемся по указанному номеру телефона.",
  },
  {
    id: "max",
    label: "MAX",
    phoneHint: "Свяжемся по указанному номеру телефона.",
  },
];

/** Блок «Основатель» — контент с top.veranda.ru */
export const FOUNDER = {
  eyebrow: "Основатель компании и вдохновитель",
  name: "Юлия Баранова",
  quote:
    "Мебель должна не просто стоять на палубе, а «жить» в морской среде: дышать ветром, стареть с достоинством и рассказывать свою историю.",
  quoteSecondary:
    "Мы создаём мебель, которая наполняет пространство на борту эстетикой и комфортом — атмосферой для самых счастливых моментов жизни.",
  telegram: "@Julia_verandaru",
  telegramHref: "https://t.me/Julia_verandaru",
  email: "Julia_verandaru@mail.ru",
  photoAlt: "Юлия Баранова — основатель VERANDARU",
  videoUrl: "https://veranda.ru/files/about-company-julia.mp4",
  videoPoster: "/images/founder-julia.webp",
  videoCta: "О компании",
} as const;

export const TRUST_BAR_ITEMS = [
  "Собственное производство в Москве",
  "16 коллекций outdoor-мебели",
  "Кастомизация под палубу",
  "Материалы для солнца и влаги",
] as const;

export const PHILOSOPHY_FEATURES = [
  "3D-концепция зоны на яхте",
  "Подбор мебели под палубу и сценарии отдыха",
  "Кастомизация размеров и отделки",
  "Материалы для эксплуатации у воды",
  "Сопровождение проекта до установки",
] as const;

/** Этапы работы с проектом — схема «Как мы работаем» */
export const WORKFLOW_STEPS = [
  {
    title: "Обсуждение проекта",
    description:
      "Знакомимся с яхтой, зонами и сценариями отдыха — фиксируем задачу и ожидания.",
  },
  {
    title: "Проектная документация",
    description:
      "Готовим комплект чертежей, спецификаций и решений под габариты палубы.",
  },
  {
    title: "Визуализация",
    description:
      "Показываем 3D-концепцию: посадку, материалы и атмосферу зоны до производства.",
  },
  {
    title: "Согласование сроков и стоимости",
    description:
      "Утверждаем бюджет, этапы и календарь — без сюрпризов на этапе реализации.",
  },
  {
    title: "Реализация проекта",
    description:
      "Производство, доставка, монтаж и сдача зоны «под ключ» на борту.",
  },
  {
    title: "Обслуживание мебели",
    description:
      "Гарантийная поддержка и сервис: уход, реставрация и обновление покрытий.",
  },
] as const;

export const PRODUCTION_CARDS = [
  {
    title: "Дизайн-проект и визуализация",
    description:
      "Разрабатываем концепцию зон на палубе, подбираем мебель под габариты и сценарии отдыха. Показываем 3D-визуализацию до запуска в производство.",
    photo: 3,
    span: "full",
  },
  {
    title: "Деревообработка",
    description:
      "Тик и ироко для outdoor-эксплуатации у воды: устойчивость к влаге, солнцу и естественное благородное старение.",
    photo: 8,
    video: "/videos/teak.mp4",
  },
  {
    title: "Металлоцех",
    description:
      "Нержавеющая сталь AISI 304 и аккуратная финишная обработка для зон с повышенной влажностью.",
    photo: 9,
    video: "/videos/metal.mp4",
  },
  {
    title: "Мягкие элементы",
    description:
      "Outdoor-ткани, наполнители и чехлы, рассчитанные на солнце, влагу и регулярное использование на борту.",
    photo: 10,
    video: "/videos/upholstery.mp4",
  },
  {
    title: "Кастомизация",
    description:
      "Размеры, посадка, отделка и комплектация под конкретную палубу, cockpit, flybridge или кормовую зону.",
    photo: 11,
    video: "/videos/assembly.mp4",
  },
] as const;

export const PROJECTS = [
  {
    photo: 3,
    title: "Лаунж на flybridge",
    type: "Flybridge",
    location: "Верхняя палуба",
    description:
      "Лаунж-зона на верхней палубе для отдыха, общения и вида на воду.",
  },
  {
    photo: 4,
    title: "Dining-зона на корме",
    type: "Aft deck",
    location: "Кормовая палуба",
    description:
      "Обеденная зона на кормовой палубе с устойчивыми материалами и комфортной посадкой.",
  },
  {
    photo: 5,
    title: "Sunbed-зона на носу",
    type: "Bow lounge",
    location: "Носовая палуба",
    description:
      "Носовая зона отдыха с лежаками, мягкими элементами и защитой материалов от солнца.",
  },
  {
    photo: 6,
    title: "Компактная зона cockpit",
    type: "Cockpit",
    location: "Кокпит",
    description:
      "Компактное решение для cockpit-зоны, где важны габариты, проходы и удобство эксплуатации.",
  },
] as const;

export const MATERIALS = [
  {
    photo: 8,
    title: "ТИК",
    description:
      "Премиальная древесина для яхтенной среды: устойчива к влаге, солнцу и красиво стареет со временем.",
  },
  {
    photo: 1,
    title: "ИРОКО",
    description:
      "Плотный массив для outdoor-мебели: хорошо переносит перепады температуры и эксплуатацию у воды.",
  },
  {
    photo: 10,
    title: "SUNBRELLA",
    description:
      "Outdoor-ткани, устойчивые к ультрафиолету, влаге и загрязнениям.",
  },
  {
    photo: 6,
    title: "AISI 304",
    description:
      "Нержавеющая сталь для влажной среды, outdoor-конструкций и зон у воды.",
  },
  {
    photo: 12,
    title: "QUICK-DRY",
    description:
      "Наполнение с быстрым отводом влаги для мягких элементов на палубе и открытых зонах.",
  },
] as const;

export const SERVICE_CARDS = [
  {
    title: "3D-концепция",
    description:
      "Покажем, как мебель будет смотреться на палубе или в зоне отдыха яхты.",
  },
  {
    title: "Подбор решений",
    description:
      "Подберём мебель под сценарии: lounge, dining, sunbed, cockpit или flybridge.",
  },
  {
    title: "Кастомизация",
    description:
      "Адаптируем размеры, ткани, отделку и конфигурацию под проект яхты.",
  },
  {
    title: "Видеопоказ",
    description:
      "Покажем материалы, посадку и коллекции в формате онлайн-презентации.",
  },
  {
    title: "Производство",
    description:
      "Изготовим изделия на собственном производстве с контролем качества.",
  },
  {
    title: "Доставка и установка",
    description:
      "Организуем логистику, сборку и установку с учётом объекта.",
  },
] as const;

export const GALLERY_PHOTOS = [13, 14, 15, 16, 17, 18] as const;
