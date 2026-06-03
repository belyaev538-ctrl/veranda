/** Контент и ассеты VERANDARU Yacht Edition (v4) */

import { YACHT_HERO, yachtImg } from "@/lib/yacht-assets";

export const V4_IMAGES = {
  hero: YACHT_HERO,
  craft: yachtImg(8),
  yard: yachtImg(9),
  somnium: yachtImg(10),
  interior: yachtImg(11),
  refit: yachtImg(12),
} as const;

export const V4_HERO = {
  line1: "OUTDOOR SPACES",
  line2: "FOR YACHTS",
  subtitle:
    "Премиальная outdoor-мебель и индивидуальные решения для яхтенных пространств",
  cta: "Назначить встречу",
} as const;

export const V4_STATEMENT = {
  label: "VERANDARU YACHT EDITION",
  title:
    "Мы создаём не отдельные предметы мебели, а цельные пространства отдыха для жизни на воде",
  subtitle:
    "От идеи и визуализации до производства, комплектации и установки на объекте",
} as const;

/** Блоки 3–7: fullscreen визуальные главы */
export const V4_VISUAL_CHAPTERS = [
  {
    id: "v4-crafted",
    lines: ["CRAFTED IN RUSSIA", "FOR THE SEA"],
    subtitle:
      "Собственное производство премиальной outdoor-мебели для яхтенных пространств.",
    image: V4_IMAGES.somnium,
  },
  {
    id: "v4-premium-materials",
    lines: ["PREMIUM MATERIALS"],
    subtitle:
      "Материалы, рассчитанные на долгие годы эксплуатации на открытом воздухе.",
    image: V4_IMAGES.craft,
  },
  {
    id: "v4-outdoor-living",
    lines: ["DESIGNED FOR OUTDOOR LIVING"],
    subtitle: "Комфорт, устойчивость и эстетика в любой точке мира.",
    image: V4_IMAGES.interior,
  },
  {
    id: "v4-detail",
    lines: ["ATTENTION TO DETAIL"],
    subtitle: "Каждый элемент проходит ручной контроль качества.",
    image: V4_IMAGES.yard,
  },
  {
    id: "v4-made-sea",
    lines: ["MADE FOR THE SEA"],
    subtitle: "Пространства, которые остаются актуальными годами.",
    image: V4_IMAGES.hero,
  },
] as const;

/** Блок 8: производство */
export const V4_PRODUCTION = {
  title: "VERANDARU",
  subtitle: "Собственное производство полного цикла в Москве.",
  steps: [
    "Деревообработка",
    "Металлопроизводство",
    "Пошив мягких элементов",
    "Финальная сборка",
    "Контроль качества",
  ],
  cta: "Обсудить проект",
} as const;

export const V4_YACHT_AREAS = {
  title: "YACHT SPACES",
  cards: [
    {
      title: "FOREDECK",
      text: "Шезлонги и мягкие зоны у воды",
      image: V4_IMAGES.hero,
    },
    {
      title: "AFT DECK",
      text: "Лаунж и обеденные композиции",
      image: V4_IMAGES.interior,
    },
    {
      title: "FLYBRIDGE",
      text: "Открытые пространства с видом на море",
      image: V4_IMAGES.somnium,
    },
    {
      title: "SUNDECK",
      text: "Солнечная палуба для отдыха",
      image: V4_IMAGES.refit,
    },
    {
      title: "BEACH CLUB",
      text: "Зона у воды и купальных платформ",
      image: V4_IMAGES.yard,
    },
    {
      title: "DINING AREA",
      text: "Ужины на открытой палубе",
      image: V4_IMAGES.craft,
    },
    {
      title: "PRIVATE LOUNGE",
      text: "Приватный лаунж владельца",
      image: V4_IMAGES.interior,
    },
  ],
} as const;

export const V4_CUSTOM = {
  title: "Проектируем под вашу яхту",
  body: "Отправьте проект, чертёж или фотографию палубы. Мы подготовим концепцию размещения мебели и покажем возможный результат.",
  cta: "Отправить проект",
  image: V4_IMAGES.refit,
} as const;

export const V4_VIZ = {
  title: "SEE YOUR SPACE BEFORE PRODUCTION",
  subtitle:
    "Покажем, как мебель будет выглядеть на вашей яхте ещё до начала производства.",
  cta: "Получить визуализацию",
  image: V4_IMAGES.somnium,
} as const;

export const V4_COLLECTIONS = {
  title: "COLLECTIONS",
  items: [
    {
      name: "LAGOON",
      desc: "Глубокие лаунж-композиции для больших палуб",
      image: V4_IMAGES.interior,
    },
    {
      name: "DECKER",
      desc: "Мягкие модули для просторных зон",
      image: V4_IMAGES.somnium,
    },
    {
      name: "KELLY",
      desc: "Элегантная мебель для яхтенных проектов",
      image: V4_IMAGES.yard,
    },
    {
      name: "MARIE",
      desc: "Курортная премиальная эстетика",
      image: V4_IMAGES.hero,
    },
    {
      name: "CRUISE",
      desc: "Компактные решения для палубы",
      image: V4_IMAGES.refit,
    },
    {
      name: "SCREEN",
      desc: "Обеденные кресла с дышащими стропами",
      image: V4_IMAGES.craft,
    },
  ],
} as const;

