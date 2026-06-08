/** Контент и ассеты VERANDARU Yacht Edition (v5) */

import {
  YACHT_HERO,
  YACHT_HERO_V5,
  YACHT_LAGOON_DETAIL,
  YACHT_LAGOON_AFT_DECK,
  YACHT_LAGOON_DINING,
  YACHT_LAGOON_COLLECTION,
  YACHT_LAGOON_FLYBRIDGE,
  YACHT_LAGOON_FOREDECK,
  YACHT_LAGOON_LOUNGE,
  YACHT_LAGOON_OUTDOOR_LIVING,
  YACHT_MATERIAL_SUNBRELLA,
  YACHT_PRODUCTION_STEP_01,
  YACHT_PRODUCTION_STEP_02,
  YACHT_PRODUCTION_STEP_03,
  YACHT_STATEMENT_V5,
  YACHT_ZONE_SUNDECK,
  yachtImg,
} from "@/lib/yacht-assets";

export const V5_IMAGES = {
  hero: YACHT_HERO_V5,
  craft: yachtImg(13),
  yard: yachtImg(14),
  somnium: yachtImg(15),
  interior: yachtImg(16),
  refit: yachtImg(0),
} as const;

export const V5_HERO = {
  line1: "OUTDOOR SPACES",
  line2: "FOR YACHTS",
  subtitle:
    "Премиальная outdoor-мебель и индивидуальные решения для яхтенных пространств",
  cta: "Обсудить проект",
} as const;

/** Кадры hero при скролле (v5) */
export const V5_HERO_LINES = [
  "Beyond Outdoor Furniture",
  "Пространства для яхт, созданные для жизни на воде",
  "Мебель, которая становится частью вашей яхты",
] as const;

export const V5_STATEMENT = {
  image: YACHT_STATEMENT_V5,
  label: "VERANDARU YACHT EDITION",
  titleLines: [
    "Готовые коллекции и",
    "индивидуальные решения",
    "для яхтенных пространств.",
  ],
  subtitle:
    "От первых эскизов и визуализации до производства, комплектации и установки на борту.",
} as const;

export const V5_VISUAL_CHAPTERS = [
  {
    id: "v5-crafted",
    label: "CRAFTED IN RUSSIA FOR THE SEA",
    lines: ["Собственное производство", "для яхтенных пространств"],
    subtitle:
      "От готовых коллекций до индивидуальных проектов. Полный цикл производства и сопровождения в Москве.",
    image: V5_IMAGES.somnium,
  },
  {
    id: "v5-premium-materials",
    label: "PREMIUM MATERIALS",
    lines: ["Материалы морского класса"],
    subtitle:
      "Тик, ироко, нержавеющая сталь и премиальные outdoor-ткани для эксплуатации на воде и открытом воздухе.",
    image: V5_IMAGES.craft,
  },
  {
    id: "v5-outdoor-living",
    label: "DESIGNED FOR OUTDOOR LIVING",
    lines: ["Создано для жизни", "на открытом воздухе"],
    subtitle:
      "Комфорт, долговечность и эстетика для яхтенных пространств в любой точке мира.",
    image: YACHT_LAGOON_OUTDOOR_LIVING,
  },
  {
    id: "v5-detail",
    label: "ATTENTION TO DETAIL",
    lines: ["Внимание к каждой", "детали"],
    subtitle:
      "Каждый элемент продуман для комфорта, надёжности и визуального совершенства.",
    image: YACHT_LAGOON_DETAIL,
  },
  {
    id: "v5-made-sea",
    label: "MADE FOR THE SEA",
    lines: ["Создано для моря"],
    subtitle:
      "Материалы и решения, которые сохраняют актуальность и внешний вид на протяжении многих лет.",
    image: V5_IMAGES.hero,
  },
] as const;

export type V5ProductionStep = {
  num: string;
  title: string;
  text: string;
  image: string;
};

export const V5_PRODUCTION = {
  title: "Собственное производство",
  subtitle: [
    "От коллекции до индивидуального проекта —",
    "полный цикл производства и сопровождения в Москве.",
  ],
  steps: [
    {
      num: "01",
      title: "Деревообработка",
      text: "Подбор пород и фактур под условия палубы и климата.\nТочная раскройка, шлифовка и подготовка несущих элементов.\nКонтроль влажности и геометрии на каждом этапе.",
      image: YACHT_PRODUCTION_STEP_01,
    },
    {
      num: "02",
      title: "Металлопроизводство",
      text: "Каркасы и крепёж из коррозионностойких сплавов.\nСварка, полировка и защитные покрытия под морскую среду.\nСоответствие нагрузкам и эстетике проекта.",
      image: YACHT_PRODUCTION_STEP_02,
    },
    {
      num: "03",
      title: "Пошив мягких элементов",
      text: "Ткани и наполнители с устойчивостью к UV и влаге.\nИндивидуальные чехлы, подушки и мягкие модули.\nПосадка и тактильный комфорт под сценарий отдыха.",
      image: YACHT_PRODUCTION_STEP_03,
    },
    {
      num: "04",
      title: "Финальная сборка",
      text: "Сборка модулей в московском цехе под ваш проект.\nСтыковка материалов, фурнитуры и декоративных деталей.\nПредмонтажная проверка перед отправкой на объект.",
      image: yachtImg(9),
    },
    {
      num: "05",
      title: "Контроль качества",
      text: "Многоступенчатая приёмка каждого изделия.\nПроверка геометрии, креплений и внешнего вида.\nДокументация и сопровождение до установки на яхте.",
      image: yachtImg(10),
    },
  ] satisfies readonly V5ProductionStep[],
  cta: "Обсудить проект",
} as const;

