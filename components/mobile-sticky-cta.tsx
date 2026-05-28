"use client";

import Link from "next/link";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 p-4 backdrop-blur-xl desktop:hidden">
      <Link href="#contacts" className="btn-primary w-full">
        Обсудить проект яхты
      </Link>
    </div>
  );
}
