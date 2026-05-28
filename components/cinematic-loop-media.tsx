"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { getImageAlt, getImageSrc } from "@/lib/images";
import { useScrollMotion } from "@/components/motion/scroll-provider";

type CinematicLoopMediaProps = {
  photo: number;
  videoSrc?: string;
  className?: string;
  /** Macro crop — larger perceived scale */
  macro?: boolean;
};

/**
 * Desktop: muted loop when /public/videos/*.mp4 exists.
 * Mobile / missing file: poster image + slow breathe (no extra GPU layers).
 */
export function CinematicLoopMedia({
  photo,
  videoSrc,
  className,
  macro = true,
}: CinematicLoopMediaProps) {
  const { cinematic } = useScrollMotion();
  const [useVideo, setUseVideo] = useState(Boolean(videoSrc && cinematic));
  const poster = getImageSrc(photo);
  const showVideo = useVideo && videoSrc && cinematic;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[#0A0E14]",
        macro && "production-macro",
        className,
      )}
    >
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setUseVideo(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className={cn(
            "absolute inset-0",
            cinematic && "animate-breathe",
          )}
        >
          <Image
            src={poster}
            alt={getImageAlt(photo)}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={82}
            className="object-cover"
          />
        </div>
      )}

      <div className="production-directional-light pointer-events-none absolute inset-0" />
      <div className="production-texture-reflection pointer-events-none absolute inset-0" />
    </div>
  );
}
