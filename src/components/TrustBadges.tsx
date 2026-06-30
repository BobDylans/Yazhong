export function TrustBadges() {
  const items = [
    { title: "Seat Cover Experts", desc: "Premium quality since 2010" },
    { title: "Free Shipping", desc: "On orders over $50" },
    { title: "Premium Quality", desc: "TUV Rheinland certified" },
    { title: "Easy Returns", desc: "30-day return policy" },
    { title: "24/7 Support", desc: "Dedicated customer service" },
  ];

  return (
    <section className="w-full border-y border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-2.5 md:py-3">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-1.5 text-[11px] md:text-xs">
              <span className="text-gold font-semibold whitespace-nowrap">{item.title}</span>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <span className="text-muted-foreground whitespace-nowrap hidden sm:inline">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
