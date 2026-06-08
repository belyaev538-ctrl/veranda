"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useContactForm } from "@/components/contact-form-provider";
import { Logo } from "@/components/logo";
import {
  V5FullscreenChapter,
  V5FullscreenStatement,
} from "@/components/v5/v5-fullscreen";
import { V5InlineLeadForm } from "@/components/v5/v5-inline-lead";
import { V5PinnedRail, type V5PinCard } from "@/components/v5/v5-pinned-rail";
import { V5YachtTour } from "@/components/v5/v5-yacht-tour";
import { DotField } from "@/components/motion/dot-field";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { V5SectionEnter } from "@/components/v5/v5-section-enter";
import {
  V5Button,
  V5DisplayTitle,
  V5FullscreenText,
  V5Label,
  V5Reveal,
  V5SectionTitle,
} from "@/components/v5/v5-ui";
import { CONTACTS } from "@/lib/constants";
import {
  clipReveal,
  scaleIn,
  staggerLuxury,
  v4Stagger,
  viewportOnceDeep,
} from "@/lib/motion";
import {
  V5_COLLECTIONS,
  V5_CTA,
  V5_CUSTOM,
  V5_FAQ,
  V5_FAQ_TITLE,
  V5_FOOTER_NAV,
  V5_FOOTER_TAGLINE,
  V5_GALLERY_LAYOUT,
  V5_MATERIALS,
  V5_NDA,
  V5_PRODUCTION,
  V5_STATEMENT,
  V5_VISUAL_CHAPTERS,
  V5_VIZ,
  V5_WHY,
} from "@/lib/v5-content";

export function V5Statement() {
  return (
    <V5FullscreenStatement
      id="v5-statement"
      image={V5_STATEMENT.image}
      label={V5_STATEMENT.label}
      titleLines={V5_STATEMENT.titleLines}
      subtitle={V5_STATEMENT.subtitle}
    />
  );
}

export function V5VisualChapters() {
  return (
    <>
      {V5_VISUAL_CHAPTERS.map((ch, index) => (
        <V5FullscreenChapter
          key={ch.id}
          id={ch.id}
          image={ch.image}
          label={ch.label}
          lines={ch.lines}
          subtitle={ch.subtitle}
          stackIndex={index}
          overlap={index === 0}
          runway={index === 0}
        />
      ))}
    </>
  );
}

const V5_PRODUCTION_CARDS: readonly V5PinCard[] = V5_PRODUCTION.steps.map(
  (step) => ({
    num: step.num,
    title: step.title,
    text: step.text,
    image: step.image,
  }),
);

export function V5Production() {
  const { open } = useContactForm();
  return (
    <V5PinnedRail
      id="v5-production"
      headerTitle={V5_PRODUCTION.title}
      headerSubtitle={V5_PRODUCTION.subtitle}
      cards={V5_PRODUCTION_CARDS}
      variant="production"
      onCta={open}
      ctaLabel={V5_PRODUCTION.cta}
    />
  );
}

export function V5YachtTourSection() {
  return <V5YachtTour />;
}

