const stats = [
  { value: "100%", label: "Made to Order", sub: "Every Luxus set is made to order for your exact vehicle, never pulled from a shelf." },
  { value: "Up to 95%", label: "Floor Coverage", sub: "Supreme coverage proven to protect your vehicle's resale value." },
  { value: "2-day", label: "DHL Express Delivery", sub: "Industry-leading delivery speed, receive your mats in as little as 2 business days." },
];

export function StatsSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold">{s.value}</div>
              <div className="mt-2 text-sm font-semibold text-white tracking-wider uppercase">{s.label}</div>
              <p className="mt-3 text-sm text-white/40 max-w-xs mx-auto leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
