export type SocialProofBrand = {
  name: string;
  /** /public/brands — сейчас SVG, позже можно заменить на .png с прозрачным фоном */
  logo: string;
  width: number;
  height: number;
};

/** Логотипы клиентов для плиточной marquee-ленты */
export const SOCIAL_PROOF_BRANDS: SocialProofBrand[] = [
  {
    name: "Marriott",
    logo: "/brands/marriott.svg",
    width: 120,
    height: 32,
  },
  {
    name: "Four Seasons",
    logo: "/brands/four-seasons.svg",
    width: 200,
    height: 32,
  },
  {
    name: "Mriya Resort",
    logo: "/brands/mriya-resort.svg",
    width: 180,
    height: 32,
  },
  {
    name: "Magadan",
    logo: "/brands/magadan.svg",
    width: 140,
    height: 32,
  },
  {
    name: "Delmar",
    logo: "/brands/delmar.svg",
    width: 120,
    height: 32,
  },
  {
    name: "Atlas",
    logo: "/brands/atlas.svg",
    width: 100,
    height: 32,
  },
];

/** Логотипы партнёров для #v5-experience (PNG из /public/brands/partners) */
export const V5_PARTNER_BRANDS: SocialProofBrand[] = [
  { name: "Marriott", logo: "/brands/partners/marriott.png", width: 220, height: 100 },
  { name: "Базар", logo: "/brands/partners/bazar.png", width: 220, height: 100 },
  { name: "Four Seasons", logo: "/brands/partners/four-seasons.png", width: 220, height: 100 },
  { name: "Магадан", logo: "/brands/partners/magadan.png", width: 220, height: 100 },
  { name: "Мрия", logo: "/brands/partners/mriya.png", width: 220, height: 100 },
  { name: "Далмар", logo: "/brands/partners/delmar.png", width: 220, height: 100 },
  { name: "Клич", logo: "/brands/partners/klich.png", width: 220, height: 100 },
  { name: "Сахалин", logo: "/brands/partners/sakhalin.png", width: 220, height: 100 },
];
