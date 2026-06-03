"use client";

import Image from "next/image";
import { useState } from "react";
import { useContactForm } from "@/components/contact-form-provider";
import { V4FullscreenChapter } from "@/components/v4/v4-fullscreen";
import { V4InlineLeadForm } from "@/components/v4/v4-inline-lead";
import { V4PinnedRail } from "@/components/v4/v4-pinned-rail";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { V4SectionEnter } from "@/components/v4/v4-section-enter";
import { V4Button, V4DisplayTitle, V4Label, V4Reveal } from "@/components/v4/v4-ui";
import { CONTACTS } from "@/lib/constants";
import {
  V4_COLLECTIONS,
  V4_CTA,
  V4_CUSTOM,
  V4_FAQ,
  V4_FOOTER_NAV,
  V4_GALLERY_LAYOUT,
  V4_MATERIALS,
  V4_NDA,
  V4_PRODUCTION,
  V4_STATEMENT,
  V4_VISUAL_CHAPTERS,
  V4_VIZ,
  V4_WHY,
  V4_YACHT_AREAS,
} from "@/lib/v4-content";

export function V4Statement() {
  return (
    <V4SectionEnter
      id="v4-statement"
      className="v4-panel v4-panel--milk flex min-h-svh items-center section-pad"
    >
      <div className="container-luxury mx-auto max-w-3xl text-center">
        <V4Reveal>
          <V4Label>{V4_STATEMENT.label}</V4Label>
          <p className="v4-editorial mt-8 text-[#1E1E1E]">
            <TextShimmer tone="gold">{V4_STATEMENT.title}</TextShimmer>
          </p>
          <p className="v4-body-muted mx-auto mt-8 max-w-xl">{V4_STATEMENT.subtitle}</p>
        </V4Reveal>
      </div>
    </V4SectionEnter>
  );
}

export function V4VisualChapters() {
  return (
    <>
      {V4_VISUAL_CHAPTERS.map((ch) => (
        <V4FullscreenChapter
          key={ch.id}
          id={ch.id}
          image={ch.image}
          lines={ch.lines}
          subtitle={ch.subtitle}
        />
      ))}
    </>
  );
}

