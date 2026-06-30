"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/config";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All Products", href: "/products" },
  { label: "Best Sellers", href: "/products" },
  { label: "New Arrivals", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
];

const customerServiceLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Returns & Exchanges", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "Installation Guide", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.008]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Column 1: About */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-5 tracking-tight">
              About Yazhong
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Yazhong is your trusted source for premium car seat covers,
              steering wheel covers, and custom-fit automotive accessories.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-5 tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="text-muted-foreground text-sm hover:text-white transition-all duration-300 hover:translate-x-0.5 inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-5 tracking-tight">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerServiceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="text-muted-foreground text-sm hover:text-white transition-all duration-300 hover:translate-x-0.5 inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact / WhatsApp */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-5 tracking-tight">
              Get in Touch
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Chat with us on WhatsApp for the fastest response. We typically reply within minutes.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#22c35e] hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divider-premium opacity-30" />
      </div>

      {/* Bottom */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Yazhong. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground text-[11px] uppercase tracking-wider font-medium">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Amex</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
