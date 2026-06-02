"use client";

import { motion } from "framer-motion";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SectionAtmosphere } from "@/components/motion/section-atmosphere";
import { WORKFLOW_STEPS } from "@/lib/constants";
import { clipReveal, staggerLuxury, viewportOnceDeep } from "@/lib/motion";

export function Workflow() {
  return (
    <SectionAtmosphere
      id="process"
      tone="white"
      className="section-pad border-y border-ink/[0.06] bg-white"
    >
      <div className="container-luxury">
        <p className="font-sans text-xs font-medium tracking-[0.2em] text-green">
          Процесс
        </p>
        <ClipReveal as="h2" className="text-mega mt-4 max-w-3xl" delay={0.08}>
          Как мы работаем
          <br />
          <span className="text-muted">от идеи до сервиса</span>
        </ClipReveal>
        <ClipReveal as="p" className="mt-6 max-w-2xl font-sans text-base text-muted" delay={0.14}>
          Прозрачный маршрут проекта: на каждом этапе вы видите результат и
          согласуете решения до запуска в производство.
        </ClipReveal>

        <motion.ol
          className="workflow-track mt-12 desktop:mt-16"
          variants={staggerLuxury}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceDeep}
        >
          {WORKFLOW_STEPS.map((step, index) => {
            const num = String(index + 1).padStart(2, "0");
            const isLast = index === WORKFLOW_STEPS.length - 1;

            return (
              <motion.li
                key={step.title}
                variants={clipReveal}
                className="workflow-step"
              >
                <div className="workflow-step-head">
                  <span className="workflow-step-marker" aria-hidden>
                    {num}
                  </span>
                  {!isLast && <span className="workflow-connector" aria-hidden />}
                </div>
                <div className="workflow-step-body">
                  <h3 className="font-display text-base font-semibold text-ink tablet:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </SectionAtmosphere>
  );
}
