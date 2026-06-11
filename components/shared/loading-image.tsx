"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ImageSkeleton,
  type ImageSkeletonTone,
} from "@/components/shared/image-skeleton";
import { luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

type LoadingImageProps = ImageProps & {
  skeletonTone?: ImageSkeletonTone;
  wrapperClassName?: string;
  /** Opacity после загрузки (по умолчанию 1) */
  visibleOpacity?: number;
};

export function LoadingImage({
  className,
  skeletonTone = "dark",
  wrapperClassName,
  visibleOpacity = 1,
  onLoad,
  onLoadingComplete,
  fill,
  src,
  ...props
}: LoadingImageProps) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const markLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalHeight > 0) {
      setLoaded(true);
    }
  }, [src]);

  const isFill = fill !== false;

  return (
    <div
      className={cn(
        "overflow-hidden",
        isFill ? "absolute inset-0" : "relative h-full w-full",
        wrapperClassName,
      )}
    >
      {!loaded && <ImageSkeleton tone={skeletonTone} />}

      <motion.div
        className={cn(isFill && "relative h-full w-full")}
        initial={false}
        animate={{ opacity: loaded ? visibleOpacity : 0 }}
        transition={
          reduced ? { duration: 0 } : { duration: 0.7, ease: luxuryEase }
        }
      >
        <Image
          {...props}
          src={src}
          ref={imgRef}
          fill={fill}
          className={className}
          onLoad={(event) => {
            markLoaded();
            onLoad?.(event);
          }}
          onLoadingComplete={(img) => {
            markLoaded();
            onLoadingComplete?.(img);
          }}
        />
      </motion.div>
    </div>
  );
}
