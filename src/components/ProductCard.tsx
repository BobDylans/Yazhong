"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { getImageUrl } from "@/lib/images";
import { motion } from "framer-motion";

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

const WHATSAPP_NUMBER = "15138009985";

function Badge({ text, color }: { text: string; color: string }) {
  const styles: Record<string, string> = {
    red: "bg-[#dc2626] text-white",
    blue: "bg-[#3178c6] text-white",
    green: "bg-[#16a34a] text-white",
    gold: "bg-gradient-to-r from-[#D08C3C] to-[#b8862d] text-white",
  };
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={cn(
        "absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full",
        styles[color] || styles.red,
      )}
    >
      {text}
    </motion.span>
  );
}

export function ProductCard({ product, className, whatsappNumber = WHATSAPP_NUMBER }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in: ${product.title}`)}`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("group h-full", className)}
    >
      <div className="h-full rounded-2xl bg-zinc-800/30 p-1.5 transition-all duration-500 group-hover:bg-zinc-800/50 gold-border-glow border border-transparent">
        <div className="flex h-full flex-col rounded-[calc(1rem-0.375rem)] bg-zinc-900/80 transition-all duration-500">
          {/* Image */}
          <div className="relative aspect-square shrink-0 overflow-hidden rounded-t-[calc(1rem-0.375rem)] bg-zinc-800">
            <motion.img
              src={getImageUrl(product.image)}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {product.badge && <Badge text={product.badge} color={product.badgeColor ?? "red"} />}
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col gap-1 px-3.5 pt-3 pb-3.5">
            {product.category && (
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gold/60">
                {product.category}
              </span>
            )}
            <h3 className="font-sans text-sm font-semibold leading-snug text-zinc-100 line-clamp-2">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="mt-auto pt-2.5">
              <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-2.5" />
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 min-h-[36px] text-xs font-semibold text-white transition-all duration-300 hover:bg-[#22c35e]"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Inquire on WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block text-gold text-xs tracking-[0.25em] uppercase mb-4 font-medium">Collection</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </motion.div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
        }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
