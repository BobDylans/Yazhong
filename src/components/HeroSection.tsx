import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background image */}
      <img src="/images/luxus-hero.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/70" />
      {/* Subtle gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] bg-gold blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="inline-block text-gold text-xs tracking-[0.25em] uppercase mb-6 font-medium">
          The Gold Standard in
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
          Luxury Car Mats
        </h1>
        <p className="mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
          Precision-made for your exact vehicle. 3D laser-fit, handcrafted
          eco-leather, maximum coverage.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-black font-semibold text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-[#b8742f] transition-colors">
            Find Your Perfect Fit
          </Link>
          <Link href="#"
            className="inline-flex items-center gap-2 text-white/70 text-sm tracking-widest uppercase px-8 py-3.5 border border-white/10 hover:border-white/30 transition-colors">
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-[10px] tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-px h-8 bg-white/10" />
      </div>
    </section>
  );
}
