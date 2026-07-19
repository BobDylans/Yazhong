"use client";

import { MessageCircle, Mail, ChevronRight } from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t, isRTL } = useLocale();
  const year = new Date().getFullYear();

  const shopLinks = [
    { key: "Seat Covers", href: "/products?category=Seat+Covers" },
    { key: "Steering Covers", href: "/products?category=Steering+Covers" },
    { key: "Floor Mats", href: "/products?category=Floor+Mats" },
    { key: "Accessories", href: "/products?category=Accessories" },
    { key: "all", href: "/products" },
  ];

  const supportLinks = [
    { key: "Contact Us", href: "/contact" },
    { key: "About Us", href: "/about" },
    { key: "Blog", href: "/blog" },
    { key: "FAQ", href: "/contact" },
  ];

  const linkLabel = (key: string): string => {
    const map: Record<string, string> = {
      "Seat Covers": t("navSeatCovers"),
      "Steering Covers": t("navSteeringCovers"),
      "Floor Mats": t("navFloorMats"),
      "Accessories": t("navAccessories"),
      "all": t("footerAllProducts"),
      "Contact Us": t("footerContact"),
      "About Us": t("footerAboutLink"),
      "Blog": t("footerBlog"),
      "FAQ": t("footerFAQ"),
    };
    return map[key] || key;
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4">
              <div className="text-lg font-bold text-gold mb-3">{t("siteName")}</div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                {t("footerAbout")}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
                  aria-label="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href="mailto:info@yazhong.com"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                  aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Shop */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">{t("footerShop")}</h3>
              <ul className="space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.key}>
                    <a href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-all duration-200 inline-flex items-center gap-1 group">
                      <ChevronRight className={cn(
                        "h-3 w-3 text-gold/0 group-hover:text-gold transition-all duration-200",
                        isRTL ? "-mr-4 group-hover:mr-0" : "-ml-4 group-hover:ml-0"
                      )} />
                      {linkLabel(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">{t("footerSupport")}</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.key}>
                    <a href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-all duration-200 inline-flex items-center gap-1 group">
                      <ChevronRight className={cn(
                        "h-3 w-3 text-gold/0 group-hover:text-gold transition-all duration-200",
                        isRTL ? "-mr-4 group-hover:mr-0" : "-ml-4 group-hover:ml-0"
                      )} />
                      {linkLabel(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">{t("footerNeedHelp")}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">{t("footerNeedHelpDesc")}</p>
              <a href={whatsappUrl(t("waContactMessage"))} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-medium text-white hover:bg-[#22c35e] transition-all duration-300 active:scale-[0.97]">
                <MessageCircle className="h-4 w-4 shrink-0" />
                {t("footerChat")}
              </a>
              <div className="mt-3 text-[11px] text-zinc-600">{t("footerAvailable")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
            <p className="text-xs text-zinc-500 order-2 sm:order-1">
              &copy; {year} {t("siteName")}. {t("footerCopyright")}
            </p>
            <div className="flex items-center gap-2 order-1 sm:order-2" dir="ltr" aria-label="Accepted payment methods">
              {/* Visa */}
              <span className="inline-flex items-center justify-center h-7 px-2 rounded bg-white">
                <svg viewBox="0 0 48 16" className="h-3.5 w-auto" role="img" aria-label="Visa">
                  <path fill="#1434CB" d="M0 0h48v16H0z"/>
                  <text x="24" y="12" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="10" fill="#fff" letterSpacing="0.5">VISA</text>
                </svg>
              </span>
              {/* Mastercard */}
              <span className="inline-flex items-center justify-center h-7 px-2 rounded bg-white" aria-label="Mastercard">
                <svg viewBox="0 0 32 24" className="h-4 w-auto">
                  <circle cx="13" cy="12" r="9" fill="#EB001B"/>
                  <circle cx="20" cy="12" r="9" fill="#F79E1B" fillOpacity="0.9"/>
                </svg>
              </span>
              {/* PayPal */}
              <span className="inline-flex items-center justify-center h-7 px-2 rounded bg-white" aria-label="PayPal">
                <svg viewBox="0 0 60 16" className="h-3.5 w-auto">
                  <text x="0" y="13" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="11" fill="#003087">Pay</text>
                  <text x="20" y="13" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="11" fill="#009CDE">Pal</text>
                </svg>
              </span>
              {/* AmEx */}
              <span className="inline-flex items-center justify-center h-7 px-2 rounded bg-white" aria-label="American Express">
                <svg viewBox="0 0 40 16" className="h-3.5 w-auto">
                  <rect width="40" height="16" fill="#1F72CD"/>
                  <text x="20" y="10" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="5.5" fill="#fff" letterSpacing="0.3">AMEX</text>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
