import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch",
  description:
    "Contact Yazhong for custom-fit car seat covers and accessories. Chat with us on WhatsApp for the fastest response, or send us a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-[106px] min-h-screen">
        {/* Header */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Contact Us
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Have a question about our products? We&apos;d love to hear from
              you. Reach out and we&apos;ll get back to you as soon as
              possible.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* WhatsApp */}
              <div className="bg-white border border-border p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-[#25D366]">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  WhatsApp
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fastest response time. Chat with us directly.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#22c35e] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat Now
                </a>
              </div>

              {/* Email */}
              <div className="bg-white border border-border p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us an email and we&apos;ll respond within 24 hours.
                </p>
                <a
                  href="mailto:info@yazhong.com"
                  className="text-accent text-sm font-medium hover:underline"
                >
                  info@yazhong.com
                </a>
              </div>

              {/* Location */}
              <div className="bg-white border border-border p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MapPin className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Location
                </h3>
                <p className="text-sm text-muted-foreground">
                  We serve customers worldwide with fast shipping and tracking
                  on every order.
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
