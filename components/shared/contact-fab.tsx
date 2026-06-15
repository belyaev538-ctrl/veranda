"use client";

import { useEffect, useState } from "react";
import { ContactChannelLinks } from "@/components/shared/contact-channel-links";
import { useIsMobile } from "@/hooks/use-media";
import { cn } from "@/lib/cn";

function MessageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactFab() {
  const isMobile = useIsMobile(767);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobile, open]);

  return (
    <nav
      className={cn(
        "v5-contact-fab",
        isMobile && open && "v5-contact-fab--expanded",
        isMobile && !open && "v5-contact-fab--collapsed",
      )}
      aria-label="Связаться с нами"
    >
      {isMobile ? (
        <>
          {open && <ContactChannelLinks />}
          <button
            type="button"
            className="v5-contact-fab__btn v5-contact-fab__toggle"
            aria-expanded={open}
            aria-label={open ? "Свернуть контакты" : "Связаться с нами"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MessageIcon />}
          </button>
        </>
      ) : (
        <ContactChannelLinks />
      )}
    </nav>
  );
}
