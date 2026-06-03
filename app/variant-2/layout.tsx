import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VERANDARU — Вариант 2 (яхтенный лендинг)",
  description:
    "Вторая версия лендинга VERANDARU для яхтенной мебели. Сравнение с вариантом 1.",
};

export default function Variant2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
