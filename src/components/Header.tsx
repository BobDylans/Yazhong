"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, MessageCircle, Home, Package, FileText, Info, Mail, Wrench, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Seat Covers", href: "/products?category=Seat+Covers" },
      { label: "Steering Covers", href: "/products?category=Steering+Covers" },
      { label: "Floor Mats", href: "/products?category=Floor+Mats" },
      { label: "Accessories", href: "/products?category=Accessories" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

import { whatsappUrl } from "@/lib/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || pathname !== "/"
          ? "bg-white/97 shadow-sm border-b border-border"
          : "bg-white/97 border-b border-border"
      )}
    >
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-foreground text-white text-center text-xs py-2 px-4 relative">
          <span className="font-medium">
            🚀 Contact us on WhatsApp for custom seat cover orders & free consultation
          </span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
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
                key={link.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors rounded-md",
                    pathname === link.href && "text-accent",
                    openDropdown === link.label && "text-accent"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        openDropdown === link.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full ltr:left-0 rtl:right-0 bg-white border border-border shadow-lg rounded-md py-3 min-w-[200px] animate-in fade-in duration-200">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-accent hover:bg-muted transition-colors"
                      >
                        {child.label}
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
              <span>WhatsApp</span>
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
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border px-5 py-4 flex items-center justify-between">
              <span className="font-bold text-lg text-foreground">Yazhong</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 ltr:-mr-1.5 rtl:-ml-1.5 rounded-full hover:bg-muted transition-colors" aria-label="Close">
                <X className="size-5" />
              </button>
            </div>

            <nav className="p-5 space-y-1">
              {navLinks.map((link, i) => (
                <MobileNavCard key={link.label} link={link} index={i} />
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
                  Chat on WhatsApp
                </a>
                <p className="text-center text-[11px] text-muted-foreground mt-2.5">
                  ✈️ Free shipping worldwide on orders over $200
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavIcon({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <span className={cn(
      "flex h-11 w-11 items-center justify-center rounded-xl shrink-0 transition-all duration-300",
      active
        ? "bg-accent text-white shadow-md shadow-accent/25"
        : "bg-gradient-to-br from-zinc-100 to-zinc-50 text-zinc-500 shadow-sm ring-1 ring-zinc-200/50 group-hover:shadow-md group-hover:from-accent group-hover:to-amber-600 group-hover:text-white group-hover:ring-accent/30"
    )}>
      {icon}
    </span>
  );
}

const navIcons: Record<string, React.ReactNode> = {
  "Home": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></>,
  "Products": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></>,
  "Blog": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></>,
  "About Us": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><circle cx="12" cy="8" r="3.5"/><path d="M5 20v-2a7 7 0 0 1 14 0v2"/><circle cx="12" cy="12" r="10"/></svg></>,
  "Contact": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-9.1 6.3a1 1 0 0 1-1.1 0L2 4"/></svg></>,
  "Seat Covers": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="2" x2="9" y2="22"/><line x1="15" y1="2" x2="15" y2="22"/></svg></>,
  "Steering Covers": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/><circle cx="12" cy="12" r="2"/></svg></>,
  "Floor Mats": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></>,
  "Accessories": <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]"><rect x="2" y="7" width="20" height="12" rx="2" ry="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></>,
};

function MobileNavCard({ link, index }: { link: (typeof navLinks)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const icon = navIcons[link.label] || null;
  const isActive = pathname === link.href;
  const animationDelay = `${index * 50}ms`;

  const linkContent = (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group",
        isActive
          ? "bg-accent/10 text-accent font-semibold"
          : "text-foreground hover:bg-muted"
      )}
    >
      <NavIcon icon={icon} active={isActive} />
      <span className="text-sm font-medium">{link.label}</span>
    </Link>
  );

  if (!link.children) {
    return (
      <div
        className="animate-in fade-in slide-in-from-right duration-300"
        style={{ animationDelay }}
      >
        {linkContent}
      </div>
    );
  }

  return (
    <div
      className="animate-in fade-in slide-in-from-right duration-300"
      style={{ animationDelay }}
    >
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-200 group",
            expanded ? "bg-accent/10 text-accent" : "text-foreground hover:bg-muted"
          )}
        >
          <span className="flex items-center gap-4">
            <NavIcon icon={icon} active={expanded} />
            <span className="text-sm font-medium">{link.label}</span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200 shrink-0",
              expanded && "rotate-180"
            )}
          />
        </button>
        {expanded && (
          <div className="ltr:ml-14 rtl:mr-14 mt-1 mb-1 space-y-0.5">
            {link.children.map((child) => {
              const childIcon = navIcons[child.label] || null;
              return (
                <Link
                  key={child.label}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200",
                    pathname === child.href
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <NavIcon icon={childIcon} active={pathname === child.href} />
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