export function V4Production() {
  const { open } = useContactForm();
  return (
    <V4SectionEnter id="v4-production" className="v4-panel v4-panel--milk section-pad">
      <div className="container-luxury mx-auto max-w-3xl text-center">
        <V4Reveal>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light tracking-tight text-[#1E1E1E]">
            <TextShimmer tone="gold">{V4_PRODUCTION.title}</TextShimmer>
          </h2>
          <p className="v4-body-muted mx-auto mt-6 max-w-md">{V4_PRODUCTION.subtitle}</p>
        </V4Reveal>
        <V4Reveal>
          <ol className="v4-production-steps mx-auto mt-16 max-w-lg">
            {V4_PRODUCTION.steps.map((step, i) => (
              <li key={step} className="v4-production-step">
                <span className="v4-production-step__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="v4-production-step__text">{step}</span>
              </li>
            ))}
          </ol>
        </V4Reveal>
        <V4Reveal className="mt-14">
          <V4Button onClick={open} className="v4-btn--dark">
            {V4_PRODUCTION.cta}
          </V4Button>
        </V4Reveal>
      </div>
    </V4SectionEnter>
  );
}

export function V4YachtAreas() {
  const cards = V4_YACHT_AREAS.cards.map((c) => ({
    title: c.title,
    text: c.text,
    image: c.image,
  }));

  return (
    <V4PinnedRail
      id="v4-areas"
      label={V4_YACHT_AREAS.title}
      cards={cards}
      variant="spaces"
    />
  );
}

export function V4Custom() {
  const { open } = useContactForm();
  return (
    <section id="v4-custom" className="v4-custom relative min-h-svh overflow-hidden">
      <div className="v4-custom__visual absolute inset-0">
        <Image
          src={V4_CUSTOM.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        <div className="v4-custom__shade absolute inset-0" />
      </div>
      <div className="relative z-10 flex min-h-svh items-center justify-end section-pad">
        <V4Reveal className="v4-custom__copy">
          <V4Label>CUSTOM PROJECTS</V4Label>
          <h2 className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-tight text-white">
            <TextShimmer tone="light">{V4_CUSTOM.title}</TextShimmer>
          </h2>
          <p className="v4-body-light mt-5 max-w-sm">{V4_CUSTOM.body}</p>
          <V4Button className="mt-8" onClick={open}>
            {V4_CUSTOM.cta}
          </V4Button>
        </V4Reveal>
      </div>
    </section>
  );
}

export function V4Visualization() {
  const { open } = useContactForm();
  return (
    <section id="v4-viz" className="relative h-svh min-h-[520px] overflow-hidden">
      <Image src={V4_VIZ.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-fullscreen-overlay absolute inset-0" />
      <div className="relative z-10 flex h-full items-center justify-center section-pad text-center">
        <V4Reveal className="max-w-2xl px-4">
          <V4DisplayTitle lines={[V4_VIZ.title]} className="text-white" shimmer shimmerTone="light" />
          <p className="v4-chapter-sub mx-auto mt-6 max-w-lg">{V4_VIZ.subtitle}</p>
          <V4Button className="mt-10" onClick={open}>
            {V4_VIZ.cta}
          </V4Button>
        </V4Reveal>
      </div>
    </section>
  );
}

export function V4Collections() {
  const { open } = useContactForm();
  const cards = V4_COLLECTIONS.items.map((c) => ({
    title: c.name,
    text: c.desc,
    image: c.image,
    cta: "Смотреть",
  }));

  return (
    <V4PinnedRail
      id="v4-collections"
      label={V4_COLLECTIONS.title}
      cards={cards}
      variant="gallery"
      onCta={open}
    />
  );
}

export function V4Materials() {
  return (
    <section id="v4-materials" className="v4-panel v4-panel--milk section-pad">
      <div className="container-luxury">
        <V4Reveal className="mb-12 text-center">
          <V4Label>{V4_MATERIALS.title}</V4Label>
        </V4Reveal>
        <div className="v4-materials-grid">
          {V4_MATERIALS.items.map((m, i) => (
            <V4Reveal key={m.name} delay={i * 0.04} className="v4-material-tile group">
              <div className="v4-material-tile__img relative overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                />
              </div>
              <p className="v4-mono mt-4 text-[#1E1E1E]">{m.name}</p>
              <p className="mt-1 font-sans text-sm text-[#1E1E1E]/65">{m.text}</p>
            </V4Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function V4Nda() {
  const { open } = useContactForm();
  return (
    <section id="v4-nda" className="relative h-svh min-h-[520px] overflow-hidden">
      <Image src={V4_NDA.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-nda-overlay absolute inset-0" />
      <div className="relative z-10 flex h-full items-center justify-center section-pad text-center">
        <V4Reveal className="max-w-2xl px-4">
          <V4DisplayTitle lines={[V4_NDA.title]} className="text-white" shimmer shimmerTone="light" />
          <p className="v4-chapter-sub mx-auto mt-6 max-w-md">{V4_NDA.body}</p>
          <V4Button className="mt-10" onClick={open}>
            {V4_NDA.cta}
          </V4Button>
        </V4Reveal>
      </div>
    </section>
  );
}

export function V4Why() {
  return (
    <section id="v4-why" className="v4-panel v4-panel--dark section-pad">
      <div className="container-luxury max-w-3xl">
        <V4Reveal>
          <V4Label>{V4_WHY.title}</V4Label>
        </V4Reveal>
        <V4Reveal>
          <ol className="v4-why-list mt-20">
            {V4_WHY.items.map((item, i) => (
              <li key={item} className="v4-why-item">
                <span className="v4-why-item__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="v4-why-item__title">{item}</span>
              </li>
            ))}
          </ol>
        </V4Reveal>
      </div>
    </section>
  );
}

export function V4Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="v4-faq" className="v4-panel v4-panel--milk section-pad">
      <div className="container-luxury max-w-3xl">
        <V4Reveal>
          <V4Label>FAQ</V4Label>
        </V4Reveal>
        <ul className="v4-faq-list mt-12">
          {V4_FAQ.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={item.q} className="v4-faq-item">
                <button
                  type="button"
                  className="v4-faq-trigger"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="v4-faq-icon" aria-hidden>
                    {isOpen ? "—" : "+"}
                  </span>
                </button>
                {isOpen && <p className="v4-faq-answer">{item.a}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function V4Gallery() {
  const { hero, row3, wide, pair } = V4_GALLERY_LAYOUT;
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="v4-gallery" className="v4-panel v4-panel--dark section-pad">
      <div className="container-luxury v4-gallery-editorial">
        <V4Reveal className="mb-10">
          <V4Label>VISUAL STORIES</V4Label>
        </V4Reveal>
        <button
          type="button"
          className="v4-gallery-block v4-gallery-block--hero group"
          onClick={() => setLightbox(hero)}
        >
          <Image
            src={hero}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </button>
        <div className="v4-gallery-block v4-gallery-block--triple">
          {row3.map((src) => (
            <GalleryTile key={src} src={src} onOpen={setLightbox} />
          ))}
        </div>
        <button
          type="button"
          className="v4-gallery-block v4-gallery-block--wide group"
          onClick={() => setLightbox(wide)}
        >
          <Image
            src={wide}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </button>
        <div className="v4-gallery-block v4-gallery-block--pair">
          {pair.map((src) => (
            <GalleryTile key={src} src={src} onOpen={setLightbox} />
          ))}
        </div>
      </div>
      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal
          onClick={() => setLightbox(null)}
        >
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image src={lightbox} alt="" fill className="object-contain" sizes="90vw" />
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryTile({
  src,
  onOpen,
}: {
  src: string;
  onOpen: (src: string) => void;
}) {
  return (
    <button
      type="button"
      className="v4-gallery-tile group relative overflow-hidden"
      onClick={() => onOpen(src)}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </button>
  );
}

export function V4Contact() {
  const { open } = useContactForm();

  return (
    <section id="v4-contact" className="relative min-h-svh overflow-hidden">
      <Image src={V4_CTA.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-contact-overlay absolute inset-0" />
      <div className="relative z-10 flex min-h-svh items-center section-pad py-20">
        <div className="container-luxury v4-contact-layout">
          <V4Reveal className="v4-contact-intro">
            <V4DisplayTitle lines={[V4_CTA.title]} className="text-white" shimmer shimmerTone="light" />
            <p className="v4-chapter-sub mt-6 max-w-lg">{V4_CTA.subtitle}</p>
            <V4Button className="mt-8" onClick={open}>
              {V4_CTA.cta}
            </V4Button>
            <div className="v4-contact-channels mt-10">
              <a href={CONTACTS.telegram} className="v4-contact-link" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href={CONTACTS.whatsapp} className="v4-contact-link" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href={CONTACTS.phoneHref} className="v4-contact-link">
                {CONTACTS.phone}
              </a>
            </div>
          </V4Reveal>
          <V4Reveal delay={0.1} className="v4-contact-form-wrap">
            <V4InlineLeadForm />
          </V4Reveal>
        </div>
      </div>
    </section>
  );
}

export function V4Footer() {
  return (
    <footer className="v4-panel v4-panel--dark border-t border-white/10 py-14">
      <div className="container-luxury grid grid-cols-1 gap-10 tablet:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-white">VERANDARU</p>
          <p className="v4-header-tag mt-1">Outdoor Living</p>
        </div>
        <nav className="flex flex-col gap-3">
          {V4_FOOTER_NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-white/55 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 tablet:items-end">
          <a href={CONTACTS.telegram} className="v4-footer-link" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <a href={CONTACTS.whatsapp} className="v4-footer-link" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={CONTACTS.phoneHref} className="v4-footer-link">
            {CONTACTS.phone}
          </a>
        </div>
      </div>
      <p className="container-luxury mt-12 border-t border-white/10 pt-8 font-sans text-xs text-white/40">
        © VERANDARU Yacht Edition
      </p>
    </footer>
  );
}