export type V5YachtTourLayout = "cover" | "image-right" | "image-left";

export type V5YachtTourZone = {
  id: string;
  title: string;
  image: string;
  layout: V5YachtTourLayout;
  /** Eyebrow над заголовком (split-зоны) */
  subtitleRu?: string;
  /** Cover-зона: один абзац (как chapter-sub) */
  intro?: string;
  description?: string;
  solutions?: readonly string[];
};

/** Экскурсия по зонам яхты — после блока производства */
export const V5_YACHT_TOUR = {
  label: "YACHT SPACES",
  zones: [
    {
      id: "v5-zone-foredeck",
      title: "FOREDECK",
      subtitleRu: "Носовая палуба",
      description:
        "Пространство у носа яхты — первая зона отдыха у воды и открытого горизонта.",
      solutions: [
        "Шезлонги",
        "Кресла",
        "Столики",
        "Коктейльные зоны",
        "Теневые конструкции",
      ],
      image: YACHT_LAGOON_FOREDECK,
      layout: "image-left",
    },
    {
      id: "v5-zone-aft",
      title: "AFT DECK",
      subtitleRu: "Кормовая палуба",
      description:
        "Основное пространство для отдыха, встреч и общения на борту.",
      solutions: [
        "Диванные группы",
        "Кофейные столы",
        "Кресла",
        "Outdoor-ковры",
        "Лаунж-зоны",
      ],
      image: YACHT_LAGOON_AFT_DECK,
      layout: "image-right",
    },
    {
      id: "v5-zone-flybridge",
      title: "FLYBRIDGE",
      subtitleRu: "Верхняя палуба",
      description:
        "Открытая панорамная зона для отдыха с лучшими видами на море.",
      solutions: [
        "Барные группы",
        "Диваны",
        "Кресла",
        "Обеденные столы",
        "Теневые конструкции",
      ],
      image: YACHT_LAGOON_FLYBRIDGE,
      layout: "image-left",
    },
    {
      id: "v5-zone-sundeck",
      title: "SUNDECK",
      subtitleRu: "Солнечная палуба",
      description: "Зона расслабленного отдыха и принятия солнечных ванн.",
      solutions: [
        "Шезлонги",
        "Daybed",
        "Пуфы",
        "Столики",
        "Мягкие модули",
      ],
      image: YACHT_ZONE_SUNDECK,
      layout: "image-right",
    },
    {
      id: "v5-zone-beach",
      title: "BEACH CLUB",
      subtitleRu: "Зона у воды",
      description:
        "Пространство на уровне моря для отдыха после купания и общения рядом с водой.",
      solutions: [
        "Шезлонги",
        "Лаунж-модули",
        "Кресла",
        "Столики",
        "Пляжные композиции",
      ],
      image: V5_IMAGES.yard,
      layout: "image-left",
    },
    {
      id: "v5-zone-dining",
      title: "DINING AREA",
      subtitleRu: "Обеденная зона",
      description:
        "Пространство для завтраков, ужинов и приёма гостей на открытом воздухе.",
      solutions: [
        "Обеденные столы",
        "Кресла",
        "Барные группы",
        "Сервировочные станции",
      ],
      image: YACHT_LAGOON_DINING,
      layout: "image-right",
    },
    {
      id: "v5-zone-lounge",
      title: "PRIVATE LOUNGE",
      subtitleRu: "Приватная лаунж-зона",
      description:
        "Уединённое пространство для владельца яхты и ближайших гостей.",
      solutions: [
        "Лаунж-диваны",
        "Кресла",
        "Daybed",
        "Столики",
        "Индивидуальные композиции",
      ],
      image: YACHT_LAGOON_LOUNGE,
      layout: "image-left",
    },
  ] satisfies readonly V5YachtTourZone[],
} as const;

export const V5_CUSTOM = {
  title: "Готовая коллекция или индивидуальный проект",
  body: "Выберите готовую коллекцию VERANDARU или закажите индивидуальное решение, разработанное специально под вашу яхту.",
  cta: "Обсудить проект",
  image: V5_IMAGES.refit,
} as const;

export const V5_VIZ = {
  label: "SEE YOUR SPACE BEFORE PRODUCTION",
  title: "Увидьте проект до начала производства",
  subtitle:
    "Покажем будущий результат ещё до запуска работ независимо от того, выбрали вы коллекцию или индивидуальный проект.",
  cta: "Получить концепцию",
  image: V5_IMAGES.somnium,
} as const;

