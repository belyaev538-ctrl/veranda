import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** Белый логотип поверх тёмного hero */
  light?: boolean;
};

export function Logo({ className, light = false }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="VERANDARU"
      width={156}
      height={27}
      priority
      className={cn(
        "h-6 w-auto desktop:h-7",
        light && "brightness-0 invert",
        className,
      )}
    />
  );
}
