"use client";

import { MessageCircle, Mail, ChevronRight } from "lucide-react";
import { whatsappUrl } from "@/lib/config";

const footerLinks = {
  shop: [
    { label: "Seat Covers", href: "/products?category=Seat+Covers" },
    { label: "Steering Covers", href: "/products?category=Steering+Covers" },
    { label: "Floor Mats", href: "/products?category=Floor+Mats" },
    { label: "Accessories", href: "/products?category=Accessories" },
    { label: "All Products", href: "/products" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/contact" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
            {/* Brand column — wider on desktop */}
            <div className="col-span-2 md:col-span-4">
              <div className="text-lg font-bold text-gold mb-3">Yazhong</div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                Premium custom-fit car seat covers, steering wheel covers, floor mats,
                and auto accessories. Made to order for your exact vehicle.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href="mailto:info@yazhong.com"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Shop links */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                Shop
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-all duration-200 inline-flex items-center gap-1 group"
                    >
                      <ChevronRight className="h-3 w-3 text-gold/0 -ml-4 group-hover:ml-0 group-hover:text-gold transition-all duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-all duration-200 inline-flex items-center gap-1 group"
                    >
                      <ChevronRight className="h-3 w-3 text-gold/0 -ml-4 group-hover:ml-0 group-hover:text-gold transition-all duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact / CTA */}
            <div className="col-span-2 md:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Our team typically replies within 5 minutes on WhatsApp. 
                Tell us your car model and we&apos;ll find the perfect fit.
              </p>
              <a
                href={whatsappUrl("Hi! I need help finding the right car accessories.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-medium text-white hover:bg-[#22c35e] transition-all duration-300 active:scale-[0.97]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Chat on WhatsApp
              </a>
              <div className="mt-3 text-[11px] text-zinc-600">
                Available Mon-Sat · Average response &lt; 5 min
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
            {/* Copyright */}
            <p className="text-xs text-zinc-500 order-2 sm:order-1">
              &copy; {year} Yazhong. All rights reserved.
            </p>

            {/* Payment methods — visual badges */}
            <div className="flex items-center gap-3 order-1 sm:order-2">
              {[
                { name: "Visa", color: "bg-blue-900" },
                { name: "MC", color: "bg-orange-800" },
                { name: "PP", color: "bg-blue-700" },
                { name: "AE", color: "bg-sky-800" },
              ].map((pm) => (
                <span
                  key={pm.name}
                  className={`${pm.color} text-[10px] font-bold text-white/90 px-2.5 py-1 rounded tracking-wider`}
                >
                  {pm.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
