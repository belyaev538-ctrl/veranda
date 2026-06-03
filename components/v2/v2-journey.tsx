"use client";

import { useContactForm } from "@/components/contact-form-provider";
import { V2_JOURNEY } from "@/lib/v2-content";

export function V2Journey() {
  const { open } = useContactForm();

  return (
    <section className="v2-section-cream section-pad">
      <div className="container-luxury">
        <p className="v2-eyebrow-dark">Onboard</p>
        <h2 className="v2-heading-dark mt-4 max-w-xl">
          Navigate
          <br />
          Your Journey
        </h2>

        <ul className="mt-14 divide-y divide-[#0d1322]/10 border-t border-[#0d1322]/10">
          {V2_JOURNEY.map((item) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={open}
                className="v2-journey-row group w-full text-left"
              >
                <span className="v2-journey-title">{item.title}</span>
                <span className="v2-journey-desc">{item.desc}</span>
                <span className="v2-journey-arrow" aria-hidden>
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
