"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { Search, PenLine, MessageCircle } from "lucide-react";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const steps: StepProps[] = [
  {
    number: 1,
    icon: <Search className="h-5 w-5" />,
    title: "Choose Your Style",
    description:
      "Browse our collection and pick your preferred product — seat covers, steering wheel covers, floor mats, or accessories.",
    details: [
      "Select from premium materials: leather, Alcantara, carbon fiber",
      "Choose your color and stitching to match your interior",
      "Filter by vehicle type or product category",
    ],
  },
  {
    number: 2,
    icon: <PenLine className="h-5 w-5" />,
    title: "Customize & Confirm Fit",
    description:
      "Tell us your vehicle details and personalization preferences. Our team ensures every product is custom-fit to your exact vehicle.",
    details: [
      "Share your car's make, model, and year",
      "Select material, color, and stitching options",
      "Get instant fitment confirmation on WhatsApp",
    ],
  },
  {
    number: 3,
    icon: <MessageCircle className="h-5 w-5" />,
    title: "Order via WhatsApp",
    description:
      "Finalize pricing, delivery timeline, and payment through direct chat. No complicated checkout — just a simple conversation.",
    details: [
      "Receive personalized pricing and quotes",
      "Tracked worldwide shipping in 5–8 business days",
      "30-day easy return policy if anything isn't right",
    ],
  },
];

function StepCard({ step, index }: { step: StepProps; index: number }) {
  return (
    <Reveal delay={index * 150} direction="up">
      <div className="group relative">
        {/* Connector line (desktop) */}
        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px border-t border-dashed border-border z-0" />
        )}

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Step Number + Icon */}
          <div className="relative mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-[#b8862d] text-white shadow-lg shadow-gold/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-gold/30">
              {step.icon}
            </div>
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
              {step.number}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-foreground mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
            {step.description}
          </p>

          {/* Detail list */}
          <ul className="text-left space-y-2">
            {step.details.map((detail) => (
              <li
                key={detail}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

interface HowItWorksProps {
  className?: string;
  /** Optional WhatsApp CTA. Default: true */
  showCta?: boolean;
  /** Override the eyebrow text */
  eyebrow?: string;
  /** Override the heading */
  heading?: string;
}

export function HowItWorks({
  className,
  showCta = true,
  eyebrow = "How It Works",
  heading = "Three Simple Steps to Your Perfect Fit",
}: HowItWorksProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal direction="up">
          <div className="text-center mb-14">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3">
              {heading}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-3">
              From browsing to delivery — we keep it simple, personal, and fast.
            </p>
          </div>
        </Reveal>

        {/* Steps */}
        <div className="grid gap-10 md:gap-8 lg:grid-cols-3 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        {showCta && (
          <Reveal delay={450} direction="up">
            <div className="mt-12 text-center">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15138009985"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <MessageCircle className="h-4 w-4" />
                Start Your Order on WhatsApp
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
