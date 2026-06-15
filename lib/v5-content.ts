/** Контент и ассеты VERANDARU Yacht Edition (v5) */

import {
  YACHT_HERO,
  YACHT_HERO_V5,
  YACHT_PHILOSOPHY_V5,
  YACHT_MADE_SEA_V5,
  YACHT_OUTDOOR_LIVING_V5,
  YACHT_DETAIL_V5,
  YACHT_LAGOON_AFT_DECK,
  YACHT_LAGOON_DINING,
  YACHT_COLLECTION_BREEZE,
  YACHT_COLLECTION_DUNE,
  YACHT_COLLECTION_GRID,
  YACHT_COLLECTION_JARDIN,
  YACHT_LAGOON_COLLECTION,
  YACHT_LAGOON_FLYBRIDGE,
  YACHT_LAGOON_FOREDECK,
  YACHT_LAGOON_LOUNGE,
  YACHT_MATERIAL_AGORA,
  YACHT_MATERIAL_AISI304,
  YACHT_MATERIAL_FOAM,
  YACHT_MATERIAL_IROKO,
  YACHT_MATERIAL_SUNBRELLA,
  YACHT_MATERIAL_TEAK,
  YACHT_NDA_V5,
  YACHT_CONTACT_V5,
  YACHT_GALLERY_BRIZ_01,
  YACHT_GALLERY_BRIZ_03,
  YACHT_GALLERY_BRIZ_06,
  YACHT_GALLERY_GRID_01,
  YACHT_GALLERY_GRID_10,
  YACHT_GALLERY_JARDIN_01,
  YACHT_GALLERY_JARDIN_09,
  YACHT_GALLERY_JARDIN_10,
  YACHT_GALLERY_MISC_11,
  YACHT_PRODUCTION_STEP_01,
  YACHT_PRODUCTION_STEP_02,
  YACHT_PRODUCTION_STEP_03,
  YACHT_PRODUCTION_STEP_04,
  YACHT_STATEMENT_V5,
  YACHT_VIZ_V5,
  YACHT_ZONE_BEACH,
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
  "За пределами outdoor-мебели",
  "Пространства для яхт, созданные для жизни на воде",
  "Мебель, которая становится частью вашей яхты",
] as const;

/** Панель «Философия» — сразу после hero */
export const V5_PHILOSOPHY = {
  image: YACHT_PHILOSOPHY_V5,
  label: "VERANDARU YACHT EDITION",
  title:
    "Мы создаём не отдельные предметы мебели, а цельные пространства отдыха для жизни на воде",
  subtitle:
    "От идеи и визуализации до производства, комплектации и установки на объекте",
} as const;

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
    textBackdrop: true,
  },
  {
    id: "v5-premium-materials",
    label: "PREMIUM MATERIALS",
    lines: ["Используем материалы", "морского класса"],
    subtitle:
      "Тик, ироко, сталь и outdoor-ткани — в мебели, которая держит вид на воде и солнце.",
    image: V5_IMAGES.craft,
    textBackdrop: true,
  },
  {
    id: "v5-outdoor-living",
    label: "DESIGNED FOR OUTDOOR LIVING",
    lines: ["Создаём мебель", "для outdoor-жизни"],
    subtitle:
      "Проектируем и производим решения для зон отдыха на палубе — в любой точке мира.",
    image: YACHT_OUTDOOR_LIVING_V5,
    textBackdrop: true,
  },
  {
    id: "v5-detail",
    label: "ATTENTION TO DETAIL",
    lines: ["Уделяем внимание", "каждой детали"],
    subtitle:
      "Каждый элемент мебели — под комфорт, надёжность и цельный образ зоны.",
    image: YACHT_DETAIL_V5,
    textBackdrop: true,
  },
  {
    id: "v5-made-sea",
    label: "MADE FOR THE SEA",
    lines: ["Мебель, созданная", "для моря"],
    subtitle:
      "Решения, которые сохраняют вид, комфорт и атмосферу зоны годами на воде.",
    image: YACHT_MADE_SEA_V5,
    textBackdrop: true,
  },
] as const;

