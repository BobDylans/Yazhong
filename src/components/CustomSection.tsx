import Link from "next/link";

export function CustomSection() {
  return (
    <section className="w-full bg-black py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: images grid */}
          <div className="grid grid-cols-2 gap-3">
            {["luxus-gallery1.webp", "luxus-feature1.webp", "luxus-feature2.webp", "luxus-feature3.webp"].map((img, i) => (
              <div key={i} className="aspect-square rounded-sm overflow-hidden bg-[#111]">
                <img src={`/images/${img}`} alt="" className="w-full h-full object-cover" loading={i < 2 ? "eager" : "lazy"} />
              </div>
            ))}
          </div>

          {/* Right: content */}
          <div className="max-w-lg">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">
              Luxus Tailor Made Program
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
              Your Name, Your Logo,
              <br />
              <span className="text-gold">Your Mats</span>
            </h2>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Add custom text or branding for a finish that belongs to no one
              else. Every set is made to order for your exact vehicle, never
              pulled from a shelf.
            </p>
            <Link href="#"
              className="mt-6 inline-flex items-center gap-2 text-gold text-sm tracking-widest uppercase font-semibold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors">
              Customize Your Mats
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
