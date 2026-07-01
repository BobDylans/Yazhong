"use client";

import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/images";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

export interface ProductCardData {
  id: string;
  title: string;
  description?: string;
  image: string;
  badge?: string;
  badgeColor?: "red" | "blue" | "green" | "gold";
  category?: string;
  series?: string;
}

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
}

function Badge({ text, color }: { text: string; color: string }) {
  const styles: Record<string, string> = {
    red: "bg-[#dc2626] text-white",
    blue: "bg-accent text-white",
    green: "bg-[#16a34a] text-white",
    gold: "bg-gradient-to-r from-[#D08C3C] to-[#b8862d] text-white",
  };
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={cn(
        "absolute top-3 start-3 z-10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-sm",
        styles[color] || styles.red,
      )}
    >
      {text}
    </motion.span>
  );
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { t } = useLocale();
  return (
    <Link href={`/products/${product.id}`} className="block group h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn("h-full", className)}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-ambient transition-all duration-500 group-hover:shadow-ambient-hover group-hover:border-gold/30">
          {/* Image */}
          <div className="relative aspect-square shrink-0 overflow-hidden bg-secondary">
          <motion.img
            src={getImageUrl(product.image)}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {product.badge && <Badge text={product.badge} color={product.badgeColor ?? "red"} />}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-1 px-4 pt-3.5 pb-4">
          {product.category && (
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gold/70">
              {product.category}
            </span>
          )}
          {product.series && (
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/60">
              {product.series}
            </span>
          )}
          <h3 className="font-sans text-sm font-semibold leading-snug text-foreground truncate">
            {product.title}
          </h3>
          {product.description && (
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground truncate">
              {product.description}
            </p>
          )}

          <div className="mt-auto pt-3">
            <div className="mb-2.5 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gold group-hover:gap-1.5 transition-all inline-flex items-center gap-1">
                {t("productViewDetails")}
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
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
  const { t } = useLocale();
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
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
