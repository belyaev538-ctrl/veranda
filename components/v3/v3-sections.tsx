"use client";

import Image from "next/image";
import { useContactForm } from "@/components/contact-form-provider";
import { V3_FOOTER_LINKS, V3_IMAGES } from "@/lib/v3-content";

export function V3Contact() {
  const { open } = useContactForm();

  return (
    <section id="v3-contact" className="relative overflow-hidden bg-[#0d1322] section-pad">
      <div className="absolute inset-0">
        <Image
          src={V3_IMAGES.hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-35"
        />
        <div className="absolute inset-0 bg-[#0d1322]/88" />
      </div>

      <div className="container-luxury relative text-center">
        <h2 className="v3-heading-light mx-auto max-w-3xl">
          Покажем, как может выглядеть зона отдыха на вашей яхте
        </h2>
        <p className="mx-auto mt-8 max-w-lg font-sans text-base text-white/55">
          Оставьте заявку — подготовим концепцию и 3D-визуализацию под ваш проект.
        </p>
        <button type="button" onClick={open} className="v3-btn-primary mt-12">
          Обсудить проект
        </button>
      </div>
    </section>
  );
}

export function V3Footer() {
  const { open } = useContactForm();

  return (
    <footer className="border-t border-white/10 bg-[#080b15] py-16">
      <div className="container-luxury grid grid-cols-1 gap-12 tablet:grid-cols-12">
        <div className="tablet:col-span-4">
          <p className="v3-footer-brand">VERANDARU</p>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-white/45">
            Outdoor-мебель и проектирование зон отдыха для яхт. Москва.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 tablet:col-span-5">
          <div>
            <p className="v3-footer-col-title">О нас</p>
            <ul className="mt-4 space-y-2">
              {V3_FOOTER_LINKS.about.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="v3-footer-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="v3-footer-col-title">Работа</p>
            <ul className="mt-4 space-y-2">
              {V3_FOOTER_LINKS.work.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="v3-footer-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tablet:col-span-3">
          <p className="v3-footer-col-title">Связаться</p>
          <button type="button" onClick={open} className="v3-footer-link mt-4 block">
            Обсудить проект
          </button>
        </div>
      </div>

      <p className="container-luxury mt-14 border-t border-white/10 pt-8 font-sans text-xs text-white/40">
        © {new Date().getFullYear()} VERANDARU
      </p>
    </footer>
  );
}
