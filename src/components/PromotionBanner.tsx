import Link from "next/link";

export function PromotionBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-[#0a0806] via-[#1a1408] to-[#0a0806] border-t border-gold/10 py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 text-center">
        <span className="inline-block text-gold text-xs tracking-[0.25em] uppercase font-medium mb-3">
          Limited Time Offer
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Anniversary Sale
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-5xl md:text-6xl font-bold text-gold">17% OFF</span>
        </div>
        <p className="mt-3 text-sm text-white/50 max-w-md mx-auto">
          Use code at checkout. Offer valid for a limited time.
        </p>
        <div className="mt-5 inline-flex items-center gap-3 bg-white/5 border border-gold/30 px-6 py-3 rounded-sm">
          <span className="text-xs tracking-[0.3em] uppercase text-white/30">Code</span>
          <span className="text-lg font-bold text-gold tracking-wider">LUXUS7</span>
        </div>
        <div className="mt-8">
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-black text-sm font-semibold tracking-widest uppercase px-8 py-3 hover:bg-[#b8742f] transition-colors">
            Shop the Sale
          </Link>
        </div>
      </div>
    </section>
  );
}
