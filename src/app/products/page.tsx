import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Link from "next/link";

const series = [
  { slug: "diamond", name: "Diamond Series", tagline: "Timeless Diamond Pattern for the Discerning Driver", img: "/images/luxus-series-diamond.webp" },
  { slug: "twin-diamond", name: "Twin-Diamond Series", tagline: "Dimensional Depth for the Elevated Cabin", img: "/images/luxus-series-diamond.webp" },
  { slug: "honeycomb", name: "Honeycomb Series", tagline: "Geometric Precision for an Aggressive Edge", img: "/images/luxus-series-honeycomb.webp" },
  { slug: "hybrid", name: "Hybrid Series", tagline: "Dynamic Fusion for Nonconformists", img: "/images/luxus-series-hybrid.webp" },
  { slug: "double-layer", name: "Double Layer Series", tagline: "Heavy-Duty Armor in a Tuxedo Finish", img: "/images/luxus-series-doublelayer.webp" },
];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Collections</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Choose Your Series</h1>
            <p className="mt-3 text-sm text-white/40 max-w-lg mx-auto">
              Each series is precision-made for your exact vehicle. Browse our collections below.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {series.map((s) => (
                <div key={s.slug} className="group bg-[#111] border border-white/5 overflow-hidden hover:border-gold/30 transition-all">
                  <div className="aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white">{s.name}</h2>
                    <p className="mt-1 text-sm text-white/40">{s.tagline}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Link href={`/contact?product=${encodeURIComponent(s.name)}`}
                        className="inline-flex items-center gap-2 bg-gold text-black text-xs font-semibold tracking-widest uppercase px-5 py-2.5 hover:bg-[#b8742f] transition-colors">
                        Inquire on WhatsApp
                      </Link>
                      <span className="text-xs text-white/20">Custom fit for your vehicle</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
