"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

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

export function VehicleSearch() {
  const [search, setSearch] = useState({ year: "", make: "", model: "" });
  const makes = vehicleMakes;
  const models = search.make ? vehicleModels[search.make] ?? [] : [];
  const canSearch = search.year && search.make && search.model;

  const whatsappUrl = canSearch
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm looking for custom fit car mats for my ${search.year} ${search.make} ${search.model}. Can you help?`)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="w-full bg-[#0a0a0a] py-12 md:py-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 text-center">
        <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">
          Find Your Fit
        </span>
        <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">
          Select Your Vehicle
        </h2>
        <p className="mt-2 text-sm text-white/40 max-w-md mx-auto">
          Tell us your vehicle and we&apos;ll find the perfect Luxus mats for
          your exact model.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          <select value={search.year} onChange={e => setSearch(s => ({ year: e.target.value, make: "", model: "" }))}
            className={cn("w-full sm:w-auto rounded-sm border px-4 py-3 text-sm outline-none transition-all sm:min-w-[120px] sm:flex-1",
              "bg-[#111] text-white border-[#2a2a2a] focus:border-gold appearance-none cursor-pointer",
              !search.year && "text-white/30")}>
            <option value="">Year</option>
            {vehicleYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={search.make} disabled={!search.year} onChange={e => setSearch(s => ({ ...s, make: e.target.value, model: "" }))}
            className={cn("w-full sm:w-auto rounded-sm border px-4 py-3 text-sm outline-none transition-all sm:min-w-[160px] sm:flex-1",
              "bg-[#111] text-white border-[#2a2a2a] focus:border-gold appearance-none",
              !search.make && "text-white/30", !search.year && "opacity-40 cursor-not-allowed")}>
            <option value="">Make</option>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={search.model} disabled={!search.make} onChange={e => setSearch(s => ({ ...s, model: e.target.value }))}
            className={cn("w-full sm:w-auto rounded-sm border px-4 py-3 text-sm outline-none transition-all sm:min-w-[160px] sm:flex-1",
              "bg-[#111] text-white border-[#2a2a2a] focus:border-gold appearance-none",
              !search.model && "text-white/30", !search.make && "opacity-40 cursor-not-allowed")}>
            <option value="">Model</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-6 py-3 text-sm font-semibold text-black transition-all active:scale-[0.97] w-full sm:w-auto",
              canSearch ? "bg-gold hover:bg-[#b8742f]" : "bg-gold/60 hover:bg-gold/80")}>
            <MessageCircle className="h-4 w-4 shrink-0" />
            {canSearch ? "Check on WhatsApp" : "Contact Us"}
          </a>
        </div>
      </div>
    </div>
  );
}
