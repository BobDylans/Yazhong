import Link from "next/link";

export function InstagramSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 text-center">
        <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Follow Us</span>
        <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">
          As Seen on Instagram
        </h2>
        <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
          See how Luxus car mats look in real vehicles. Tag us in your photos
          for a chance to be featured.
        </p>
        <Link href="https://instagram.com/luxuscarmats" target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-gold text-black font-semibold text-sm tracking-widest uppercase px-7 py-3 hover:bg-[#b8742f] transition-colors">
          @luxuscarmats
        </Link>

        {/* Placeholder image grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {["luxus-gallery4.webp","luxus-feature4.webp","luxus-gallery3.webp","luxus-comparison.webp"].map((img, i) => (
            <div key={i} className="aspect-square rounded-sm overflow-hidden bg-[#111]">
              <img src={`/images/${img}`} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
