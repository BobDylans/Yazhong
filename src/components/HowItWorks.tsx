"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { Search, PenLine, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import { useLocale } from "@/i18n/LocaleProvider";

function StepCard({
  number,
  title,
  description,
  details,
  index,
}: {
  number: number;
  title: string;
  description: string;
  details: string[];
  index: number;
}) {
  return (
    <Reveal delay={index * 150} direction="up">
      <div className="group relative">
        {/* Desktop: horizontal dashed connector between steps */}
        {index < 2 && (
          <div className="hidden lg:block absolute top-12 start-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px border-t border-dashed border-border z-0" />
        )}
        {/* Mobile/tablet: vertical dashed connector down to the next step */}
        {index < 2 && (
          <div className="lg:hidden absolute top-16 start-1/2 -translate-x-1/2 w-px h-8 border-l border-dashed border-border z-0" />
        )}

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-[#b8862d] text-white shadow-lg shadow-gold/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-gold/30">
              {index === 0 ? <Search className="h-5 w-5" /> : index === 1 ? <PenLine className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
            </div>
            <span className="absolute -top-2 -end-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background">
              {number}
            </span>
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
            {description}
          </p>

          <ul className="text-left space-y-2">
            {details.map((detail, i) => (
              <li
                key={i}
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
  showCta?: boolean;
}

export function HowItWorks({ className, showCta = true }: HowItWorksProps) {
  const { t } = useLocale();

  const steps = [
    {
      number: 1,
      title: t("howStep1"),
      description: t("howStep1Desc"),
      details: [t("howStep1Detail1"), t("howStep1Detail2"), t("howStep1Detail3")],
    },
    {
      number: 2,
      title: t("howStep2"),
      description: t("howStep2Desc"),
      details: [t("howStep2Detail1"), t("howStep2Detail2"), t("howStep2Detail3")],
    },
    {
      number: 3,
      title: t("howStep3"),
      description: t("howStep3Desc"),
      details: [t("howStep3Detail1"), t("howStep3Detail2"), t("howStep3Detail3")],
    },
  ];

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="text-center mb-10 md:mb-12">
            <span className="eyebrow">{t("howEyebrow")}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3">
              {t("howTitle")}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-3">
              {t("howDesc")}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 md:gap-8 lg:grid-cols-3 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.number} {...step} index={i} />
          ))}
        </div>

        {showCta && (
          <Reveal delay={450} direction="up">
            <div className="mt-12 text-center">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <MessageCircle className="h-4 w-4" />
                {t("howCTA")}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
