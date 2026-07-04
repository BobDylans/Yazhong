"use client";

import { useLocale } from "@/i18n/LocaleProvider";

interface LinkCTAProps {
  href: string;
  labelKey: string;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  hideArrow?: boolean;
  className?: string;
}

export function LinkCTA({ href, labelKey, variant = "outline", size = "md", hideArrow = false, className = "" }: LinkCTAProps) {
  const { t } = useLocale();

  const base =
    "group inline-flex items-center gap-2 sm:gap-3 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] shadow-ambient hover:shadow-ambient-hover";

  const sizes = {
    md: "px-8 py-3.5 text-sm",
    sm: "px-6 py-2.5 text-sm",
  };

  const variants = {
    outline:
      "border border-border text-foreground hover:bg-foreground hover:text-white",
    solid:
      "bg-foreground text-white border border-foreground hover:bg-foreground/90",
  };

  return (
    <a
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {t(labelKey)}
      {!hideArrow && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      )}
      {hideArrow && (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      )}
    </a>
  );
}
