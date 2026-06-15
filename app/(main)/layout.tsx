import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { V5_IMAGES } from "@/lib/v5-content";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-v4-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-v4-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERANDARU — Мебель для яхт",
  description:
    "Премиальная outdoor-мебель и кастомные решения для палуб, flybridge, кокпитов и зон отдыха на яхтах.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={V5_IMAGES.hero}
        fetchPriority="high"
      />
      <div
        className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#020B1F] text-white antialiased`}
      >
        {children}
      </div>
    </>
  );
}
