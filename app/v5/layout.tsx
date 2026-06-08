import type { Metadata } from "next";

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
    <div className="min-h-screen bg-[#020B1F] font-sans text-white antialiased">
      {children}
    </div>
  );
}
