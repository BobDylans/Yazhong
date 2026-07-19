"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

interface Stat {
  value: number;
  suffix?: string;
  labelKey: string;
}

// Evaluate a cubic-bezier easing curve at t∈[0,1] (same form as CSS
// cubic-bezier(p1x,p1y,p2x,p2y)). Solves for parameter s with x(s)=t
// (Newton-Raphson), then returns y(s) — keeps JS count-up on the same
// easing as the site's CSS transitions (var(--ease-brand)).
function bezierEase(t: number, p1x: number, p1y: number, p2x: number, p2y: number): number {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;
  const sampleX = (s: number) => ((ax * s + bx) * s + cx) * s;
  const sampleY = (s: number) => ((ay * s + by) * s + cy) * s;
  const sampleDX = (s: number) => (3 * ax * s + 2 * bx) * s + cx;

  let s = t;
  for (let i = 0; i < 8; i++) {
    const x = sampleX(s) - t;
    if (Math.abs(x) < 1e-5) break;
    const dx = sampleDX(s);
    s -= dx > 0 ? x / dx : x;
    if (s < 0) s = 0;
    else if (s > 1) s = 1;
  }
  return sampleY(s);
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
      // Brand easing (cubic-bezier(0.32, 0.72, 0, 1)) — matches the CSS
      // transition timing used across Reveal / LinkCTA / ProductCard so the
      // whole site shares one motion language.
      const eased = bezierEase(progress, 0.32, 0.72, 0, 1);
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
