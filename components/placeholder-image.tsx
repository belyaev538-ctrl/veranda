"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { getImageAlt, getImageSrc } from "@/lib/images";
import { luxuryEase } from "@/lib/motion";

type PlaceholderImageProps = {
  photo: number;
  className?: string;
  hover?: boolean;
  hoverMode?: "scale" | "luxury" | "none";
  rounded?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
};

export function PlaceholderImage({
  photo,
  className,
  hover = false,
  hoverMode,
  rounded = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
}: PlaceholderImageProps) {
  const src = getImageSrc(photo);
  const mode = hoverMode ?? (hover ? "scale" : "none");

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#8A8278]",
        rounded && "rounded-luxury",
        mode === "luxury" && "group",
        className,
      )}
    >
      <motion.div
        className="relative h-full min-h-full w-full"
        whileHover={
          mode === "scale"
            ? { scale: 1.04, transition: { duration: 0.8, ease: luxuryEase } }
            : undefined
        }
      >
        <Image
          src={src}
          alt={getImageAlt(photo)}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className={cn(
            "object-cover transition-[filter,transform] duration-[1.2s] ease-out",
            mode === "luxury" &&
              "group-hover:brightness-[0.92] group-hover:contrast-[1.05]",
          )}
        />
        {mode === "luxury" && (
          <div className="soft-reflection pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        )}
      </motion.div>
    </div>
  );
}
