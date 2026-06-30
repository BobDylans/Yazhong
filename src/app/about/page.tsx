import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Shield, Truck, Award, Headphones, Star, MessageCircle, ChevronRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Crafted for Your Drive",
  description:
    "Learn about Yazhong — our mission to deliver premium, custom-fit car accessories. Handcrafted quality, precision engineering, customer-first service.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: "15,000+", label: "Happy Customers" },
  { value: "500+", label: "Vehicle Models" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "3-Day", label: "Average Delivery" },
];

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Every product is handcrafted with precision, using only the finest eco-leather and materials.",
  },
  {
    icon: Truck,
    title: "Custom Fit Guarantee",
    desc: "3D laser-scanned for your exact vehicle make and model. Perfect fit, every time.",
  },
  {
    icon: Headphones,
    title: "Customer First",
    desc: "Chat with us on WhatsApp for personalized recommendations. We reply in minutes.",
  },
  {
    icon: Shield,
    title: "Durability Tested",
    desc: "All products undergo rigorous testing for wear, heat resistance, and airbag compatibility.",
  },
];

const testimonials = [
  {
    name: "James M.",
    vehicle: "BMW X5 2024",
    text: "The custom-fit seat covers transformed my X5's interior. Installation took 15 minutes and the fit is absolutely perfect. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    vehicle: "Mercedes C-Class 2023",
    text: "I was skeptical about ordering seat covers online, but the WhatsApp team helped me pick the perfect color and model. Looks better than OEM!",
    rating: 5,
  },
  {
    name: "Mike R.",
    vehicle: "Toyota RAV4 2025",
    text: "Floor mats are incredible quality. Raised edges caught a coffee spill perfectly. Easy to clean too. Will buy again for my second car.",
    rating: 5,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
          <img src="/images/hero-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <span className="inline-block text-gold text-xs tracking-[0.25em] uppercase mb-4 font-medium">
              About Yazhong
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
              We Make Your Drive More Comfortable
            </h1>
            <p className="mt-4 text-sm text-zinc-300 sm:text-base max-w-xl mx-auto">
              From custom-fit seat covers to precision floor mats, every product is designed and
              crafted with one mission: to make every drive feel premium.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-foreground text-white py-10">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold text-gold">{s.value}</div>
                  <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="eyebrow mb-4">Our Story</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Premium Car Accessories,<br />Made for You
                </h2>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    Yazhong was born from a simple idea: your car deserves accessories that look, feel,
                    and fit like they were made for it — because they are.
                  </p>
                  <p>
                    We partner directly with manufacturers to bring you premium custom-fit seat covers,
                    steering wheel covers, and floor mats at factory-direct prices. Every product is
                    3D laser-scanned to your vehicle&apos;s exact specifications.
                  </p>
                  <p>
                    Over 15,000 drivers trust Yazhong for their car interior needs. We&apos;re proud
                    to be one of the fastest-growing auto accessory brands in the industry.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-2 bg-gold text-black px-6 py-3 text-sm font-semibold hover:bg-gold/90 transition-colors"
                >
                  Get Your Custom Fit
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                  <img src="/images/luxus-series-diamond.webp" alt="Luxury seat cover" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl bg-muted mt-8">
                  <img src="/images/luxus-gallery1.webp" alt="Car interior" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl bg-muted -mt-4">
                  <img src="/images/luxus-series-honeycomb.webp" alt="Seat cover detail" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl bg-muted mt-4">
                  <img src="/images/luxus-series-doublelayer.webp" alt="Double layer seat cover" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3">Why Yazhong</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">What Sets Us Apart</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="card p-6 text-center hover:shadow-ambient-hover transition-all duration-300 border border-border rounded-xl bg-card">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <v.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3">Testimonials</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">What Our Customers Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="card p-6 border border-border rounded-xl bg-card">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">{t.name}</div>
                      <div className="text-[11px] text-muted-foreground">{t.vehicle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-foreground text-white">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Upgrade Your Drive?</h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8">
              Chat with our team on WhatsApp for personalized recommendations. We&apos;ll help you
              find the perfect fit for your vehicle.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-8 py-3 text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
