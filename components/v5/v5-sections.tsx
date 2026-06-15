"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { DeferredImage } from "@/components/shared/deferred-image";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useContactForm } from "@/components/contact-form-provider";
import { Logo } from "@/components/logo";
import {
  ScrollCoverLine,
  V5FullscreenChapter,
  V5FullscreenStatement,
} from "@/components/v5/v5-fullscreen";
import { useV5ScrollCover } from "@/components/v5/use-v5-scroll-cover";
import {
  V5_SCROLL_COVER_EXIT,
  V5_SCROLL_COVER_FADE,
  V5_SCROLL_COVER_OVERLAP,
  V5_SCROLL_COVER_PIN,
  V5_SCROLL_COVER_SPRING,
} from "@/lib/v5-scroll-cover";
import { V5InlineLeadForm } from "@/components/v5/v5-inline-lead";
import { V5PinnedRail, type V5PinCard } from "@/components/v5/v5-pinned-rail";
import { V5YachtTour } from "@/components/v5/v5-yacht-tour";
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
import { V5_PARTNER_BRANDS } from "@/lib/brands";
import { CONTACTS } from "@/lib/constants";
import { useV5MotionEnabled } from "@/hooks/use-v5-motion";
import {
  clipReveal,
  fadeIn,
  scaleIn,
  staggerLuxury,
  v4Stagger,
  viewportOnce,
  viewportOnceDeep,
} from "@/lib/motion";
import {
  V5_COLLECTIONS,
  V5_CTA,
  V5_CUSTOM,
  V5_EXPERIENCE,
  V5_FAQ,
  V5_FAQ_TITLE,
  V5_FOOTER_NAV,
  V5_FOOTER_TAGLINE,
  V5_GALLERY_LAYOUT,
  V5_MATERIALS,
  V5_NDA,
  V5_PHILOSOPHY,
  V5_PRODUCTION,
  V5_STATEMENT,
  V5_VISUAL_CHAPTERS,
  V5_VIZ,
  V5_WHY,
} from "@/lib/v5-content";

function V5PhilosophyScrollBody({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <ScrollCoverLine progress={progress} inStart={0.04} inEnd={0.12}>
        <V5Label className="v5-type-eyebrow text-white">{V5_PHILOSOPHY.label}</V5Label>
      </ScrollCoverLine>
      <ScrollCoverLine progress={progress} inStart={0.1} inEnd={0.22} className="mt-8">
        <p className="v5-type-display-md text-white">
          <TextShimmer tone="light">{V5_PHILOSOPHY.title}</TextShimmer>
        </p>
      </ScrollCoverLine>
      <p className="v4-chapter-sub v5-narrow-text mx-auto mt-8">
        {V5_PHILOSOPHY.subtitle}
      </p>
    </>
  );
}

