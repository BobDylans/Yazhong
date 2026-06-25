import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MessageCircle, Mail, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "1234567890";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-medium">Get in Touch</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Contact Us</h1>
            <p className="mt-3 text-sm text-white/40 max-w-lg mx-auto">
              Have a question about Luxus Car Mats? We&apos;re here to help.
              Reach out and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#111] border border-white/5 p-8 text-center group hover:border-gold/30 transition-colors">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-sm text-white/40 mb-4">Fastest response. Chat with us directly.</p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-black px-5 py-2.5 text-sm font-semibold hover:bg-[#b8742f] transition-colors">
                  <MessageCircle className="h-4 w-4" /> Chat Now
                </a>
              </div>
              <div className="bg-[#111] border border-white/5 p-8 text-center group hover:border-gold/30 transition-colors">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Mail className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <p className="text-sm text-white/40 mb-4">We&apos;ll respond within 24 hours.</p>
                <a href="mailto:info@luxuscarmats.com" className="text-gold text-sm font-medium hover:underline">
                  info@luxuscarmats.com
                </a>
              </div>
              <div className="bg-[#111] border border-white/5 p-8 text-center group hover:border-gold/30 transition-colors">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <MapPin className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-white mb-2">Worldwide Shipping</h3>
                <p className="text-sm text-white/40">
                  We ship globally with DHL Express. Free shipping to US, UK, Canada, Australia, and Europe.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
