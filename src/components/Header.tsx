"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavCard } from "./HeaderMobileNav";
import { navLinks } from "./HeaderData";

import { whatsappUrl } from "@/lib/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();
  const { t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || pathname !== "/"
          ? "bg-white/97 shadow-sm border-b border-border"
          : "bg-white/97 border-b border-border"
      )}
    >
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-foreground text-white text-center text-xs py-2 px-4 relative">
          <span className="font-medium">
            {t("headerAnnouncement")}
          </span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Main Header Row */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] lg:h-[72px]">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 ltr:-ml-2 rtl:-mr-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-foreground font-bold text-xl lg:text-2xl tracking-tight shrink-0"
          >
            Yazhong
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.key}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors rounded-md",
                    pathname === link.href && "text-accent",
                    openDropdown === link.key && "text-accent"
                  )}
                >
                  {t(link.key)}
                  {link.children && (
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        openDropdown === link.key && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && openDropdown === link.key && (
                  <div className="absolute top-full ltr:left-0 rtl:right-0 bg-white border border-border shadow-lg rounded-md py-3 min-w-[200px] animate-in fade-in duration-200">
                    {link.children.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-accent hover:bg-muted transition-colors"
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 text-sm font-medium hover:bg-[#22c35e] transition-colors rounded-sm"
            >
              <MessageCircle className="size-4" />
              <span>{t("headerWhatsApp")}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation — Fullscreen Card Style */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
          {/* Panel */}
          <div className="absolute end-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border px-5 py-4 flex items-center justify-between">
              <span className="font-bold text-lg text-foreground">Yazhong</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 ltr:-mr-1.5 rtl:-ml-1.5 rounded-full hover:bg-muted transition-colors" aria-label="Close">
                <X className="size-5" />
              </button>
            </div>

            <nav className="p-5 space-y-1">
              {navLinks.map((link, i) => (
                <MobileNavCard key={link.key} link={link} index={i} />
              ))}
            </nav>

            {/* WhatsApp CTA */}
            <div className="px-5 pb-6">
              <div className="border-t border-border pt-5">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-3.5 px-5 rounded-xl text-sm font-semibold hover:bg-[#22c35e] transition-all duration-200 active:scale-[0.98] shadow-sm"
                >
                  <MessageCircle className="size-5" />
                  {t("headerChatWA")}
                </a>
                <p className="text-center text-[11px] text-muted-foreground mt-2.5">
                  {t("headerFreeShipping")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


