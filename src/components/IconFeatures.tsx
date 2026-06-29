"use client";

import { Award, Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  { icon: Award, title: "Seat Cover Experts", subtitle: "Premium quality since 2010" },
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $50" },
  { icon: Shield, title: "Premium Quality", subtitle: "TUV Rheinland certified" },
  { icon: RefreshCw, title: "Easy Returns", subtitle: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", subtitle: "Dedicated customer service" },
];

function FeatureCard({ icon: Icon, title, subtitle, index }: typeof features[0] & { index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center text-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        isVisible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-[2px]",
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
        willChange: "transform, opacity",
      }}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent ring-1 ring-accent/10 transition-all duration-500 group-hover:scale-110">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <h3 className="mb-1 font-sans text-sm font-semibold text-foreground">
        {title}
      </h3>
      <p className="font-sans text-xs text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}

export function IconFeatures() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
