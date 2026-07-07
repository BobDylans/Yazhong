"use client";

import { Reveal } from "@/components/Reveal";
import { ReviewsSection } from "@/components/ReviewsSection";
import { LinkCTA } from "@/components/LinkCTA";
import { testimonialsByLocale } from "@/data/testimonials";
import { useLocale } from "@/i18n/LocaleProvider";

export function HomeReviews() {
  const { locale } = useLocale();
  const testimonials = testimonialsByLocale[locale];

  return (
    <ReviewsSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {testimonials.slice(0, 3).map((t, i) => (
          <Reveal key={t.name} delay={i * 100} direction="up">
            <div className="p-6 border border-border rounded-xl bg-card shadow-ambient h-full flex flex-col">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} className={si < t.rating ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 fill-none text-border"} viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t.vehicle}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={300}>
        <div className="text-center mt-10">
          <LinkCTA href="/about" labelKey="readMoreReviews" size="sm" hideArrow />
        </div>
      </Reveal>
    </ReviewsSection>
  );
}
