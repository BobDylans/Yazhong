"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/i18n/LocaleProvider";

export function ReviewsSection({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();

  return (
    <Reveal delay={100}>
      <section className="py-16 md:py-20 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3">{t("reviewsTitle")}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("reviewsTitle")}
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-3">
                {t("reviewsDesc")}
              </p>
            </div>
          </Reveal>
          {children}
        </div>
      </section>
    </Reveal>
  );
}
