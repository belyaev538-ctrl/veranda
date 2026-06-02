"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { luxuryEase } from "@/lib/motion";

type FounderVideoModalProps = {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  poster?: string;
};

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

export function FounderVideoModal({
  open,
  onClose,
  videoUrl,
  poster,
}: FounderVideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#051227]/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: luxuryEase }}
          role="dialog"
          aria-modal="true"
          aria-label="Видео о компании"
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            className="founder-video-panel relative z-[1] w-full max-w-4xl overflow-hidden rounded-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть видео"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              <CloseIcon />
            </button>
            <video
              className="aspect-video w-full bg-black object-cover"
              controls
              playsInline
              poster={poster}
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
