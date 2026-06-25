import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Shield, Ruler, Truck, Award, Leaf, Sparkles } from "lucide-react";

const reasons = [
  { icon: Ruler, title: "Laser-Precise Custom Fit", desc: "Each set is engineered with 3D laser precision for a flawless, glove-like fit to your exact vehicle model. No gaps, no overlaps, no compromises." },
  { icon: Award, title: "Handcrafted Quality", desc: "Every mat is hand-finished in high-density eco-leather with precision stitching. Made to order, never mass produced." },
  { icon: Shield, title: "Maximum Coverage", desc: "Up to 95% floor coverage. Luxus covers every corner other mats pretend don't exist — sidewalls, door sills, and center console included." },
  { icon: Sparkles, title: "Easy to Clean", desc: "Eco-leather doesn't absorb. It repels. Spills, dirt, and pet hair lift off in one wipe. No stains, no odors, no hassle." },
  { icon: Leaf, title: "Premium Eco-Leather", desc: "High-quality synthetic leather that's durable, sustainable, and beautiful. No animals harmed, no compromise on luxury." },
  { icon: Truck, title: "2-Day DHL Express", desc: "Industry-leading delivery speed. Receive your mats in as little as 2 business days with DHL Express worldwide shipping." },
];

export default function WhyLuxusPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Why Choose Us</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Why Luxus Car Mats?</h1>
            <p className="mt-3 text-sm text-white/40 max-w-xl mx-auto">
              The Gold Standard in Made to Order Luxury Car Mats. Here&apos;s why car enthusiasts choose Luxus over the rest.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="bg-[#111] border border-white/5 p-8 group hover:border-gold/30 transition-all">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                    <p className="mt-2 text-sm text-white/40 leading-relaxed">{r.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <div className="max-w-xl mx-auto bg-[#111] border border-white/5 p-10">
              <h2 className="text-2xl font-bold text-white">The Gold Standard</h2>
              <p className="mt-3 text-sm text-white/40">
                Every Luxus set is made to order for your exact vehicle, never pulled from a shelf.
                Engineered with precision, handcrafted with care, delivered with speed.
              </p>
              <a href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-gold text-black px-6 py-3 text-sm font-semibold hover:bg-[#b8742f] transition-colors">
                Find Your Perfect Fit
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
