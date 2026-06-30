import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Shield, Truck, Award, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Crafted for Your Drive",
  description:
    "Learn about Yazhong — our mission to deliver premium, custom-fit car accessories. Handcrafted quality, precision engineering, customer-first service.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "We source only the highest quality materials for all our products.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Worldwide shipping with tracking on every order.",
  },
  {
    icon: Shield,
    title: "Customer Protection",
    desc: "Your satisfaction is our priority. We stand behind every product.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Reach us anytime on WhatsApp for questions and assistance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-[106px] min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              About Yazhong
            </h1>
            <p className="mt-4 text-white/80 max-w-3xl mx-auto text-lg">
              Your trusted partner in premium automotive interior accessories.
              We combine quality craftsmanship with innovative design to enhance
              every drive.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Yazhong was founded with a simple mission: to provide
                  car enthusiasts and everyday drivers with premium interior
                  accessories that combine style, comfort, and durability.
                </p>
                <p>
                  We understand that your car is more than just a mode of
                  transportation&mdash;it&apos;s an extension of your
                  personality. That&apos;s why we carefully curate our
                  collection of seat covers, steering wheel covers, floor mats,
                  and accessories to meet the highest standards of quality and
                  design.
                </p>
                <p>
                  Every product in our catalog is tested for fit, finish, and
                  durability. We work directly with manufacturers who share our
                  commitment to excellence, ensuring that when you choose
                  Yazhong, you&apos;re choosing quality you can trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary">
          <div className="max-w-[1400px] mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Why Choose Yazhong
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="text-center bg-white p-8"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="max-w-[1400px] mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Have Questions? We&apos;re Here to Help
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us on WhatsApp for personalized product recommendations
              and custom orders.
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 text-base font-semibold hover:bg-[#22c35e] transition-colors"
            >
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
