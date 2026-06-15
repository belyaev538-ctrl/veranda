import { YACHT_VARIANT_IMAGES } from "@/lib/yacht-assets";

export const V3_IMAGES = YACHT_VARIANT_IMAGES;

export const V3_HERO_ENTRANCE = ["OUTDOOR", "SPACES", "FOR YACHTS"] as const;

export const V3_HERO_LINES = [
  ["За пределами идеи о", "мебели на яхте"],
  ["Где воображение", "обретает форму"],
  ["Есть мебель. И есть", "VERANDARU"],
] as const;

export const V3_MENU = [
  { numeral: "I", label: "Философия", href: "#v3-pillars" },
  { numeral: "II", label: "Проекты", href: "#v3-concepts" },
  { numeral: "III", label: "Процесс", href: "#v3-pillars" },
  { numeral: "IV", label: "Контакт", href: "#v3-contact" },
] as const;

export const V3_PILLARS = [
  {
    id: "imagine",
    title: "Проектировать",
    coords: "[55° 45' 00\" N 37° 37' 00\" E]",
    body: "С первой линии эскиза до планировки зон на палубе — каждый проект отражает характер владельца и сценарии отдыха на борту.",
    image: V3_IMAGES.craft,
  },
  {
    id: "design",
    title: "Производить",
    coords: "[55° 45' 00\" N 37° 37' 00\" E]",
    body: "Собственное производство в Москве: материалы для морской среды, точная посадка модулей и контроль качества на каждом этапе.",
    image: V3_IMAGES.yard,
  },
  {
    id: "build",
    title: "Монтировать",
    coords: "[43° 00' 00\" N 06° 00' 00\" E]",
    body: "Монтаж на верфи или в марине, согласование с капитаном и судостроителями — пространство готово к сезону.",
    image: V3_IMAGES.refit,
  },
] as const;

/** Координаты на заставке (компас) — цикл при прокрутке */
export const V3_INTRO_COORDS = V3_PILLARS.map((p) => p.coords);

export const V3_CONCEPTS = [
  { title: "Flybridge", image: V3_IMAGES.somnium },
  { title: "Dining", image: V3_IMAGES.interior },
  { title: "Refit", image: V3_IMAGES.refit },
  { title: "Production", image: V3_IMAGES.yard },
] as const;

export const V3_JOURNEY = [
  { title: "Новый проект", desc: "Концепция и 3D под вашу яхту" },
  { title: "Refit палубы", desc: "Обновление зон отдыха без простоя" },
  { title: "Сервис", desc: "Уход за материалами и сезонный сервис" },
] as const;

export const V3_FOOTER_LINKS = {
  about: [
    { label: "О VERANDARU", href: "#v3-pillars" },
    { label: "Производство", href: "#v3-pillars" },
    { label: "Контакт", href: "#v3-contact" },
  ],
  work: [
    { label: "Проекты", href: "#v3-concepts" },
    { label: "Процесс", href: "#v3-pillars" },
    { label: "Вариант 1", href: "/v1" },
  ],
} as const;
