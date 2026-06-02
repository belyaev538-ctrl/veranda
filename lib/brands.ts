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
