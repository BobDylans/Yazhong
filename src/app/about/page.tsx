"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Shield, Truck, Award, Headphones, Star, MessageCircle, ChevronRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { whatsappUrl } from "@/lib/config";
import { getImageUrl } from "@/lib/images";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLocale();

  const stats = [
    { value: "15,000+", key: "aboutStatsCustomers" },
    { value: "500+", key: "aboutStatsVehicles" },
    { value: "98%", key: "aboutStatsSatisfaction" },
    { value: "3-Day", key: "aboutStatsDelivery" },
  ];

  const values = [
    { icon: Award, titleKey: "aboutValue1", descKey: "aboutValue1Desc" },
    { icon: Truck, titleKey: "aboutValue2", descKey: "aboutValue2Desc" },
    { icon: Headphones, titleKey: "aboutValue3", descKey: "aboutValue3Desc" },
    { icon: Shield, titleKey: "aboutValue4", descKey: "aboutValue4Desc" },
  ];

  const testimonials = [
    { nameKey: "aboutTestimonial1Name", vehicleKey: "aboutTestimonial1Vehicle", textKey: "aboutTestimonial1", rating: 5 },
    { nameKey: "aboutTestimonial2Name", vehicleKey: "aboutTestimonial2Vehicle", textKey: "aboutTestimonial2", rating: 5 },
    { nameKey: "aboutTestimonial3Name", vehicleKey: "aboutTestimonial3Vehicle", textKey: "aboutTestimonial3", rating: 5 },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
          <img src="/images/imgs/layoutImgs/hero-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <span className="inline-block text-gold text-xs tracking-[0.25em] uppercase mb-4 font-medium">{t("aboutTitle")}</span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">{t("aboutHeroTitle")}</h1>
            <p className="mt-4 text-sm text-zinc-300 sm:text-base max-w-xl mx-auto">{t("aboutHeroDesc")}</p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-foreground text-white py-10">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.key}>
                  <div className="text-2xl md:text-3xl font-bold text-gold">{s.value}</div>
                  <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">{t(s.key)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="eyebrow mb-4">{t("aboutStory")}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{t("aboutStoryTitle")}</h2>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>{t("aboutStoryP1")}</p>
                  <p>{t("aboutStoryP2")}</p>
                  <p>{t("aboutStoryP3")}</p>
                </div>
                <Link href="/contact" className="group mt-6 inline-flex items-center gap-2 bg-gold text-black px-6 py-3 text-sm font-semibold hover:bg-gold/90 transition-colors">
                  {t("aboutCTA")} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["luxus-series-diamond.webp","luxus-gallery1.webp","luxus-series-honeycomb.webp","luxus-series-doublelayer.webp"].map((img, i) => (
                  <div key={img} className={`aspect-square overflow-hidden rounded-xl bg-muted ${i === 1 ? "mt-8" : ""} ${i === 2 ? "-mt-4" : ""} ${i === 3 ? "mt-4" : ""}`}>
                    <img src={getImageUrl(`/images/imgs/productsImgs/${img}`)} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3">{t("aboutWhy")}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("aboutWhyTitle")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.titleKey} className="card p-6 text-center hover:shadow-ambient-hover transition-all duration-300 border border-border rounded-xl bg-card">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <v.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{t(v.titleKey)}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(v.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3">{t("aboutTestimonials")}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("aboutTestimonialsTitle")}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <div key={item.nameKey} className="card p-6 border border-border rounded-xl bg-card">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">&ldquo;{t(item.textKey)}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">{t(item.nameKey).charAt(0)}</div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">{t(item.nameKey)}</div>
                      <div className="text-[11px] text-muted-foreground">{t(item.vehicleKey)}</div>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("aboutReady")}</h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8">{t("aboutReadyDesc")}</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-8 py-3 text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg">
              <MessageCircle className="h-4 w-4" /> {t("aboutChat")}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
