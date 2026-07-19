"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { getImageUrl } from "@/lib/images";
import { useLocale } from "@/i18n/LocaleProvider";
import { whatsappUrl } from "@/lib/config";
import { generatedProducts } from "@/data/generated/products-data";

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

// Pick a flagship product photo for the hero showcase (first Best Seller, else first).
const heroProduct = generatedProducts.find((p) => p.badge === "Best Seller") ?? generatedProducts[0];

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
    <section className="relative w-full overflow-hidden bg-foreground text-white">
      {/* Ambient background — subtle, so the product photo is the star */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-secondary/40" />
      <div className="absolute -top-1/4 -end-1/4 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Left: copy + CTA + vehicle search */}
        <div className="flex flex-col">
          <span className="eyebrow mb-5 inline-flex w-fit bg-gold/10 text-gold border border-gold/20">
            {t("heroEyebrow")}
          </span>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">{t("heroTitle1")}</span>
            <span className="block bg-warm-gradient bg-clip-text text-transparent">{t("heroTitle2")}</span>
          </h1>
          <p className="mt-5 max-w-md text-sm text-white/60 sm:text-base leading-relaxed">
            {t("heroDesc")}
          </p>

          {/* Primary CTA — unified gold brand color (was green, conflicted with blue search button) */}
          <a
            href={whatsappUrl()}
            target="_blank" rel="noopener noreferrer"
            className="group mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-warm-gradient px-7 py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-110 active:scale-[0.97] shadow-lg shadow-gold/20"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{t("heroCTA")}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Vehicle search — embedded in hero, compact, overlaps the dark bg */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm">
            <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-0">
              <select value={search.year} onChange={e => setSearch({ year: e.target.value, make: "", model: "" })}
                className={cn("w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all duration-200 md:rounded-e-none md:border-e-0 md:flex-1 md:border-0",
                  "border-white/10 bg-foreground/40 text-white focus:border-gold focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer",
                  !search.year && "text-white/40")}>
                <option value="">{t("heroYear")}</option>
                {vehicleYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select value={search.make} disabled={!search.year} onChange={e => setSearch(s => ({ ...s, make: e.target.value, model: "" }))}
                className={cn("w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all duration-200 md:rounded-none md:flex-1 md:border-0",
                  "border-white/10 bg-foreground/40 text-white focus:border-gold focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer",
                  !search.make && "text-white/40", !search.year && "cursor-not-allowed opacity-40")}>
                <option value="">{t("heroMake")}</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={search.model} disabled={!search.make} onChange={e => setSearch(s => ({ ...s, model: e.target.value }))}
                className={cn("w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all duration-200 md:rounded-none md:flex-1 md:border-0",
                  "border-white/10 bg-foreground/40 text-white focus:border-gold focus:ring-1 focus:ring-gold/30 appearance-none cursor-pointer",
                  !search.model && "text-white/40", !search.make && "cursor-not-allowed opacity-40")}>
                <option value="">{t("heroModel")}</option>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <a href={getInquiryUrl()} target="_blank" rel="noopener noreferrer"
                className={cn("group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] md:rounded-s-none md:w-auto",
                  canSearch ? "bg-warm-gradient hover:brightness-110" : "bg-white/10 hover:bg-white/15")}>
                <MessageCircle className="h-4 w-4 shrink-0" />
                {canSearch ? t("heroCheckWA") : t("heroContactUs")}
              </a>
            </div>
          </div>
        </div>

        {/* Right: flagship product photo — the signature visual moment */}
        {heroProduct && (
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(heroProduct.image)}
                alt={heroProduct.title}
                className="aspect-[4/5] w-full object-cover md:aspect-square animate-kenburns-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {heroProduct.badge && (
                <span className="absolute top-4 start-4 rounded-full bg-warm-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                  {heroProduct.badge}
                </span>
              )}
              {heroProduct.title && (
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="text-sm font-semibold text-white">{heroProduct.title}</div>
                  {heroProduct.priceFrom && (
                    <div className="text-xs text-gold mt-0.5">{heroProduct.priceFrom}</div>
                  )}
                </div>
              )}
            </div>
            {/* Soft gold glow behind the product */}
            <div className="absolute -inset-4 -z-10 rounded-full bg-gold/10 blur-3xl opacity-50" />
          </div>
        )}
      </div>
    </section>
  );
}