export const V4_MATERIALS = {
  title: "MATERIALS",
  items: [
    { name: "TEAK", text: "Премиальная древесина для морской среды", image: V4_IMAGES.craft },
    { name: "IROKO", text: "Прочная древесина для outdoor", image: V4_IMAGES.yard },
    { name: "SUNBRELLA", text: "Ткань, устойчивая к солнцу и влаге", image: V4_IMAGES.interior },
    { name: "AGORA", text: "Outdoor-ткань премиального класса", image: V4_IMAGES.refit },
    { name: "AISI 304", text: "Нержавеющая сталь для палубы", image: V4_IMAGES.somnium },
    { name: "QUICK DRY FOAM", text: "Мягкие элементы с быстрым высыханием", image: V4_IMAGES.hero },
  ],
} as const;

export const V4_NDA = {
  title: "PRIVATE YACHT PROJECTS",
  body: "Часть реализованных проектов не публикуется по условиям конфиденциальности.",
  cta: "Запросить примеры",
  image: V4_IMAGES.hero,
} as const;

export const V4_WHY = {
  title: "WHY VERANDARU",
  items: [
    "Собственное производство",
    "Индивидуальные размеры",
    "Премиальные материалы",
    "Комплексное сопровождение",
  ],
} as const;

export const V4_FAQ = [
  {
    q: "Можно ли изготовить мебель по размерам яхты?",
    a: "Да. Для собственного производства VERANDARU возможна адаптация размеров, глубины посадки, тканей, оттенков дерева и конфигурации под конкретный проект.",
  },
  {
    q: "Можно ли сначала увидеть, как мебель будет выглядеть на палубе?",
    a: "Да. Мы можем подготовить визуализацию по фото, плану или проекту яхты, чтобы показать будущую композицию до производства.",
  },
  {
    q: "Какие материалы подходят для морской среды?",
    a: "Для outdoor-пространств используем тик, ироко, уличные ткани Sunbrella и Agora, нержавеющую сталь AISI 304 и защитные покрытия для дерева.",
  },
  {
    q: "Можно ли не публиковать проект?",
    a: "Да. Мы понимаем требования приватности в яхтенных проектах и можем работать с объектом конфиденциально.",
  },
  {
    q: "Вы работаете только с яхтами?",
    a: "Нет. Мы создаём outdoor-пространства для яхт, waterfront-резиденций, beach club зон, отелей, ресторанов и частных террас.",
  },
  {
    q: "Можно ли отправить проект или фото палубы?",
    a: "Да. Отправьте фото, план или визуализацию — мы предложим концепцию, подбор мебели и следующий шаг.",
  },
  {
    q: "Есть ли доставка и установка?",
    a: "Да. Мы сопровождаем проект от подбора до доставки, расстановки и пост-сервиса.",
  },
  {
    q: "Можно ли посмотреть мебель вживую?",
    a: "Да. У VERANDARU есть шоурумы, где можно увидеть материалы, посадку и качество исполнения.",
  },
] as const;

/** Галерея: 1 + 3 + 1 + 2 */
export const V4_GALLERY_LAYOUT = {
  hero: V4_IMAGES.somnium,
  row3: [V4_IMAGES.interior, V4_IMAGES.craft, V4_IMAGES.refit] as const,
  wide: V4_IMAGES.hero,
  pair: [V4_IMAGES.yard, V4_IMAGES.interior] as const,
} as const;

export const V4_CTA = {
  title: "LET'S CREATE YOUR SPACE",
  subtitle:
    "Расскажите о вашей яхте или отправьте проект — мы предложим решение под размеры, стиль и сценарий отдыха.",
  cta: "Назначить встречу",
  phone: "+7 (495) 151-30-64",
  email: "sales@veranda.ru",
  image: V4_IMAGES.somnium,
} as const;

export const V4_NAV_MENU = [
  { numeral: "I", label: "Философия", href: "#v4-statement" },
  { numeral: "II", label: "Пространства", href: "#v4-areas" },
  { numeral: "III", label: "Коллекции", href: "#v4-collections" },
  { numeral: "IV", label: "Контакт", href: "#v4-contact" },
] as const;

export const V4_FOOTER_NAV = [
  { label: "Yacht Spaces", href: "#v4-areas" },
  { label: "Collections", href: "#v4-collections" },
  { label: "Materials", href: "#v4-materials" },
  { label: "Private Projects", href: "#v4-nda" },
  { label: "Contact", href: "#v4-contact" },
] as const;
