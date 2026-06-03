/** Контент и ассеты VERANDARU Yacht Edition (v5) */

import { YACHT_HERO, YACHT_HERO_V5, yachtImg } from "@/lib/yacht-assets";

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
  cta: "Назначить встречу",
} as const;

export const V5_STATEMENT = {
  image: V5_IMAGES.hero,
  label: "VERANDARU YACHT EDITION",
  titleLines: [
    ["Мы создаём не отдельные", "предметы мебели,"],
    ["а цельные пространства отдыха", "для жизни на воде"],
  ],
  subtitle:
    "От идеи и визуализации до производства, комплектации и установки на объекте",
} as const;

export const V5_VISUAL_CHAPTERS = [
  {
    id: "v5-crafted",
    lines: ["CRAFTED IN RUSSIA", "FOR THE SEA"],
    subtitle:
      "Собственное производство премиальной outdoor-мебели для яхтенных пространств.",
    image: V5_IMAGES.somnium,
  },
  {
    id: "v5-premium-materials",
    lines: ["PREMIUM MATERIALS"],
    subtitle:
      "Материалы, рассчитанные на долгие годы эксплуатации на открытом воздухе.",
    image: V5_IMAGES.craft,
  },
  {
    id: "v5-outdoor-living",
    lines: ["DESIGNED FOR OUTDOOR LIVING"],
    subtitle: "Комфорт, устойчивость и эстетика в любой точке мира.",
    image: V5_IMAGES.interior,
  },
  {
    id: "v5-detail",
    lines: ["ATTENTION TO DETAIL"],
    subtitle: "Каждый элемент проходит ручной контроль качества.",
    image: V5_IMAGES.yard,
  },
  {
    id: "v5-made-sea",
    lines: ["MADE FOR THE SEA"],
    subtitle: "Пространства, которые остаются актуальными годами.",
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
  title: "VERANDARU",
  subtitle: "От производства до установки — полный цикл в Москве.",
  steps: [
    {
      num: "01",
      title: "Деревообработка",
      text: "Подбор пород и фактур под условия палубы и климата.\nТочная раскройка, шлифовка и подготовка несущих элементов.\nКонтроль влажности и геометрии на каждом этапе.",
      image: yachtImg(6),
    },
    {
      num: "02",
      title: "Металлопроизводство",
      text: "Каркасы и крепёж из коррозионностойких сплавов.\nСварка, полировка и защитные покрытия под морскую среду.\nСоответствие нагрузкам и эстетике проекта.",
      image: yachtImg(7),
    },
    {
      num: "03",
      title: "Пошив мягких элементов",
      text: "Ткани и наполнители с устойчивостью к UV и влаге.\nИндивидуальные чехлы, подушки и мягкие модули.\nПосадка и тактильный комфорт под сценарий отдыха.",
      image: yachtImg(8),
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
  subtitleRu: string;
  description: string;
  solutions: readonly string[];
  image: string;
  layout: V5YachtTourLayout;
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
        "Daybed",
        "Кофейные столики",
        "Мягкие модули",
        "Лаунж-зоны у воды",
      ],
      image: V5_IMAGES.hero,
      layout: "cover",
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
      image: V5_IMAGES.interior,
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
      image: V5_IMAGES.somnium,
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
      image: V5_IMAGES.refit,
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
      image: V5_IMAGES.craft,
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
      image: V5_IMAGES.interior,
      layout: "image-left",
    },
  ] satisfies readonly V5YachtTourZone[],
} as const;

export const V5_CUSTOM = {
  title: "Проектируем под вашу яхту",
  body: "Отправьте проект, чертёж или фотографию палубы. Мы подготовим концепцию размещения мебели и покажем возможный результат.",
  cta: "Отправить проект",
  image: V5_IMAGES.refit,
} as const;

export const V5_VIZ = {
  title: "SEE YOUR SPACE BEFORE PRODUCTION",
  subtitle:
    "Покажем, как мебель будет выглядеть на вашей яхте ещё до начала производства.",
  cta: "Получить визуализацию",
  image: V5_IMAGES.somnium,
} as const;

export const V5_COLLECTIONS = {
  title: "COLLECTIONS",
  items: [
    {
      name: "LAGOON",
      desc: "Глубокие лаунж-композиции для больших палуб",
      image: V5_IMAGES.interior,
    },
    {
      name: "DECKER",
      desc: "Мягкие модули для просторных зон",
      image: V5_IMAGES.somnium,
    },
    {
      name: "KELLY",
      desc: "Элегантная мебель для яхтенных проектов",
      image: V5_IMAGES.yard,
    },
    {
      name: "MARIE",
      desc: "Курортная премиальная эстетика",
      image: V5_IMAGES.hero,
    },
    {
      name: "CRUISE",
      desc: "Компактные решения для палубы",
      image: V5_IMAGES.refit,
    },
    {
      name: "SCREEN",
      desc: "Обеденные кресла с дышащими стропами",
      image: V5_IMAGES.craft,
    },
  ],
} as const;

export const V5_MATERIALS = {
  title: "MATERIALS",
  items: [
    { name: "TEAK", text: "Премиальная древесина для морской среды", image: V5_IMAGES.craft },
    { name: "IROKO", text: "Прочная древесина для outdoor", image: V5_IMAGES.yard },
    { name: "SUNBRELLA", text: "Ткань, устойчивая к солнцу и влаге", image: V5_IMAGES.interior },
    { name: "AGORA", text: "Outdoor-ткань премиального класса", image: V5_IMAGES.refit },
    { name: "AISI 304", text: "Нержавеющая сталь для палубы", image: V5_IMAGES.somnium },
    { name: "QUICK DRY FOAM", text: "Мягкие элементы с быстрым высыханием", image: V5_IMAGES.hero },
  ],
} as const;

export const V5_NDA = {
  title: "PRIVATE YACHT PROJECTS",
  body: "Часть реализованных проектов не публикуется по условиям конфиденциальности.",
  cta: "Запросить примеры",
  image: V5_IMAGES.hero,
} as const;

export const V5_WHY = {
  title: "WHY VERANDARU",
  items: [
    "Собственное производство",
    "Индивидуальные размеры",
    "Премиальные материалы",
    "Комплексное сопровождение",
  ],
} as const;

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

export const V5_CTA = {
  title: "LET'S CREATE YOUR SPACE",
  subtitle:
    "Расскажите о вашей яхте или отправьте проект — мы предложим решение под размеры, стиль и сценарий отдыха.",
  cta: "Назначить встречу",
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