export type V5ProductionStep = {
  num: string;
  title: string;
  text: string;
  image: string;
};

export const V5_PRODUCTION = {
  title: "У нас своё производство",
  subtitle:
    "Создаём мебель от коллекции до индивидуального проекта — полный цикл в Москве.",
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
      image: YACHT_PRODUCTION_STEP_04,
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
      title: "Foredeck",
      subtitleRu: "Носовая палуба",
      description:
        "Проектируем мебель для носа — из коллекции или под вашу палубу.",
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
      title: "Aft Deck",
      subtitleRu: "Кормовая палуба",
      description:
        "Создаём мебель для кормы — от лаунж-групп из коллекций до заказа.",
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
      title: "Flybridge",
      subtitleRu: "Верхняя палуба",
      description:
        "Мебель для flybridge — готовые решения или проект под вашу палубу.",
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
      title: "Sundeck",
      subtitleRu: "Солнечная палуба",
      description:
        "Мебель для sun deck — шезлонги и модули из коллекции или на заказ.",
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
      title: "Beach Club",
      subtitleRu: "Зона у воды",
      description:
        "Beach club у воды — мебель из коллекции VERANDARU или индивидуально.",
      solutions: [
        "Шезлонги",
        "Лаунж-модули",
        "Кресла",
        "Столики",
        "Пляжные композиции",
      ],
      image: YACHT_ZONE_BEACH,
      layout: "image-left",
    },
    {
      id: "v5-zone-dining",
      title: "Dining Area",
      subtitleRu: "Обеденная зона",
      description:
        "Обеденные зоны на палубе — столы и кресла из коллекций или на заказ.",
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
      title: "Private Lounge",
      subtitleRu: "Приватная лаунж-зона",
      description:
        "Приватная лаунж-зона — мебель из коллекции или индивидуальный проект.",
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
  catalogCta: "Запросить каталог",
  image: V5_IMAGES.refit,
} as const;

export const V5_VIZ = {
  label: "SEE YOUR SPACE BEFORE PRODUCTION",
  title: "Увидьте проект до начала производства",
  subtitle:
    "Покажем будущий результат ещё до запуска работ независимо от того, выбрали вы коллекцию или индивидуальный проект.",
  cta: "Получить концепцию",
  image: YACHT_VIZ_V5,
} as const;

export const V5_COLLECTIONS = {
  title: "Collections",
  subtitle:
    "Готовые решения для различных зон отдыха на борту яхты.",
  items: [
    {
      name: "Лагун",
      desc: "Спокойные линии прибрежной воды — глубокие модульные композиции для просторных палуб яхты.",
      image: YACHT_LAGOON_COLLECTION,
    },
    {
      name: "Дюна",
      desc: "Тёплые оттенки берега и песка — мягкие модули для открытых палуб у моря.",
      image: YACHT_COLLECTION_DUNE,
    },
    {
      name: "Бриз",
      desc: "Лёгкие решения с воздушной посадкой — как морской бриз на открытых палубах и флайбриджах.",
      image: YACHT_COLLECTION_BREEZE,
    },
    {
      name: "Грид",
      desc: "Чёткая модульная сетка для яхтенных палуб с гибкой конфигурацией под морскую среду.",
      image: YACHT_COLLECTION_GRID,
    },
    {
      name: "Жардин Кутюр",
      desc: "Зелень и мягкие формы — lounge-зоны на палубе с панорамным видом на море.",
      image: YACHT_COLLECTION_JARDIN,
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
      name: "Тик",
      text: "Премиальная древесина с природной устойчивостью к влаге и времени.",
      image: YACHT_MATERIAL_TEAK,
    },
    {
      name: "Ироко",
      text: "Надёжная древесина для круглогодичной outdoor-эксплуатации.",
      image: YACHT_MATERIAL_IROKO,
    },
    {
      name: "SUNBRELLA",
      text: "Outdoor-ткань, сохраняющая цвет и фактуру под солнцем и влагой.",
      image: YACHT_MATERIAL_SUNBRELLA,
    },
    {
      name: "AGORA",
      text: "Премиальная ткань для яхтенных и outdoor-проектов.",
      image: YACHT_MATERIAL_AGORA,
    },
    {
      name: "AISI 304",
      text: "Нержавеющая сталь архитектурного класса для морской среды.",
      image: YACHT_MATERIAL_AISI304,
    },
    {
      name: "QUICK DRY FOAM",
      text: "Наполнение, созданное для быстрого отвода влаги и максимального комфорта.",
      image: YACHT_MATERIAL_FOAM,
    },
  ],
} as const;

