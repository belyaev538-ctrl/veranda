import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VERANDARU — Мебель и outdoor-решения для яхт (V1)",
  description:
    "Премиальная outdoor-мебель и кастомные решения для палуб, flybridge, кокпитов и зон отдыха на яхтах. Собственное производство в Москве.",
};

export default function V1ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
