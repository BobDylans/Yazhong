"use client";

import { Truck, Shield, RotateCcw, Award } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    desc: "On orders over $200",
  },
  {
    icon: Shield,
    title: "Premium Quality Guarantee",
    desc: "Handcrafted eco-leather",
  },
  {
    icon: RotateCcw,
    title: "30-Day Easy Returns",
    desc: "Not satisfied? Send it back",
  },
  {
    icon: Award,
    title: "Custom Fit Promise",
    desc: "Made for your exact vehicle",
  },
];

export function TrustBadges() {
  return (
    <section className="w-full py-6 md:py-8 bg-foreground/05">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 py-2"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-foreground leading-tight">
                  {item.title}
                </div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
