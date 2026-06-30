import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MessageCircle, Mail, MapPin, Clock, CheckCircle, Star, ChevronRight, HelpCircle, Send } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with Yazhong",
  description:
    "Have a question about custom-fit car seat covers or accessories? Chat with us on WhatsApp for the fastest response, or send us a message.",
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    q: "How do I find the right fit for my vehicle?",
    a: "Just tell us your car's make, model, and year on WhatsApp. We'll help you find the perfect match from our catalog of 500+ vehicle models.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders are processed within 24 hours. Standard shipping takes 5-8 business days. Express shipping (2-3 days) is available on request.",
  },
  {
    q: "Can I return if it doesn't fit?",
    a: "Absolutely. We offer a 30-day easy return policy. If your custom-fit product doesn't match your vehicle, we'll make it right.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to over 40 countries worldwide. Tracked shipping is included on all orders over $200.",
  },
];

const waBase = `https://wa.me/${WHATSAPP_NUMBER}`;
const quickLinks = [
  { label: "Check Product Fitment", href: waBase },
  { label: "Request a Quote", href: `${waBase}?text=${encodeURIComponent("Hi! I'd like a quote for custom-fit seat covers.")}` },
  { label: "Track My Order", href: `${waBase}?text=${encodeURIComponent("Hi! I'd like to track my order.")}` },
  { label: "Bulk / Wholesale Inquiry", href: `${waBase}?text=${encodeURIComponent("Hi! I'm interested in bulk ordering.")}` },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden pt-20">
          <img src="/images/luxus-hero.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <span className="inline-block text-gold text-xs tracking-[0.25em] uppercase mb-4 font-medium">
              Get in Touch
            </span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
              We&apos;re Here to Help
            </h1>
            <p className="mt-4 text-sm text-zinc-300 sm:text-base max-w-xl mx-auto">
              Have a question about fitment, pricing, or custom orders? Our team typically
              responds within minutes on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-8 py-3.5 text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <a
                href="mailto:info@yazhong.com"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-500 text-zinc-300 px-8 py-3.5 text-sm font-semibold hover:border-white hover:text-white transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
                Send an Email
              </a>
            </div>
          </div>
        </section>

        {/* Quick response indicators */}
        <section className="py-8 bg-foreground text-white">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: MessageCircle, label: "WhatsApp Response", value: "&lt; 5 min", sub: "Average reply time" },
                { icon: Clock, label: "Email Response", value: "&lt; 24 hrs", sub: "Weekdays" },
                { icon: CheckCircle, label: "Orders Shipped", value: "15,000+", sub: "Worldwide" },
                { icon: Star, label: "Customer Rating", value: "4.9/5", sub: "Based on 2,000+ reviews" },
              ].map((item) => (
                <div key={item.label}>
                  <item.icon className="h-5 w-5 mx-auto text-gold mb-1" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">{item.label}</div>
                  <div className="text-lg md:text-xl font-bold text-white mt-0.5">{item.value}</div>
                  <div className="text-[11px] text-zinc-400">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main contact area */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
              {/* Left: Contact methods */}
              <div className="lg:col-span-3 space-y-6">
                <div>
                  <span className="eyebrow mb-3">Contact Methods</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    Choose How to Reach Us
                  </h2>
                </div>

                {/* WhatsApp Card (highlighted) */}
                <div className="p-6 rounded-xl border border-gold/30 bg-card shadow-ambient relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                    Fastest
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
                      <MessageCircle className="h-6 w-6 text-[#25D366]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Fastest way to get a response. Our team typically replies within 5 minutes.
                        Send us your car make, model, and year for instant fitment recommendations.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-[#22c35e] transition-all duration-300">
                          <MessageCircle className="h-4 w-4" />
                          Start Chat
                        </a>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to know if you have seat covers for my car.")}`} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-border text-foreground px-4 py-2 text-sm font-medium rounded-full hover:bg-secondary transition-all duration-300">
                          Ask About Fitment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        For detailed inquiries, bulk orders, or partnership opportunities.
                        We respond within 24 hours on business days.
                      </p>
                      <a href="mailto:info@yazhong.com"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                        info@yazhong.com
                        <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">Worldwide Service</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        We serve customers across 40+ countries. All orders include tracked shipping.
                        For specific delivery timeframes, check with us on WhatsApp.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Quick actions / Vehicle inquiry */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-border bg-card p-6 md:p-8 sticky top-28">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                      <Send className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-semibold text-foreground">Quick Actions</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose what you need help with
                    </p>
                  </div>
                  <div className="space-y-2">
                    {quickLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary hover:border-gold/30 transition-all duration-200 group"
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border text-center">
                    <div className="text-xs text-muted-foreground">
                      Response time
                    </div>
                    <div className="text-sm font-semibold text-gold mt-1">
                      &lt; 5 minutes on WhatsApp
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Available Mon-Sat 9:00-18:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3">FAQ</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-border bg-card overflow-hidden">
                  <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer text-sm font-semibold text-foreground hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-gold shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-90 shrink-0" />
                  </summary>
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-border pt-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
              Our team is ready to help you find the perfect fit for your vehicle.
              Tap the button below and send us your car details.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like help finding the right car accessories for my vehicle. My car is: [Make] [Model] [Year]")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-8 py-3.5 text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            >
              <MessageCircle className="h-5 w-5" />
              Start WhatsApp Chat
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
