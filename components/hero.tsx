"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { useScrollMotion } from "@/components/motion/scroll-provider";
import { cn } from "@/lib/cn";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { cinematic, isMobile, reducedMotion } = useScrollMotion();
  const motionOn = cinematic && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroProgress = useSpring(scrollYProgress, {
    stiffness: reducedMotion || isMobile ? 400 : 72,
    damping: reducedMotion || isMobile ? 40 : 28,
  });

  const imageY = useTransform(heroProgress, [0, 1], motionOn ? [0, 56] : [0, 0]);
  const contentY = useTransform(heroProgress, [0, 1], motionOn ? [0, 44] : [0, 0]);
  const contentOpacity = useTransform(heroProgress, [0, 0.88], [1, 0]);
  const scrollHintOpacity = useTransform(heroProgress, [0, 0.18], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="hero-cinematic relative h-[100dvh] min-h-[520px] max-h-[900px] overflow-hidden tablet:min-h-[640px] tablet:max-h-none"
    >
      {/* Layer 1 — background */}
      <motion.div
        className="hero-image-boost absolute inset-0"
        style={motionOn ? { y: imageY } : undefined}
        animate={motionOn ? { scale: [1, 1.045] } : undefined}
        transition={
          motionOn
            ? { duration: 24, ease: "linear", repeat: Infinity, repeatType: "mirror" }
            : undefined
        }
      >
        <PlaceholderImage
          photo={1}
          rounded={false}
          priority
          sizes="100vw"
          hoverMode="none"
          quality={88}
          className="h-full min-h-[100svh]"
        />
      </motion.div>

      {/* Layer 2 — warm evening haze */}
      {motionOn && (
        <motion.div
          className="hero-warm-haze pointer-events-none absolute inset-0 z-[1]"
          animate={{ x: [-20, 20], y: [-8, 8] }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      )}

      {/* Layer 3 — water reflection */}
      {motionOn && (
        <div className="hero-light-sweep pointer-events-none absolute inset-0 z-[2]" />
      )}

      {/* Layer 4 — cinematic overlay (lighter) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[3]",
          isMobile ? "hero-overlay-gradient-mobile" : "hero-overlay-gradient",
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

      {/* Layer 5 — grain */}
      {motionOn && (
        <div
          className="film-grain animate-grain-shift pointer-events-none absolute inset-0 z-[4] opacity-[0.035]"
          aria-hidden
        />
      )}

      {/* Layer 6 — typography */}
      <motion.div
        className="relative z-10 flex h-full min-h-0 flex-col"
        style={motionOn ? { y: contentY, opacity: contentOpacity } : undefined}
      >
        <div
          className="hero-header-spacer shrink-0 desktop:hidden"
          aria-hidden
        />
        <div className="container-luxury hero-content flex min-h-0 flex-1 flex-col justify-end pb-10 pt-2 tablet:pb-14 tablet:pt-24 desktop:pb-20">
          <ClipReveal as="p" priority delay={0.2} duration={1.15}>
            <p className="mb-2 font-sans text-[10px] font-medium tracking-[0.22em] text-white/50">
              VERANDARU · мебель для яхт
            </p>
            <p className="mb-6 font-sans text-xs font-medium tracking-[0.16em] text-white/65">
              Собственное производство · кастом под проект яхты
            </p>
          </ClipReveal>

          <h1 className="hero-title">
            <ClipReveal as="span" className="block" priority delay={0.38} duration={1.35}>
              Палуба,
            </ClipReveal>
            <ClipReveal as="span" className="block" priority delay={0.54} duration={1.35}>
              на которой хочется
            </ClipReveal>
            <ClipReveal as="span" className="hero-accent block" priority delay={0.7} duration={1.35}>
              остаться дольше
            </ClipReveal>
          </h1>

          <ClipReveal as="p" priority delay={0.88} duration={1.2} className="mt-8 max-w-xl">
            <p className="font-sans text-base leading-relaxed text-white/75 tablet:text-lg">
              Создаём премиальную мебель и кастомные outdoor-решения для палуб,
              flybridge, кокпитов и зон отдыха на яхтах — с учётом солнца, влаги,
              соли, габаритов и сценариев эксплуатации.
            </p>
          </ClipReveal>

          <ClipReveal
            as="div"
            priority
            delay={1.05}
            duration={1.2}
            className="mt-10 flex flex-col gap-3 tablet:flex-row tablet:items-center"
          >
            <Link href="#contacts" className="btn-hero-primary">
              Обсудить проект яхты
            </Link>
            <Link href="#collections" className="btn-hero-secondary">
              Смотреть коллекции
            </Link>
          </ClipReveal>
        </div>
      </motion.div>

      {motionOn && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 desktop:flex"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="font-sans text-[10px] tracking-[0.2em] text-white/45">
            Scroll
          </span>
          <motion.span
            className="block h-12 w-px origin-top bg-white/35"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  );
}
