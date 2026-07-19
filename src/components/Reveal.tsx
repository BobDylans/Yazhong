"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const directionOffset = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    none: "translate-y-0",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-motion transition-all",
        isVisible
          ? "translate-y-0 translate-x-0 opacity-100 blur-0"
          : `${directionOffset[direction]} opacity-0 blur-[2px]`,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "var(--ease-brand)",
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
