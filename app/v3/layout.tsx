import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VERANDARU — Вариант 3 (премиальный лендинг)",
  description:
    "Третья версия лендинга VERANDARU: полноэкранные фото, зоны палуб, материалы и встреча с командой.",
};

export default function V3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d1322] font-sans font-light text-white antialiased">
      {children}
    </div>
  );
}
