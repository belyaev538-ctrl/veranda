import { YACHT_VARIANT_IMAGES } from "@/lib/yacht-assets";

export const V2_IMAGES = YACHT_VARIANT_IMAGES;

export const V2_HERO_ENTRANCE = ["OUTDOOR", "SPACES", "FOR YACHTS"] as const;

/** Каждый кадр hero при скролле — 1 или 2 строки */
export const V2_HERO_LINES = [
  ["За пределами идеи о", "мебели на яхте"],
  ["Где воображение", "обретает форму"],
  ["Есть мебель. И есть", "VERANDARU"],
] as const;

export const V2_MENU = [
  { numeral: "I", label: "Философия", href: "#v2-intro" },
  { numeral: "II", label: "Проекты", href: "#v2-concepts" },
  { numeral: "III", label: "Процесс", href: "#v2-pillars" },
  { numeral: "IV", label: "Контакт", href: "#v2-contact" },
] as const;

export const V2_PILLARS = [
  {
    id: "imagine",
    title: "Проектировать",
    coords: "[55° 45' 00\" N 37° 37' 00\" E]",
    body: "С первой линии эскиза до планировки зон на палубе — каждый проект отражает характер владельца и сценарии отдыха на борту.",
    image: V2_IMAGES.craft,
  },
  {
    id: "design",
    title: "Производить",
    coords: "[55° 45' 00\" N 37° 37' 00\" E]",
    body: "Собственное производство в Москве: материалы для морской среды, точная посадка модулей и контроль качества на каждом этапе.",
    image: V2_IMAGES.yard,
  },
  {
    id: "build",
    title: "Монтировать",
    coords: "[43° 00' 00\" N 06° 00' 00\" E]",
    body: "Монтаж на верфи или в марине, согласование с капитаном и судостроителями — пространство готово к сезону.",
    image: V2_IMAGES.refit,
  },
] as const;

export const V2_CONCEPTS = [
  { title: "Flybridge", image: V2_IMAGES.somnium },
  { title: "Dining", image: V2_IMAGES.interior },
  { title: "Refit", image: V2_IMAGES.refit },
  { title: "Production", image: V2_IMAGES.yard },
] as const;

export const V2_JOURNEY = [
  { title: "Новый проект", desc: "Концепция и 3D под вашу яхту" },
  { title: "Refit палубы", desc: "Обновление зон отдыха без простоя" },
  { title: "Сервис", desc: "Уход за материалами и сезонный сервис" },
] as const;

export const V2_FOOTER_LINKS = {
  about: [
    { label: "О VERANDARU", href: "#v2-intro" },
    { label: "Производство", href: "#v2-pillars" },
    { label: "Контакт", href: "#v2-contact" },
  ],
  work: [
    { label: "Проекты", href: "#v2-concepts" },
    { label: "Процесс", href: "#v2-pillars" },
    { label: "Вариант 1", href: "/v6" },
  ],
} as const;
