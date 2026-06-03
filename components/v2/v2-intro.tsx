"use client";

import { motion } from "framer-motion";
import { luxuryEase, viewportOnceDeep } from "@/lib/motion";

export function V2Intro() {
  return (
    <section id="v2-intro" className="v2-section-cream relative overflow-hidden section-pad">
      <div className="v2-circles" aria-hidden>
        <span className="v2-circle v2-circle--1" />
        <span className="v2-circle v2-circle--2" />
        <span className="v2-circle v2-circle--3" />
      </div>

      <motion.div
        className="container-luxury relative max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnceDeep}
        transition={{ duration: 1.1, ease: luxuryEase }}
      >
        <p className="v2-intro-lead">
          Мы проектируем, производим и монтируем{" "}
          <em>полностью индивидуальную</em> outdoor-мебель для самых взыскательных
          владельцев яхт. Чистая кастомизация с 2015 года — от концепции до зоны
          отдыха на борту.
        </p>
      </motion.div>
    </section>
  );
}
