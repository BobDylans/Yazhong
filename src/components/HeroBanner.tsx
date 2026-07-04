"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { getImageUrl } from "@/lib/images";
import { useLocale } from "@/i18n/LocaleProvider";
import { whatsappUrl } from "@/lib/config";

const vehicleYears = Array.from({ length: 30 }, (_, i) => (2026 - i).toString());
const vehicleMakes = [
  "Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet",
  "Chrysler","Dodge","Fiat","Ford","Genesis","GMC","Honda",
  "Hyundai","Infiniti","Jaguar","Jeep","Kia","Land Rover","Lexus",
  "Lincoln","Mazda","Mercedes-Benz","Mini","Mitsubishi","Nissan",
  "Porsche","Ram","Subaru","Tesla","Toyota","Volkswagen","Volvo",
];
const vehicleModels: Record<string, string[]> = {
  BMW: ["3 Series","5 Series","X3","X5","X7"],
  "Mercedes-Benz": ["C-Class","E-Class","S-Class","GLC","GLE"],
  Toyota: ["Camry","Corolla","RAV4","Highlander","Tacoma"],
  Honda: ["Civic","Accord","CR-V","Pilot","Odyssey"],
  Ford: ["F-150","Mustang","Explorer","Escape","Bronco"],
};

export function HeroBanner() {
  const { t } = useLocale();
  const [search, setSearch] = useState({ year: "", make: "", model: "" });
  const makes = vehicleMakes;
  const models = search.make ? vehicleModels[search.make] ?? [] : [];
  const canSearch = search.year && search.make && search.model;
  const getInquiryUrl = () => {
    if (canSearch) {
      const msg = `Hi! I'm looking for seat covers for my ${search.year} ${search.make} ${search.model}. Can you help?`;
      return whatsappUrl(msg);
    }
    return whatsappUrl();
  };

  return (
    <section className="relative w-full">
      {/* Hero — speedometer background image */}
      <div className="relative flex min-h-[400px] md:min-h-[480px] w-full items-center justify-center overflow-hidden pt-20 md:pt-24">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl("/images/imgs/layoutImgs/hero-bg.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover animate-kenburns-in"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center py-10 md:py-16">
          <span className="eyebrow mb-4 md:mb-5 inline-flex bg-white/10 text-white/80 backdrop-blur-sm border border-white/10">
            {t("heroEyebrow")}
          </span>
          <h1 className="font-heading text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-[48px] md:leading-[1.08] tracking-tight">
            <span className="block">{t("heroTitle1")}</span>
            <span className="block bg-warm-gradient bg-clip-text text-transparent">{t("heroTitle2")}</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm text-white/70 sm:text-base leading-relaxed">
            {t("heroDesc")}
          </p>
          <a
            href={whatsappUrl()}
            target="_blank" rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22c35e] active:scale-[0.97] shadow-lg shadow-green-500/20"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{t("heroCTA")}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Search by Vehicle — stays stacked on tablet (640–768px) to avoid
          cramping three selects + button into one row; goes row at md+. */}
      <div className="flex w-full justify-center bg-secondary px-4 py-6 md:py-8">
        <div className="flex w-full max-w-3xl flex-col gap-3 md:flex-row md:items-center md:gap-0 md:rounded-xl md:border md:border-border md:bg-white md:p-1 md:shadow-sm">
          <select value={search.year} onChange={e => setSearch(s => ({ year: e.target.value, make: "", model: "" }))}
            className={cn("w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all duration-200 md:rounded-e-none md:border-e-0 md:flex-1 md:border-0 md:bg-transparent",
              "border-border bg-white text-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 appearance-none cursor-pointer",
              !search.year && "text-muted-foreground")}>
            <option value="">{t("heroYear")}</option>
            {vehicleYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={search.make} disabled={!search.year} onChange={e => setSearch(s => ({ ...s, make: e.target.value, model: "" }))}
            className={cn("w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all duration-200 md:rounded-none md:flex-1 md:border-0 md:bg-transparent",
              "border-border bg-white text-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 appearance-none cursor-pointer",
              !search.make && "text-muted-foreground", !search.year && "cursor-not-allowed opacity-40")}>
            <option value="">{t("heroMake")}</option>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={search.model} disabled={!search.make} onChange={e => setSearch(s => ({ ...s, model: e.target.value }))}
            className={cn("w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all duration-200 md:rounded-none md:flex-1 md:border-0 md:bg-transparent",
              "border-border bg-white text-foreground focus:border-accent focus:ring-1 focus:ring-accent/30 appearance-none cursor-pointer",
              !search.model && "text-muted-foreground", !search.make && "cursor-not-allowed opacity-40")}>
            <option value="">{t("heroModel")}</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <a href={getInquiryUrl()} target="_blank" rel="noopener noreferrer"
            className={cn("group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] md:rounded-s-none md:w-auto md:px-5",
              canSearch ? "bg-blue-gradient hover:shadow-lg hover:shadow-blue-500/25" : "bg-accent hover:bg-accent/90")}>
            <MessageCircle className="h-4 w-4 shrink-0" />
            {canSearch ? t("heroCheckWA") : t("heroContactUs")}
          </a>
        </div>
      </div>
    </section>
  );
}
