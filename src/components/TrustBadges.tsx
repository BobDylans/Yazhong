"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function TrustBadges() {
  const { t } = useLocale();

  const items = [
    { key: "Seat", title: "trustSeatExperts", desc: "trustSeatDesc" },
    { key: "Shipping", title: "trustFreeShipping", desc: "trustShippingDesc" },
    { key: "Quality", title: "trustPremiumQuality", desc: "trustQualityDesc" },
    { key: "Returns", title: "trustEasyReturns", desc: "trustReturnsDesc" },
    { key: "Support", title: "trust247Support", desc: "trustSupportDesc" },
  ];

  return (
    <section className="w-full border-y border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-2.5 md:py-3">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5 text-[11px] md:text-xs">
              <span className="text-gold font-semibold whitespace-nowrap">{t(item.title)}</span>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <span className="text-muted-foreground whitespace-nowrap hidden sm:inline">{t(item.desc)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
