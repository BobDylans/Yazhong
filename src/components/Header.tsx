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
            className="lg:hidden p-2 -ml-2 text-foreground hover:text-accent transition-colors"
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
                  <div className="absolute top-full left-0 bg-white border border-border shadow-lg rounded-md py-3 min-w-[200px] animate-in fade-in duration-200">
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
          <div className="flex items-center gap-2">
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
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 -mr-1.5 rounded-full hover:bg-muted transition-colors" aria-label="Close">
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
      "flex h-10 w-10 items-center justify-center rounded-lg shrink-0 transition-all duration-200",
      active
        ? "bg-accent/20 text-accent"
        : "bg-gradient-to-br from-secondary to-secondary/50 text-foreground/70 group-hover:from-accent/10 group-hover:to-accent/5 group-hover:text-accent"
    )}>
      {icon}
    </span>
  );
}

const navIcons: Record<string, React.ReactNode> = {
  "Home": <Home className="size-[18px]" />,
  "Products": <Package className="size-[18px]" />,
  "Blog": <FileText className="size-[18px]" />,
  "About Us": <Info className="size-[18px]" />,
  "Contact": <Mail className="size-[18px]" />,
  "Seat Covers": <Wrench className="size-[18px]" />,
  "Steering Covers": <Wrench className="size-[18px]" />,
  "Floor Mats": <Map className="size-[18px]" />,
  "Accessories": <Package className="size-[18px]" />,
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
          <div className="ml-14 mt-1 mb-1 space-y-0.5">
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