export const V5_NDA = {
  label: "PRIVATE YACHT PROJECTS",
  title: "Частные яхтенные проекты",
  body: "Многие проекты остаются конфиденциальными. По запросу мы можем показать дополнительные примеры реализованных работ.",
  cta: "Обсудить частный проект",
  image: YACHT_NDA_V5,
} as const;

export const V5_EXPERIENCE = {
  label: "CLIENT EXPERIENCE",
  title: "Наши клиенты",
  body:
    "VERANDARU — для частных яхт, террас у воды и премиальных outdoor-проектов, где важны эстетика, долговечность и точная посадка решения в пространство.",
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
  hero: YACHT_GALLERY_BRIZ_06,
  row3: [
    YACHT_GALLERY_BRIZ_03,
    YACHT_GALLERY_BRIZ_01,
    YACHT_GALLERY_GRID_01,
  ] as const,
  wide: YACHT_GALLERY_GRID_10,
  pair: [YACHT_GALLERY_JARDIN_01, YACHT_GALLERY_JARDIN_09] as const,
  pair2: [YACHT_GALLERY_JARDIN_10, YACHT_GALLERY_MISC_11] as const,
} as const;

export const V5_FOOTER_TAGLINE = "Yacht Outdoor Living" as const;

export const V5_CTA = {
  label: "LET'S CREATE YOUR SPACE",
  title: "Обсудим ваш проект",
  subtitle:
    "Отправьте фотографии, план палубы или проект. Мы предложим решение под вашу яхту и подготовим концепцию размещения мебели.",
  cta: "Обсудить проект",
  channelsLabel: "Или напишите нам в мессенджеры",
  phone: "+7 (495) 151-30-64",
  email: "sales@veranda.ru",
  image: YACHT_CONTACT_V5,
} as const;

export const V5_NAV_MENU = [
  { numeral: "I", label: "Философия", href: "#v5-statement" },
  { numeral: "II", label: "Производство", href: "#v5-production" },
  { numeral: "III", label: "Пространства", href: "#v5-areas" },
  { numeral: "IV", label: "На заказ", href: "#v5-custom" },
  { numeral: "V", label: "Коллекции", href: "#v5-collections" },
  { numeral: "VI", label: "Визуализация", href: "#v5-viz" },
  { numeral: "VII", label: "Материалы", href: "#v5-materials" },
  { numeral: "VIII", label: "Частные проекты", href: "#v5-nda" },
  { numeral: "IX", label: "Галерея", href: "#v5-gallery" },
  { numeral: "X", label: "Клиенты", href: "#v5-experience" },
  { numeral: "XI", label: "FAQ", href: "#v5-faq" },
  { numeral: "XII", label: "Контакт", href: "#v5-contact" },
] as const;

export const V5_FOOTER_NAV = [
  { label: "Философия", href: "#v5-statement" },
  { label: "Пространства", href: "#v5-areas" },
  { label: "Коллекции", href: "#v5-collections" },
  { label: "Материалы", href: "#v5-materials" },
  { label: "Галерея", href: "#v5-gallery" },
  { label: "Контакт", href: "#v5-contact" },
] as const;
