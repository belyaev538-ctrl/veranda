"use client";

import { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ImageSkeleton,
  type ImageSkeletonTone,
} from "@/components/shared/image-skeleton";
import { LoadingImage } from "@/components/shared/loading-image";
import { cn } from "@/lib/cn";

type DeferredImageProps = Omit<ImageProps, "priority"> & {
  priority?: boolean;
  /** IntersectionObserver rootMargin — preload shortly before entering viewport */
  rootMargin?: string;
  skeletonTone?: ImageSkeletonTone;
  wrapperClassName?: string;
  /** Opacity фото после загрузки */
  visibleOpacity?: number;
};

export function DeferredImage({
  priority = false,
  rootMargin = "480px 0px",
  skeletonTone = "dark",
  wrapperClassName,
  visibleOpacity,
  className,
  ...props
}: DeferredImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(priority);

  useEffect(() => {
    if (priority || visible) return;

    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      const rect = el.getBoundingClientRect();
      const margin = 480;
      if (rect.bottom >= -margin && rect.top <= window.innerHeight + margin) {
        setVisible(true);
      }
    };

    reveal();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, [priority, visible, rootMargin]);

  return (
    <div ref={ref} className={cn("absolute inset-0", wrapperClassName)}>
      {visible ? (
        <LoadingImage
          {...props}
          priority={priority}
          className={className}
          skeletonTone={skeletonTone}
          visibleOpacity={visibleOpacity}
        />
      ) : (
        <ImageSkeleton tone={skeletonTone} />
      )}
    </div>
  );
}
