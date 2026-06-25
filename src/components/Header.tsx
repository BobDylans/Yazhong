"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
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

const WHATSAPP_NUMBER = "1234567890";

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
          ? "bg-white/97 shadow-sm border-b border-[#efefef]"
          : "bg-white/97 border-b border-[#efefef]"
      )}
    >
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-[#191d21] text-white text-center text-xs py-2 px-4 relative">
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
            className="lg:hidden p-2 -ml-2 text-[#191d21] hover:text-[#45a0de] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-[#202626] font-bold text-xl lg:text-2xl tracking-tight shrink-0"
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
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#191d21] hover:text-[#45a0de] transition-colors rounded-md",
                    pathname === link.href && "text-[#45a0de]",
                    openDropdown === link.label && "text-[#45a0de]"
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
                  <div className="absolute top-full left-0 bg-white border border-[#efefef] shadow-lg rounded-md py-3 min-w-[200px] animate-in fade-in duration-200">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-[#191d21] hover:text-[#45a0de] hover:bg-[#f5f5f5] transition-colors"
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
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
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

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[60px] bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <MobileNavItem key={link.label} link={link} />
          ))}
          <div className="pt-4 px-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-sm font-medium rounded-sm"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-black/20 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

function MobileNavItem({ link }: { link: (typeof navLinks)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  if (!link.children) {
    return (
      <Link
        href={link.href}
        className={cn(
          "block px-3 py-3 min-h-[44px] text-[#191d21] font-medium text-sm rounded-md flex items-center",
          pathname === link.href && "text-[#45a0de]"
        )}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-3 py-3 min-h-[44px] text-[#191d21] font-medium text-sm rounded-md"
      >
        {link.label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200 shrink-0",
            expanded && "rotate-180"
          )}
        />
      </button>
      {expanded && (
        <div className="ml-4 space-y-0.5 pb-2">
          {link.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-3 py-3 min-h-[44px] text-sm text-[#808080] hover:text-[#45a0de] rounded-md flex items-center"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
