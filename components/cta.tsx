"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { useScrollMotion } from "@/components/motion/scroll-provider";

export function Cta() {
  const [submitted, setSubmitted] = useState(false);
  const { cinematic } = useScrollMotion();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SectionAtmosphere
      id="contacts"
      tone="cream"
      className="cta-cinematic section-pad relative pb-28 desktop:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,190,73,0.06)_0%,transparent_50%)]" />

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 gap-10 desktop:grid-cols-12 desktop:gap-8">
          <div className="desktop:col-span-5 desktop:pt-4">
            <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
              08 — Контакт
            </p>
            <ClipReveal as="h2" className="text-mega mt-5" delay={0.12}>
              Покажем, как может выглядеть зона отдыха на вашей яхте
            </ClipReveal>
            <ClipReveal as="p" className="text-mega-muted mt-8 max-w-md" delay={0.28}>
              <p>
                Отправьте фото палубы, план или размеры зоны — подготовим
                концепцию и предложим outdoor-решения под ваш сценарий.
              </p>
            </ClipReveal>
          </div>

          <ClipReveal
            as="div"
            delay={0.2}
            duration={1.25}
            className="relative min-h-[360px] overflow-hidden rounded-luxury desktop:col-span-4 desktop:min-h-[520px]"
          >
            <ParallaxMedia
              photo={7}
              className="absolute inset-0 h-full"
              speed={cinematic ? 0.04 : 0}
              scaleRange={[1, 1.03]}
              breathe={cinematic}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy/20 to-transparent" />
            {cinematic && (
              <div className="hero-light-sweep pointer-events-none absolute inset-0 opacity-40" />
            )}
          </ClipReveal>

          <ClipReveal
            as="div"
            delay={0.35}
            duration={1.2}
            className="cta-form-card desktop:col-span-3"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Имя"
                className="input-light"
              />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Телефон"
                className="input-light"
              />
              <input
                id="yacht"
                name="yacht"
                type="text"
                placeholder="Модель яхты / зона на борту"
                className="input-light"
              />
              <textarea
                id="comment"
                name="comment"
                rows={2}
                placeholder="Комментарий"
                className="input-light resize-none"
              />
              <button type="submit" className="btn-primary w-full">
                {submitted ? "Заявка отправлена" : "Обсудить проект яхты"}
              </button>
            </form>
          </ClipReveal>
        </div>
      </div>
    </SectionAtmosphere>
  );
}
