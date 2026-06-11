import type { Metadata } from "next";
import { V5_IMAGES } from "@/lib/v5-content";

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
    <>
      <link
        rel="preload"
        as="image"
        href={V5_IMAGES.hero}
        fetchPriority="high"
      />
      <div className="min-h-screen bg-[#020B1F] font-sans text-white antialiased">
        {children}
      </div>
    </>
  );
}
