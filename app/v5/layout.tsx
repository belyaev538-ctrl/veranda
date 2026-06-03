import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

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
  title: "VERANDARU — Yacht Tour Edition",
  description:
    "Экскурсия по зонам яхты: премиальные outdoor-пространства, коллекции и индивидуальные проекты.",
};

export default function V5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#020B1F] font-sans text-white antialiased`}
    >
      {children}
    </div>
  );
}
