const features = [
  {
    title: "Laser-Precise Custom Fit",
    desc: "3D laser precision for a flawless, glove-like fit to your exact vehicle model.",
  },
  {
    title: "Handcrafted Eco-Leather",
    desc: "Hand-finished in high-density eco-leather with precision stitching built to last.",
  },
  {
    title: "Maximum Floor Coverage",
    desc: "Up to 95% coverage — sidewalls, door sills, center console. Where others stop, Luxus covers.",
  },
  {
    title: "Wipe'n'Go Cleaning",
    desc: "Eco-leather repels spills, dirt, and pet hair. No stains, no odors, no hassle.",
  },
  {
    title: "Pedal-Friendly Design",
    desc: "Every cutout purposeful. Pedals, seat rails, vents, and floor lights — all accounted for.",
  },
  {
    title: "Tailor Made Program",
    desc: "Your name, your logo, your mats. Custom text or branding for a finish that's uniquely yours.",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">
            Why Luxus
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">
            The Gold Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="bg-[#111] border border-white/5 p-6 group hover:border-gold/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="h-2 w-2 rounded-full bg-gold shrink-0" />
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
              </div>
              <p className="text-sm text-white/40 leading-relaxed pl-5">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
