"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect } from "react";

// ---- Reusable animation variants ----

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const goldGlow = {
  whileHover: {
    boxShadow: "0 0 20px rgba(208, 140, 60, 0.3), 0 0 40px rgba(208, 140, 60, 0.1)",
    borderColor: "rgba(208, 140, 60, 0.5)",
    transition: { duration: 0.3 },
  },
};

// ---- Animated section wrapper ----

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variants;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = fadeUp,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: variant.hidden,
        visible: { ...variant.visible, transition: { ...(variant.visible as any)?.transition, delay } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ---- Staggered children wrapper ----

interface StaggerWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerWrapper({ children, className, delay = 0.1 }: StaggerWrapperProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

// ---- Smooth scroll provider (Lenis) — simplified ----

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    import("lenis").then((mod) => {
      lenis = new mod.default({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });
      function onFrame(time: number) { lenis.raf(time); }
      requestAnimationFrame(onFrame);
    });
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return <>{children}</>;
}