export function V5Custom() {
  const { open } = useContactForm();
  return (
    <section id="v5-custom" className="v4-custom relative min-h-svh overflow-hidden">
      <div className="v4-custom__visual absolute inset-0">
        <Image
          src={V5_CUSTOM.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        <div className="v4-custom__shade absolute inset-0" />
      </div>
      <div className="relative z-10 flex min-h-svh items-center justify-center section-pad text-center">
        <V5Reveal className="w-full">
          <V5FullscreenText innerClassName="flex flex-col items-center text-center">
            <V5Label className="v5-type-eyebrow text-white">CUSTOM PROJECTS</V5Label>
            <h2 className="v5-type-display-md mt-4 font-sans text-white">
              <TextShimmer tone="light">{V5_CUSTOM.title}</TextShimmer>
            </h2>
            <p className="v4-body-light v5-custom-body mt-5">{V5_CUSTOM.body}</p>
            <V5Button className="mt-8" onClick={open}>
              {V5_CUSTOM.cta}
            </V5Button>
          </V5FullscreenText>
        </V5Reveal>
      </div>
    </section>
  );
}

export function V5Visualization() {
  const { open } = useContactForm();
  return (
    <section id="v5-viz" className="relative h-svh min-h-[520px] overflow-hidden">
      <Image src={V5_VIZ.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-fullscreen-overlay absolute inset-0" />
      <div className="relative z-10 flex h-full items-center justify-center section-pad text-center">
        <V5Reveal className="w-full">
          <V5FullscreenText innerClassName="flex flex-col items-center">
            <V5Label className="v5-type-eyebrow text-white">{V5_VIZ.label}</V5Label>
            <V5DisplayTitle
              lines={[V5_VIZ.title]}
              className="mt-4 text-white"
              shimmer
              shimmerTone="light"
            />
            <p className="v4-chapter-sub v5-narrow-text mt-6">{V5_VIZ.subtitle}</p>
            <V5Button className="mt-10" onClick={open}>
              {V5_VIZ.cta}
            </V5Button>
          </V5FullscreenText>
        </V5Reveal>
      </div>
    </section>
  );
}

export function V5Collections() {
  const { open } = useContactForm();
  const cards = V5_COLLECTIONS.items.map((c) => ({
    title: c.name,
    text: c.desc,
    image: c.image,
    cta: "Запросить каталог",
  }));

  return (
    <V5PinnedRail
      id="v5-collections"
      label={V5_COLLECTIONS.title}
      labelSubtitle={V5_COLLECTIONS.subtitle}
      cards={cards}
      variant="gallery"
      onCta={open}
    />
  );
}

export function V5Materials() {
  return (
    <section id="v5-materials" className="v4-panel v4-panel--milk section-pad">
      <div className="container-luxury">
        <V5Reveal className="mb-12 text-center">
          <V5Label className="v5-type-eyebrow text-[#1E1E1E]">
            {V5_MATERIALS.label}
          </V5Label>
          <V5SectionTitle className="mt-4">{V5_MATERIALS.title}</V5SectionTitle>
          <p className="v5-type-body mx-auto mt-4 max-w-lg text-[#1E1E1E]/65">
            {V5_MATERIALS.subtitle}
          </p>
        </V5Reveal>
        <div className="v4-materials-grid">
          {V5_MATERIALS.items.map((m, i) => (
            <V5Reveal key={m.name} delay={i * 0.04} className="v4-material-tile group">
              <div className="v4-material-tile__img relative overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                />
              </div>
              <p className="v5-type-eyebrow mt-4 text-[#1E1E1E]">{m.name}</p>
              <p className="v5-type-body mt-1 text-[#1E1E1E]/65">{m.text}</p>
            </V5Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function V5Nda() {
  const { open } = useContactForm();
  return (
    <section id="v5-nda" className="relative h-svh min-h-[520px] overflow-hidden">
      <Image src={V5_NDA.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-nda-overlay absolute inset-0 z-[1]" />
      <div className="absolute inset-0 z-[2] opacity-[0.88]">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="rgba(0, 144, 255, 0.32)"
          gradientTo="rgba(0, 144, 255, 0.14)"
          glowColor="rgba(0, 144, 255, 0.65)"
        />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center section-pad text-center">
        <V5Reveal className="w-full">
          <V5FullscreenText innerClassName="flex flex-col items-center">
            <V5Label className="v5-type-eyebrow text-white">{V5_NDA.label}</V5Label>
            <V5DisplayTitle
              lines={[V5_NDA.title]}
              className="mt-4 text-white"
              shimmer
              shimmerTone="light"
            />
            <p className="v4-chapter-sub v5-narrow-text mt-6">{V5_NDA.body}</p>
            <V5Button className="mt-10" onClick={open}>
              {V5_NDA.cta}
            </V5Button>
          </V5FullscreenText>
        </V5Reveal>
      </div>
    </section>
  );
}

export function V5Why() {
  return (
    <section id="v5-why" className="v4-panel v4-panel--dark section-pad">
      <div className="container-luxury v5-why-layout">
        <V5Reveal>
          <V5SectionTitle className="text-center">{V5_WHY.title}</V5SectionTitle>
        </V5Reveal>
        <V5Reveal>
          <ol className="v5-why-grid">
            {V5_WHY.items.map((item, i) => (
              <li key={item.title} className="v5-why-tile">
                <span className="v5-why-tile__num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="v5-why-tile__title">{item.title}</p>
                <p className="v5-why-tile__subtitle">
                  {item.subtitle.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </V5Reveal>
      </div>
    </section>
  );
}

export function V5Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="v5-faq" className="v4-panel v4-panel--dark section-pad">
      <div className="container-luxury v5-faq-layout">
        <V5Reveal>
          <V5DisplayTitle
            lines={[V5_FAQ_TITLE]}
            className="text-center text-white"
            shimmer
            shimmerTone="light"
          />
        </V5Reveal>
        <ul className="v4-faq-list">
          {V5_FAQ.map((item, i) => {
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
                    {isOpen ? "−" : "+"}
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

export function V5Gallery() {
  const { hero, row3, wide, pair } = V5_GALLERY_LAYOUT;
  const [lightbox, setLightbox] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const galleryBlocks = (
    <>
      <V5GalleryBlock variants={scaleIn}>
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
      </V5GalleryBlock>
      <V5GalleryBlock className="v4-gallery-block v4-gallery-block--triple" variants={v4Stagger}>
        {row3.map((src) => (
          <V5GalleryBlock key={src} className="min-h-0 w-full" variants={clipReveal}>
            <GalleryTile src={src} onOpen={setLightbox} />
          </V5GalleryBlock>
        ))}
      </V5GalleryBlock>
      <V5GalleryBlock variants={scaleIn}>
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
      </V5GalleryBlock>
      <V5GalleryBlock className="v4-gallery-block v4-gallery-block--pair" variants={v4Stagger}>
        {pair.map((src) => (
          <V5GalleryBlock key={src} className="min-h-0 w-full" variants={clipReveal}>
            <GalleryTile src={src} onOpen={setLightbox} />
          </V5GalleryBlock>
        ))}
      </V5GalleryBlock>
    </>
  );

  return (
    <section id="v5-gallery" className="v4-panel v4-panel--dark section-pad">
      <div className="container-luxury v4-gallery-editorial">
        <V5Reveal className="mb-10">
          <V5SectionTitle className="text-center">VISUAL STORIES</V5SectionTitle>
        </V5Reveal>
        {reduced ? (
          <div className="v5-gallery-flow">{galleryBlocks}</div>
        ) : (
          <motion.div
            className="v5-gallery-flow"
            variants={staggerLuxury}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceDeep}
          >
            {galleryBlocks}
          </motion.div>
        )}
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

function V5GalleryBlock({
  children,
  className,
  variants = clipReveal,
}: {
  children: ReactNode;
  className?: string;
  variants?: typeof clipReveal;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
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

export function V5Contact() {
  const { open } = useContactForm();

  return (
    <section id="v5-contact" className="relative min-h-svh overflow-hidden">
      <Image src={V5_CTA.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-contact-overlay absolute inset-0" />
      <div className="relative z-10 flex min-h-svh items-center section-pad py-20">
        <div className="container-luxury v4-contact-layout">
          <V5Reveal className="v4-contact-intro">
            <V5Label className="v5-type-eyebrow text-white">{V5_CTA.label}</V5Label>
            <V5DisplayTitle
              lines={[V5_CTA.title]}
              className="mt-4 text-white"
              shimmer
              shimmerTone="light"
            />
            <p className="v4-chapter-sub mt-6 max-w-lg">{V5_CTA.subtitle}</p>
            <V5Button className="mt-8" onClick={open}>
              {V5_CTA.cta}
            </V5Button>
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
          </V5Reveal>
          <V5Reveal delay={0.1} className="v4-contact-form-wrap">
            <V5InlineLeadForm />
          </V5Reveal>
        </div>
      </div>
    </section>
  );
}

export function V5Footer() {
  return (
    <footer className="v4-panel v4-panel--dark border-t border-white/10 py-14">
      <div className="container-luxury grid grid-cols-1 gap-10 tablet:grid-cols-3">
        <div>
          <Logo light className="!h-5 desktop:!h-6" />
          <p className="v4-header-tag v5-type-caption mt-1">{V5_FOOTER_TAGLINE}</p>
        </div>
        <nav className="flex flex-col gap-3">
          {V5_FOOTER_NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="v4-footer-link text-white/55 transition-colors hover:text-white"
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
      <p className="v5-footer-copy container-luxury mt-12 border-t border-white/10 pt-8 text-white/40">
        © VERANDARU Yacht Edition
      </p>
    </footer>
  );
}
