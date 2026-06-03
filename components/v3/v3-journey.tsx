"use client";

import { useContactForm } from "@/components/contact-form-provider";
import { V3_JOURNEY } from "@/lib/v3-content";

export function V3Journey() {
  const { open } = useContactForm();

  return (
    <section className="v3-section-cream section-pad">
      <div className="container-luxury">
        <p className="v3-eyebrow-dark">Onboard</p>
        <h2 className="v3-heading-dark mt-4 max-w-xl">
          Navigate
          <br />
          Your Journey
        </h2>

        <ul className="mt-14 divide-y divide-[#0d1322]/10 border-t border-[#0d1322]/10">
          {V3_JOURNEY.map((item) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={open}
                className="v3-journey-row group w-full text-left"
              >
                <span className="v3-journey-title">{item.title}</span>
                <span className="v3-journey-desc">{item.desc}</span>
                <span className="v3-journey-arrow" aria-hidden>
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
