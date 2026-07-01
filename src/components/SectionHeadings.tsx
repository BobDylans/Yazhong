"use client";

import { type ReactNode } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { Reveal } from "@/components/Reveal";

export function FeaturedSection({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return (
    <Reveal delay={100}>
      <section className="max-w-[1400px] mx-auto px-4 py-24 md:py-32">
        {children}
      </section>
    </Reveal>
  );
}

export function FeaturedHeading() {
  const { t } = useLocale();
  return (
    <div className="text-center mb-14 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
        {t("featuredTitle")}
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
        {t("featuredSubtitle")}
      </p>
    </div>
  );
}

export function InsightsSection({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return (
    <Reveal delay={100}>
      <section className="bg-secondary py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-14 md:mb-16">
            <span className="eyebrow mb-4">{t("insightsTitle")}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {t("insightsTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              {t("insightsDesc")}
            </p>
          </div>
          {children}
        </div>
      </section>
    </Reveal>
  );
}
