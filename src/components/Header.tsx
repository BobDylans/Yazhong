"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Why Luxus", href: "/why-luxus" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="bg-black text-center text-[10px] tracking-[0.2em] uppercase font-semibold py-2 px-4 border-b border-white/5">
        <span className="bg-gradient-to-r from-gold via-[#dba565] to-gold bg-clip-text text-transparent">
          Anniversary Sale — 17% Off &middot; Code: LUXUS7
        </span>
      </div>
      <div className="bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button className="lg:hidden p-2 -ml-2 text-white/70 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" className="text-white font-bold text-lg lg:text-xl tracking-widest uppercase">
            LUXUS
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors tracking-wider uppercase">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact"
            className="text-xs font-semibold tracking-widest uppercase bg-gold text-black px-5 py-2.5 hover:bg-[#b8742f] transition-colors">
            Find Your Fit
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/5">
          <nav className="p-4 space-y-3">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href}
                className="block text-sm text-white/60 hover:text-white transition-colors tracking-wider uppercase">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      </div>
    </header>
  );
}
