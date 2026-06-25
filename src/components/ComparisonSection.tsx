import Link from "next/link";

const comparisons = [
  {
    feature: "Custom Fit",
    rest: "Mass-produced, generic shape",
    luxus: "3D laser-scanned for your exact vehicle",
    highlight: true,
  },
  {
    feature: "Floor Coverage",
    rest: "Base coverage only",
    luxus: "Up to 95% — sidewalls, sills, and console included",
    highlight: true,
  },
  {
    feature: "Material",
    rest: "Thin rubber or basic carpet",
    luxus: "Premium eco-leather, 14mm thick multi-layer",
    highlight: true,
  },
  {
    feature: "Durability",
    rest: "Fades, frays, absorbs odors",
    luxus: "Waterproof, stain-proof, odor-free, built to last",
    highlight: true,
  },
  {
    feature: "Cleaning",
    rest: "Requires vacuuming, scrubbing, drying",
    luxus: "Wipes clean in seconds with a damp cloth",
    highlight: true,
  },
  {
    feature: "Production",
    rest: "Mass produced, pulled from a shelf",
    luxus: "Made to order for your exact vehicle",
    highlight: true,
  },
];

export function ComparisonSection() {
  return (
    <section className="w-full bg-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Luxus vs The Rest</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            See why car enthusiasts choose Luxus
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs tracking-widest uppercase font-medium mb-2">
            <div className="col-span-3" />
            <div className="col-span-4 text-center text-white/30">The Rest</div>
            <div className="col-span-5 text-center text-gold">LUXUS</div>
          </div>

          {/* Rows */}
          {comparisons.map((c, i) => (
            <div
              key={c.feature}
              className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 py-4 md:py-5 ${
                i < comparisons.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              {/* Feature name */}
              <div className="md:col-span-3 flex items-center">
                <span className="text-sm font-semibold text-white">{c.feature}</span>
              </div>

              {/* The Rest — mobile: row, desktop: column */}
              <div className="md:col-span-4 flex md:block items-start gap-2">
                <span className="md:hidden text-[10px] uppercase tracking-wider text-white/20 mt-0.5 shrink-0 w-16">The Rest</span>
                <div className="flex items-center gap-2">
                  <img src="/images/luxus-cross.webp" alt="" className="h-4 w-4 shrink-0 opacity-30" />
                  <span className="text-sm text-white/40">{c.rest}</span>
                </div>
              </div>

              {/* Luxus */}
              <div className="md:col-span-5 flex md:block items-start gap-2">
                <span className="md:hidden text-[10px] uppercase tracking-wider text-gold/60 mt-0.5 shrink-0 w-16">Luxus</span>
                <div className="flex items-center gap-2">
                  <img src="/images/luxus-check.webp" alt="" className="h-4 w-4 shrink-0" />
                  <span className="text-sm text-white font-medium">{c.luxus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-white/40 mb-4">
            Experience the Luxus difference. Made to order for your exact vehicle.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-black text-sm font-semibold tracking-widest uppercase px-8 py-3 hover:bg-[#b8742f] transition-colors">
            Find Your Perfect Fit
          </Link>
        </div>
      </div>
    </section>
  );
}
