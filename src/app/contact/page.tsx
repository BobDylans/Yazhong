"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MessageCircle, Mail, MapPin, Clock, CheckCircle, Star, ChevronRight, HelpCircle, Send } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { useLocale } from "@/i18n/LocaleProvider";

export default function ContactPage() {
  const { t, isRTL } = useLocale();

  const waBase = `https://wa.me/${WHATSAPP_NUMBER}`;
  const quickLinks = [
    { labelKey: "contactCheckFitment", href: waBase },
    { labelKey: "contactRequestQuote", href: `${waBase}?text=${encodeURIComponent("Hi! I'd like a quote for custom-fit seat covers.")}` },
    { labelKey: "contactTrackOrder", href: `${waBase}?text=${encodeURIComponent("Hi! I'd like to track my order.")}` },
    { labelKey: "contactBulkInquiry", href: `${waBase}?text=${encodeURIComponent("Hi! I'm interested in bulk ordering.")}` },
  ];

  const statsData = [
    { icon: MessageCircle, labelKey: "contactWAResp", valueKey: "contactWARespVal", sub: "Average reply time" },
    { icon: Clock, labelKey: "contactEmailResp", valueKey: "contactEmailRespVal", sub: "Weekdays" },
    { icon: CheckCircle, labelKey: "contactOrdersShipped", value: "15,000+", sub: "Worldwide" },
    { icon: Star, labelKey: "contactRating", value: "4.9/5", sub: "Based on 2,000+ reviews" },
  ];

  const faqs = [
    { qKey: "contactFAQQ1", aKey: "contactFAQA1" },
    { qKey: "contactFAQQ2", aKey: "contactFAQA2" },
    { qKey: "contactFAQQ3", aKey: "contactFAQA3" },
    { qKey: "contactFAQQ4", aKey: "contactFAQA4" },
  ];

  const Chevron = isRTL ? (
    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-open:-rotate-90 shrink-0" />
  ) : (
    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-90 shrink-0" />
  );

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden pt-20">
          <img src="/images/luxus-hero.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <span className="inline-block text-gold text-xs tracking-[0.25em] uppercase mb-4 font-medium">{t("contactTitle")}</span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">{t("contactHero")}</h1>
            <p className="mt-4 text-sm text-zinc-300 sm:text-base max-w-xl mx-auto">{t("contactHeroDesc")}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-8 py-3.5 text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <MessageCircle className="h-5 w-5" /> {t("contactChatWA")}
              </a>
              <a href="mailto:info@yazhong.com"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-500 text-zinc-300 px-8 py-3.5 text-sm font-semibold hover:border-white hover:text-white transition-all duration-300">
                <Mail className="h-4 w-4" /> {t("contactSendEmail")}
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-foreground text-white">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {statsData.map((s) => (
                <div key={s.labelKey}>
                  <s.icon className="h-5 w-5 mx-auto text-gold mb-1" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">{t(s.labelKey)}</div>
                  <div className="text-lg md:text-xl font-bold text-white mt-0.5">{s.value || (s.valueKey ? t(s.valueKey) : "")}</div>
                  <div className="text-[11px] text-zinc-400">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
              {/* Left */}
              <div className="lg:col-span-3 space-y-6">
                <div>
                  <span className="eyebrow mb-3">{t("contactMethods")}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{t("contactChoose")}</h2>
                </div>

                {/* WhatsApp Card */}
                <div className="p-6 rounded-xl border border-gold/30 bg-card shadow-ambient relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">{t("contactFastest")}</div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
                      <MessageCircle className="h-6 w-6 text-[#25D366]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{t("navContact")}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t("contactWADesc")}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a href={waBase} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-[#22c35e] transition-all duration-300">
                          <MessageCircle className="h-4 w-4" /> {t("contactStartChat")}
                        </a>
                        <a href={`${waBase}?text=${encodeURIComponent("Hi! I'd like to know if you have seat covers for my car.")}`} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-border text-foreground px-4 py-2 text-sm font-medium rounded-full hover:bg-secondary transition-all duration-300">
                          {t("contactAskFitment")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10"><Mail className="h-6 w-6 text-accent" /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t("contactEmailDesc")}</p>
                      <a href="mailto:info@yazhong.com" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">info@yazhong.com <ChevronRight className="h-3.5 w-3.5" /></a>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10"><MapPin className="h-6 w-6 text-accent" /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{t("contactLocation")}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t("contactLocationDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Quick Actions */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-border bg-card p-6 md:p-8 sticky top-28">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10"><Send className="h-6 w-6 text-gold" /></div>
                    <h3 className="font-semibold text-foreground">{t("contactQuickActions")}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t("contactChooseHelp")}</p>
                  </div>
                  <div className="space-y-2">
                    {quickLinks.map((link) => (
                      <a key={link.labelKey} href={link.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary hover:border-gold/30 transition-all duration-200 group">
                        {t(link.labelKey)} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border text-center">
                    <div className="text-xs text-muted-foreground">{t("contactResponseTime")}</div>
                    <div className="text-sm font-semibold text-gold mt-1">{t("contactWARespVal")}</div>
                    <div className="flex items-center justify-center gap-1 mt-2 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {t("contactAvailable")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3">FAQ</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("contactFAQTitle")}</h2>
            </div>
            <div className="max-w-3xl mx-auto grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.qKey} className="group rounded-xl border border-border bg-card overflow-hidden">
                  <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer text-sm font-semibold text-foreground hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3"><HelpCircle className="h-4 w-4 text-gold shrink-0" /> {t(faq.qKey)}</span>
                    {Chevron}
                  </summary>
                  <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-border pt-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(faq.aKey)}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t("contactStillQuestions")}</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">{t("contactStillDesc")}</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like help finding the right car accessories for my vehicle. My car is: [Make] [Model] [Year]")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-8 py-3.5 text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <MessageCircle className="h-5 w-5" /> {t("contactStartWAChat")}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