export const V5_COLLECTIONS = {
  title: "COLLECTIONS",
  subtitle:
    "Готовые решения для различных зон отдыха на борту яхты.",
  items: [
    {
      name: "LAGOON",
      desc: "Глубокие модульные композиции для просторных палуб и зон отдыха.",
      image: YACHT_LAGOON_COLLECTION,
    },
    {
      name: "DECKER",
      desc: "Широкая посадка и мягкие модули для расслабленного отдыха на борту.",
      image: V5_IMAGES.somnium,
    },
    {
      name: "KELLY",
      desc: "Спокойная элегантность для яхтенных и частных проектов.",
      image: V5_IMAGES.yard,
    },
    {
      name: "MARIE",
      desc: "Плавные линии, мягкая посадка и атмосфера премиального отдыха.",
      image: V5_IMAGES.hero,
    },
    {
      name: "CRUISE",
      desc: "Лёгкие решения для палубы, пляжных зон и отдыха у воды.",
      image: V5_IMAGES.refit,
    },
    {
      name: "SCREEN",
      desc: "Воздушные кресла для обеденных зон на открытом воздухе.",
      image: V5_IMAGES.craft,
    },
  ],
} as const;

export const V5_MATERIALS = {
  label: "MATERIALS",
  title: "Материалы морского класса",
  subtitle:
    "Подобраны для эксплуатации в условиях солнца, влаги и морской среды.",
  items: [
    {
      name: "TEAK",
      text: "Премиальная древесина с природной устойчивостью к влаге и времени.",
      image: V5_IMAGES.craft,
    },
    {
      name: "IROKO",
      text: "Надёжная древесина для круглогодичной outdoor-эксплуатации.",
      image: V5_IMAGES.yard,
    },
    {
      name: "SUNBRELLA",
      text: "Outdoor-ткань, сохраняющая цвет и фактуру под солнцем и влагой.",
      image: YACHT_MATERIAL_SUNBRELLA,
    },
    {
      name: "AGORA",
      text: "Премиальная ткань для яхтенных и outdoor-проектов.",
      image: V5_IMAGES.refit,
    },
    {
      name: "AISI 304",
      text: "Нержавеющая сталь архитектурного класса для морской среды.",
      image: V5_IMAGES.somnium,
    },
    {
      name: "QUICK DRY FOAM",
      text: "Наполнение, созданное для быстрого отвода влаги и максимального комфорта.",
      image: V5_IMAGES.hero,
    },
  ],
} as const;

export const V5_NDA = {
  label: "PRIVATE YACHT PROJECTS",
  title: "Частные яхтенные проекты",
  body: "Многие проекты остаются конфиденциальными. По запросу мы можем показать дополнительные примеры реализованных работ.",
  cta: "Обсудить частный проект",
  image: V5_IMAGES.hero,
} as const;

export const V5_WHY = {
  title: "Почему VERANDARU",
  items: [
    {
      title: "Готовые коллекции",
      subtitle: [
        "Первая строка подтекста.",
        "Вторая строка подтекста.",
      ],
    },
    {
      title: "Кастомизация",
      subtitle: [
        "Первая строка подтекста.",
        "Вторая строка подтекста.",
      ],
    },
    {
      title: "Материалы морского класса",
      subtitle: [
        "Первая строка подтекста.",
        "Вторая строка подтекста.",
      ],
    },
    {
      title: "Индивидуальные проекты",
      subtitle: [
        "Первая строка подтекста.",
        "Вторая строка подтекста.",
      ],
    },
  ],
} as const;

export const V5_FAQ_TITLE = "Частые вопросы" as const;

export const V5_FAQ = [
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

export const V5_GALLERY_LAYOUT = {
  hero: V5_IMAGES.somnium,
  row3: [V5_IMAGES.interior, V5_IMAGES.craft, V5_IMAGES.refit] as const,
  wide: V5_IMAGES.hero,
  pair: [V5_IMAGES.yard, V5_IMAGES.interior] as const,
} as const;

export const V5_FOOTER_TAGLINE = "Yacht Outdoor Living" as const;

export const V5_CTA = {
  label: "LET'S CREATE YOUR SPACE",
  title: "Обсудим ваш проект",
  subtitle:
    "Отправьте фотографии, план палубы или проект. Мы предложим решение под вашу яхту и подготовим концепцию размещения мебели.",
  cta: "Обсудить проект",
  phone: "+7 (495) 151-30-64",
  email: "sales@veranda.ru",
  image: V5_IMAGES.somnium,
} as const;

export const V5_NAV_MENU = [
  { numeral: "I", label: "Философия", href: "#v5-statement" },
  { numeral: "II", label: "Пространства", href: "#v5-areas" },
  { numeral: "III", label: "Коллекции", href: "#v5-collections" },
  { numeral: "IV", label: "Контакт", href: "#v5-contact" },
] as const;

export const V5_FOOTER_NAV = [
  { label: "Yacht Spaces", href: "#v5-areas" },
  { label: "Collections", href: "#v5-collections" },
  { label: "Materials", href: "#v5-materials" },
  { label: "Private Projects", href: "#v5-nda" },
  { label: "Contact", href: "#v5-contact" },
] as const;