export function V5Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const scrollCoverOn = useV5ScrollCover();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, V5_SCROLL_COVER_SPRING);
  const motionActive = scrollCoverOn && !reduced;
  const motionProgress = motionActive ? smoothProgress : scrollYProgress;

  const imageScale = useTransform(motionProgress, [0, 1], [1, 1.05]);
  const imageY = useTransform(motionProgress, [0, 1], [0, -28]);
  const dimOverlay = useTransform(motionProgress, [0.48, 0.88], [0, 0.4]);
  const backdropOpacity = useTransform(motionProgress, [0.55, 0.88], [0.55, 0.2]);

  return (
    <section
      ref={ref}
      id="v5-statement"
      className={cn(
        "v5-philosophy-pin relative min-h-svh bg-[#020B1F]",
        V5_SCROLL_COVER_OVERLAP,
        V5_SCROLL_COVER_PIN,
      )}
    >
      <div className="sticky top-0 h-svh min-h-[520px] overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={motionActive ? { scale: imageScale, y: imageY } : undefined}
        >
          <DeferredImage
            src={V5_PHILOSOPHY.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="v4-fullscreen-overlay absolute inset-0 z-[1]" />
        {motionActive ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] bg-[#020B1F]"
            style={{ opacity: dimOverlay }}
            aria-hidden
          />
        ) : null}
        <div className="relative z-10 flex min-h-svh items-center section-pad text-center">
          {motionActive ? (
            <motion.div
              className="v5-text-backdrop-blur pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: backdropOpacity }}
              aria-hidden
            />
          ) : (
            <div
              className="v5-text-backdrop-blur pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
              aria-hidden
            />
          )}
          <div className="container-luxury relative z-[1] mx-auto max-w-3xl">
            {motionActive ? (
              <V5PhilosophyScrollBody progress={motionProgress} />
            ) : (
              <>
                <V5Reveal>
                  <V5Label className="v5-type-eyebrow text-white">
                    {V5_PHILOSOPHY.label}
                  </V5Label>
                  <p className="v5-type-display-md mt-8 text-white">
                    <TextShimmer tone="light">{V5_PHILOSOPHY.title}</TextShimmer>
                  </p>
                </V5Reveal>
                <p className="v4-chapter-sub v5-narrow-text mx-auto mt-8">
                  {V5_PHILOSOPHY.subtitle}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function V5StatementVisual() {
  return (
    <V5FullscreenStatement
      id="v5-statement-visual"
      image={V5_STATEMENT.image}
      label={V5_STATEMENT.label}
      titleLines={V5_STATEMENT.titleLines}
      subtitle={V5_STATEMENT.subtitle}
      textBackdrop
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
          overlap
          runway={index < V5_VISUAL_CHAPTERS.length - 1}
          textBackdrop={"textBackdrop" in ch && ch.textBackdrop === true}
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
      onCta={() => open()}
      ctaLabel={V5_PRODUCTION.cta}
    />
  );
}

export function V5YachtTourSection() {
  return <V5YachtTour />;
}

export function V5Custom() {
  const { open } = useContactForm();
  const openCatalog = () => open({ intent: "catalog" });
  return (
    <section id="v5-custom" className="v4-custom relative min-h-svh overflow-hidden">
      <div className="v4-custom__visual absolute inset-0">
        <DeferredImage
          src={V5_CUSTOM.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
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
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <V5Button onClick={open}>{V5_CUSTOM.cta}</V5Button>
              <V5Button onClick={openCatalog}>{V5_CUSTOM.catalogCta}</V5Button>
            </div>
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
      <DeferredImage src={V5_VIZ.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-fullscreen-overlay absolute inset-0" />
      <div className="relative z-10 flex h-full items-center justify-center section-pad text-center">
        <div
          className="v5-text-backdrop-blur pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        />
        <V5Reveal className="relative z-[1] w-full">
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
      onCta={(card) =>
        open({
          intent: "catalog",
          catalogCollection: card?.title,
        })
      }
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
          <p className="v5-type-body mx-auto mt-4 max-w-lg text-[#1E1E1E]">
            {V5_MATERIALS.subtitle}
          </p>
        </V5Reveal>
        <div className="v4-materials-grid">
          {V5_MATERIALS.items.map((m, i) => (
            <V5Reveal key={m.name} delay={i * 0.04} className="v4-material-tile group text-center">
              <div className="v4-material-tile__img relative overflow-hidden">
                <DeferredImage
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                  skeletonTone="light"
                />
              </div>
              <p className="v5-type-eyebrow mt-4 text-[#1E1E1E]">{m.name}</p>
              <p className="v5-type-body mt-1 text-[#1E1E1E]">{m.text}</p>
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
      <DeferredImage src={V5_NDA.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-nda-overlay absolute inset-0 z-[1]" />
      <div className="relative z-10 flex h-full items-center justify-center section-pad text-center">
        <div className="w-full">
          <V5FullscreenText innerClassName="flex flex-col items-center">
            <V5Label className="v5-type-eyebrow text-white">{V5_NDA.label}</V5Label>
            <V5DisplayTitle lines={[V5_NDA.title]} className="mt-4 text-white" />
            <p className="v4-chapter-sub v5-narrow-text mt-6">{V5_NDA.body}</p>
            <V5Button className="mt-10" onClick={open}>
              {V5_NDA.cta}
            </V5Button>
          </V5FullscreenText>
        </div>
      </div>
    </section>
  );
}

const V5_EXPERIENCE_MARQUEE = [
  ...V5_PARTNER_BRANDS,
  ...V5_PARTNER_BRANDS,
] as const;

function V5ExperienceBrandTile({
  brand,
}: {
  brand: (typeof V5_PARTNER_BRANDS)[number];
}) {
  return (
    <div
      className="v5-experience-brand brand-logo-tile"
      title={brand.name}
    >
      <Image
        src={brand.logo}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        className="brand-logo-tile__img"
      />
    </div>
  );
}

export function V5Experience() {
  const motionOn = useV5MotionEnabled();
  const marquee = (
    <div className="v5-experience-marquee flex w-max animate-marquee-slow items-stretch gap-4 px-4 tablet:gap-5 tablet:px-8">
      {V5_EXPERIENCE_MARQUEE.map((brand, i) => (
        <V5ExperienceBrandTile key={`${brand.name}-${i}`} brand={brand} />
      ))}
    </div>
  );

  return (
    <section
      id="v5-experience"
      className="v5-experience v4-panel--dark flex flex-col justify-center overflow-hidden section-pad"
    >
      <div className="container-luxury text-center">
        <V5Reveal>
          <V5Label className="v5-type-eyebrow text-white">
            {V5_EXPERIENCE.label}
          </V5Label>
          <V5SectionTitle className="mt-2 text-white">
            {V5_EXPERIENCE.title}
          </V5SectionTitle>
          <p className="v5-type-body mx-auto mt-3 max-w-2xl text-white/65">
            {V5_EXPERIENCE.body}
          </p>
        </V5Reveal>
      </div>

      {motionOn ? (
        <motion.div
          className="marquee-mask relative mt-4 shrink-0 tablet:mt-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          aria-label="Логотипы клиентов"
        >
          {marquee}
        </motion.div>
      ) : (
        <div
          className="marquee-mask relative mt-4 shrink-0 tablet:mt-5"
          aria-label="Логотипы клиентов"
        >
          {marquee}
        </div>
      )}
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

const GALLERY_IMAGE_QUALITY = 82;
const GALLERY_LAZY_MARGIN = "320px 0px";

export function V5Gallery() {
  const { hero, row3, wide, pair, pair2 } = V5_GALLERY_LAYOUT;
  const [lightbox, setLightbox] = useState<string | null>(null);
  const motionOn = useV5MotionEnabled();

  const galleryBlocks = (
    <>
      <V5GalleryBlock variants={scaleIn}>
        <button
          type="button"
          className="v4-gallery-block v4-gallery-block--hero group"
          onClick={() => setLightbox(hero)}
        >
          <DeferredImage
            src={hero}
            alt=""
            fill
            quality={GALLERY_IMAGE_QUALITY}
            sizes="(max-width: 768px) 100vw, 1280px"
            rootMargin={GALLERY_LAZY_MARGIN}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </button>
      </V5GalleryBlock>
      <V5GalleryBlock className="v4-gallery-block v4-gallery-block--triple" variants={v4Stagger}>
        {row3.map((src) => (
          <V5GalleryBlock key={src} className="min-h-0 w-full" variants={clipReveal}>
            <GalleryTile
              src={src}
              sizes="(max-width: 768px) 100vw, 33vw"
              onOpen={setLightbox}
            />
          </V5GalleryBlock>
        ))}
      </V5GalleryBlock>
      <V5GalleryBlock variants={scaleIn}>
        <button
          type="button"
          className="v4-gallery-block v4-gallery-block--wide group"
          onClick={() => setLightbox(wide)}
        >
          <DeferredImage
            src={wide}
            alt=""
            fill
            quality={GALLERY_IMAGE_QUALITY}
            sizes="(max-width: 768px) 100vw, 1280px"
            rootMargin={GALLERY_LAZY_MARGIN}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </button>
      </V5GalleryBlock>
      <V5GalleryBlock className="v4-gallery-block v4-gallery-block--pair" variants={v4Stagger}>
        {pair.map((src) => (
          <V5GalleryBlock key={src} className="min-h-0 w-full" variants={clipReveal}>
            <GalleryTile
              src={src}
              sizes="(max-width: 768px) 100vw, 50vw"
              onOpen={setLightbox}
            />
          </V5GalleryBlock>
        ))}
      </V5GalleryBlock>
      <V5GalleryBlock className="v4-gallery-block v4-gallery-block--pair" variants={v4Stagger}>
        {pair2.map((src) => (
          <V5GalleryBlock key={src} className="min-h-0 w-full" variants={clipReveal}>
            <GalleryTile
              src={src}
              sizes="(max-width: 768px) 100vw, 50vw"
              onOpen={setLightbox}
            />
          </V5GalleryBlock>
        ))}
      </V5GalleryBlock>
    </>
  );

  return (
    <section id="v5-gallery" className="v4-panel v4-panel--dark section-pad">
      <div className="container-luxury v4-gallery-editorial">
        <V5Reveal className="mb-5">
          <V5SectionTitle className="text-center">Visual Stories</V5SectionTitle>
        </V5Reveal>
        {motionOn ? (
          <motion.div
            className="v5-gallery-flow"
            variants={staggerLuxury}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceDeep}
          >
            {galleryBlocks}
          </motion.div>
        ) : (
          <div className="v5-gallery-flow">{galleryBlocks}</div>
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
            <Image
              src={lightbox}
              alt=""
              fill
              quality={GALLERY_IMAGE_QUALITY}
              className="object-contain"
              sizes="90vw"
            />
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
  const motionOn = useV5MotionEnabled();

  if (!motionOn) {
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
  sizes,
  onOpen,
}: {
  src: string;
  sizes: string;
  onOpen: (src: string) => void;
}) {
  return (
    <button
      type="button"
      className="v4-gallery-tile group relative overflow-hidden"
      onClick={() => onOpen(src)}
    >
      <DeferredImage
        src={src}
        alt=""
        fill
        quality={GALLERY_IMAGE_QUALITY}
        sizes={sizes}
        rootMargin={GALLERY_LAZY_MARGIN}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </button>
  );
}

export function V5Contact() {
  return (
    <section id="v5-contact" className="relative min-h-svh overflow-hidden">
      <DeferredImage src={V5_CTA.image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="v4-contact-overlay absolute inset-0" />
      <div className="relative z-10 flex min-h-svh items-center justify-center section-pad py-20 text-center">
        <div className="container-luxury v5-contact-stack w-full">
          <V5Reveal className="w-full">
            <V5FullscreenText innerClassName="flex flex-col items-center">
              <V5Label className="v5-type-eyebrow text-white">{V5_CTA.label}</V5Label>
              <V5DisplayTitle
                lines={[V5_CTA.title]}
                className="mt-4 text-white"
                shimmer
                shimmerTone="light"
              />
              <p className="v4-chapter-sub v5-narrow-text mt-6">{V5_CTA.subtitle}</p>
            </V5FullscreenText>

            <div className="v5-contact-form relative mx-auto mt-10 w-[calc(100%-50px)] max-w-[470px]">
              <div
                className="v5-text-backdrop-blur pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              />
              <div className="relative z-[1]">
                <V5InlineLeadForm />
              </div>
            </div>

            <div className="mt-10">
              <p className="v5-contact-channels-label v5-type-eyebrow text-white">
                {V5_CTA.channelsLabel}
              </p>
              <div className="v4-contact-channels v5-contact-channels mt-4">
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
            </div>
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
        <div className="flex flex-col items-center tablet:items-start">
          <Logo light className="!h-5 desktop:!h-6" />
          <p className="v4-header-tag v5-type-caption mt-1">{V5_FOOTER_TAGLINE}</p>
        </div>
        <nav className="flex flex-col items-center gap-3 tablet:items-start">
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
        <div className="flex flex-col items-center gap-3 tablet:items-end">
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
      <p className="v5-footer-copy container-luxury mt-12 border-t border-white/10 pt-8 text-center text-white/40 tablet:text-left">
        © VERANDARU Yacht Edition
      </p>
    </footer>
  );
}
