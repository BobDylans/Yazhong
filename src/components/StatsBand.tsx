"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

interface Stat {
  value: number;
  suffix?: string;
  labelKey: string;
}

const stats: Stat[] = [
  { value: 15000, suffix: "+", labelKey: "statInstallations" },
  { value: 50, suffix: "+", labelKey: "statCountries" },
  { value: 10, suffix: "+", labelKey: "statYears" },
  { value: 98, suffix: "%", labelKey: "statSatisfaction" },
];

function useCountUp(target: number, inView: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Skip the animation; defer the set to avoid setState-in-effect.
      const id = setTimeout(() => setValue(target), 0);
      return () => clearTimeout(id);
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for a premium decelerating count
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return value;
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

function StatItem({ stat, inView }: { stat: Stat; inView: boolean }) {
  const { t } = useLocale();
  const value = useCountUp(stat.value, inView);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-accent-warm tabular-nums">
        {formatNumber(value)}
        <span className="text-accent-warm">{stat.suffix}</span>
      </div>
      <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
        {t(stat.labelKey)}
      </div>
    </div>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-y border-border bg-secondary/50"
      aria-label="Company statistics"
    >
      <div className="max-w-[1400px] mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <StatItem key={stat.labelKey} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
