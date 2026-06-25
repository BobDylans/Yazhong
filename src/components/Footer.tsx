"use client";

import { cn } from "@/lib/utils";

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
    <footer className="bg-[#1a1f24] text-white">
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
            <p className="text-[#9ca3af] text-sm leading-relaxed">
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
                    className="text-[#9ca3af] text-sm hover:text-white transition-all duration-300 hover:translate-x-0.5 inline-block">
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
                    className="text-[#9ca3af] text-sm hover:text-white transition-all duration-300 hover:translate-x-0.5 inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-5 tracking-tight">
              Newsletter
            </h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="your@email.com"
                className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all" />
              <button type="submit"
                className="rounded-lg bg-warm-gradient px-5 py-2.5 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.97]">
                Subscribe
              </button>
            </form>
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
          <p className="text-[#6b7280] text-xs">
            &copy; {new Date().getFullYear()} Yazhong. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#6b7280] text-[11px] uppercase tracking-wider font-medium">
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
