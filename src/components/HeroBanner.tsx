"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, ChevronDown } from "lucide-react";

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
const WHATSAPP_NUMBER = "1234567890";

export function HeroBanner() {
  const [search, setSearch] = useState({ year: "", make: "", model: "" });
  const makes = vehicleMakes;
  const models = search.make ? vehicleModels[search.make] ?? [] : [];
  const canSearch = search.year && search.make && search.model;
  const inquiryUrl = canSearch
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm looking for seat covers for my ${search.year} ${search.make} ${search.model}. Can you help?`)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero background with subtle motion */}
      <div className="relative flex min-h-[480px] md:min-h-[520px] w-full items-center justify-center bg-hero-gradient overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute -top-48 -right-48 h-[500px] w-[500px] animate-[slow-spin_30s_linear_infinite] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #3178c6 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] animate-[slow-spin_40s_linear_infinite] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #c99a4a 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Noise overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center">
          <span className="eyebrow mb-4 md:mb-5 inline-flex bg-white/10 text-white/80 backdrop-blur-sm">
            Premium Auto Accessories
          </span>
          <h1 className="font-heading text-3xl font-bold leading-[1.08] text-white sm:text-4xl md:text-[44px] md:leading-[1.08] tracking-tight">
            Upgrade Your Drive with
            <br />
            <span className="bg-warm-gradient bg-clip-text text-transparent">
              Premium Car Accessories
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/70 sm:text-base leading-relaxed">
            Discover custom-fit seat covers, steering wheel covers, and interior
            accessories. Contact us on WhatsApp for personalized recommendations.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank" rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22c35e] active:scale-[0.97]"
          >
            <MessageCircle className="h-5 w-5" />
            Inquire on WhatsApp
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </span>
          </a>
        </div>
      </div>

      {/* Search by Vehicle — glass card */}
      <div className="flex w-full justify-center px-4 -mt-8 relative z-20">
        <div className="glass flex w-full max-w-3xl flex-col items-center gap-3 rounded-2xl px-5 py-5 sm:flex-row sm:px-6 sm:py-4">
          <select value={search.year} onChange={e => setSearch(s => ({ year: e.target.value, make: "", model: "" }))}
            className={cn("w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all duration-200 sm:w-auto sm:min-w-[110px]",
              "border-[#e5e7eb] bg-white/80 text-[#191d21] focus:border-[#3178c6] focus:ring-2 focus:ring-[#3178c6]/20 backdrop-blur-sm",
              !search.year && "text-[#8c9196]")}>
            <option value="">Year</option>
            {vehicleYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={search.make} disabled={!search.year} onChange={e => setSearch(s => ({ ...s, make: e.target.value, model: "" }))}
            className={cn("w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all duration-200 sm:w-auto sm:min-w-[150px]",
              "border-[#e5e7eb] bg-white/80 text-[#191d21] focus:border-[#3178c6] focus:ring-2 focus:ring-[#3178c6]/20 backdrop-blur-sm",
              !search.make && "text-[#8c9196]", !search.year && "cursor-not-allowed opacity-50")}>
            <option value="">Make</option>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={search.model} disabled={!search.make} onChange={e => setSearch(s => ({ ...s, model: e.target.value }))}
            className={cn("w-full rounded-lg border px-3.5 py-3 text-sm outline-none transition-all duration-200 sm:w-auto sm:min-w-[150px]",
              "border-[#e5e7eb] bg-white/80 text-[#191d21] focus:border-[#3178c6] focus:ring-2 focus:ring-[#3178c6]/20 backdrop-blur-sm",
              !search.model && "text-[#8c9196]", !search.make && "cursor-not-allowed opacity-50")}>
            <option value="">Model</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <a href={inquiryUrl} target="_blank" rel="noopener noreferrer"
            className={cn("group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] sm:w-auto",
              canSearch ? "bg-blue-gradient hover:shadow-lg hover:shadow-blue-500/25" : "bg-[#3178c6] hover:bg-[#2563a8]")}>
            <MessageCircle className="h-4 w-4" />
            {canSearch ? "Check on WhatsApp" : "Contact Us"}
          </a>
        </div>
      </div>
    </section>
  );
}
