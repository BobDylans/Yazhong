"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { Armchair, Truck, Award, RefreshCw, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustItem {
  key: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export function TrustBadges() {
  const { t } = useLocale();

  const items: TrustItem[] = [
    { key: "Seat", title: "trustSeatExperts", desc: "trustSeatDesc", icon: Armchair },
    { key: "Shipping", title: "trustFreeShipping", desc: "trustShippingDesc", icon: Truck },
    { key: "Quality", title: "trustPremiumQuality", desc: "trustQualityDesc", icon: Award },
    { key: "Returns", title: "trustEasyReturns", desc: "trustReturnsDesc", icon: RefreshCw },
    { key: "Support", title: "trust247Support", desc: "trustSupportDesc", icon: Headset },
  ];

  return (
    <section className="w-full border-y border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2.5 md:py-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center gap-2 text-[11px] md:text-xs">
                <Icon className="h-3.5 w-3.5 text-gold shrink-0" strokeWidth={2} />
                <span className="text-gold font-semibold whitespace-nowrap">{t(item.title)}</span>
                <span className="text-muted-foreground hidden sm:inline">·</span>
                <span className="text-muted-foreground whitespace-nowrap hidden sm:inline">{t(item.desc)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
