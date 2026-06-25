"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { getImageUrl } from "@/lib/images";

export interface ProductCardData {
  id: string;
  title: string;
  description?: string;
  image: string;
  badge?: string;
  badgeColor?: "red" | "blue" | "green" | "gold";
  category?: string;
}

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
  whatsappNumber?: string;
}

const WHATSAPP_NUMBER = "1234567890";

function Badge({ text, color }: { text: string; color: string }) {
  const styles: Record<string, string> = {
    red: "bg-[#dc2626] text-white",
    blue: "bg-[#3178c6] text-white",
    green: "bg-[#16a34a] text-white",
    gold: "bg-warm-gradient text-white",
  };
  return (
    <span className={cn(
      "absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full",
      styles[color] || styles.red,
    )}>
      {text}
    </span>
  );
}

export function ProductCard({ product, className, whatsappNumber = WHATSAPP_NUMBER }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in: ${product.title}`)}`;

  return (
    <div className={cn("group", className)}>
      {/* Outer shell (double-bezel) */}
      <div className="rounded-2xl bg-[#f3f4f6] p-1.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#e5e7eb]">
        {/* Inner card */}
        <div className="overflow-hidden rounded-[calc(1rem-0.375rem)] bg-white shadow-premium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-premium-hover">
          {/* Image container */}
          <div className="relative aspect-square overflow-hidden bg-[#f9fafb]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(product.image)}
              alt={product.title}
              className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.08]"
              loading="lazy"
            />
            {/* Image overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {product.badge && <Badge text={product.badge} color={product.badgeColor ?? "red"} />}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1 px-3.5 pt-3 pb-3.5">
            {product.category && (
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#8c9196]">
                {product.category}
              </span>
            )}
            <h3 className="font-sans text-sm font-semibold leading-snug text-[#1a1f24] line-clamp-2">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-xs text-[#8c9196] line-clamp-2 mt-0.5 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="mt-2.5 pt-2.5 divider-premium">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 min-h-[38px] text-xs font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22c35e] active:scale-[0.97]"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductGridProps {
  products: ProductCardData[];
  heading?: string;
  subheading?: string;
  className?: string;
}

export function ProductGrid({
  products,
  heading,
  subheading,
  className,
}: ProductGridProps) {
  return (
    <section className={cn("w-full", className)}>
      {heading && (
        <div className="text-center mb-10 md:mb-12">
          <span className="eyebrow mb-4">Collection</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a1f24] tracking-tight">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 text-sm text-[#8c9196] max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="opacity-0 translate-y-8 blur-[2px] animate-[fade-up_0.7s_cubic-bezier(0.32,0.72,0,1)_forwards]"
            style={{
              animationDelay: `${100 + i * 80}ms`,
              animationFillMode: "forwards",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
