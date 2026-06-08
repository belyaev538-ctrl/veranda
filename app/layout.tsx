import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERANDARU — Мебель и outdoor-решения для яхт",
  description:
    "Премиальная outdoor-мебель и кастомные решения для палуб, flybridge, кокпитов и зон отдыха на яхтах. Собственное производство в Москве.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className={`${montserrat.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
