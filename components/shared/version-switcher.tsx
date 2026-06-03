import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SiteVariant } from "@/lib/site-variant";
import { SITE_VARIANTS } from "@/lib/site-variant";

const ORDER: SiteVariant[] = ["1", "2", "3", "4", "5"];

type VersionSwitcherProps = {
  current: SiteVariant;
  className?: string;
  /** @deprecated Используйте VersionSwitcherDock */
  tone?: "light" | "dark";
};

/** Закреплён справа по центру экрана (техн. переключатель) */
export function VersionSwitcherDock({ current }: { current: SiteVariant }) {
  return (
    <div
      className="version-switcher-dock"
      aria-label="Переключение версий лендинга"
    >
      <span className="version-switcher-dock__label">Версии</span>
      <nav className="version-switcher-dock__nav">
        {ORDER.map((v) => {
          const { path, label } = SITE_VARIANTS[v];
          const isCurrent = v === current;
          return (
            <Link
              key={v}
              href={path}
              className={cn(
                "version-switcher-dock__link",
                isCurrent && "version-switcher-dock__link--active",
              )}
              aria-current={isCurrent ? "page" : undefined}
              title={label}
            >
              {label.replace("Вариант ", "V")}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/** Inline в подвале — оставлен для совместимости, лучше VersionSwitcherDock */
export function VersionSwitcher({
  current,
  className,
  tone = "dark",
}: VersionSwitcherProps) {
  return (
    <nav
      className={cn(
        "flex flex-wrap items-center gap-3 font-sans text-[10px] uppercase tracking-[0.18em]",
        tone === "dark" ? "text-white/35" : "text-ink/40",
        className,
      )}
      aria-label="Переключение версий лендинга (техн.)"
    >
      <span className={tone === "dark" ? "text-white/25" : "text-ink/30"}>
        Версии
      </span>
      {ORDER.map((v) => {
        const { path, label } = SITE_VARIANTS[v];
        const isCurrent = v === current;
        return (
          <Link
            key={v}
            href={path}
            className={cn(
              "transition-colors",
              isCurrent
                ? tone === "dark"
                  ? "text-white/80"
                  : "text-ink"
                : tone === "dark"
                  ? "hover:text-white/70"
                  : "hover:text-ink/70",
            )}
            aria-current={isCurrent ? "page" : undefined}
          >
            {label.replace("Вариант ", "V")}
          </Link>
        );
      })}
    </nav>
  );
}
