"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 15000, suffix: "+", label: "Vehicles Equipped" },
  { value: 50, suffix: "+", label: "Countries Shipped" },
  { value: 10, suffix: " yrs", label: "Crafting Experience" },
  { value: 98, suffix: "%", label: "Customers Reorder" },
];

// Hydration-safe reduced-motion flag, read via useSyncExternalStore so we never
// call setState inside an effect (the canonical replacement for that pattern).
const emptySubscribe = () => () => {};
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useCountUp(target: number, run: boolean, duration = 1400) {
  const reducedMotion = usePrefersReducedMotion();
  // Snap to target when reduced motion is requested or the count hasn't started.
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!run || startedRef.current) return;
    startedRef.current = true;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  if (!run || reducedMotion) return target;
  return value;
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const v = useCountUp(stat.value, run);
  return (
    <div className="text-center px-4">
      <div className="font-heading text-3xl md:text-4xl font-bold text-gold tracking-tight tabular-nums">
        {formatNumber(v)}
        <span className="text-gold/80">{stat.suffix}</span>
      </div>
      <div className="mt-1.5 text-[10px] md:text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full bg-background">
      <div className="max-w-[1200px] mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-8">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} run={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
