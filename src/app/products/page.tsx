"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductCard";
import { products, productCategories } from "@/data/products";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/** Category metadata: subtitle + description for SEO & UX */
const categoryMeta: Record<
  string,
  { subtitle: string; description: string }
> = {
  "Seat Covers": {
    subtitle: "Custom-Fit Seat Protection",
    description:
      "Handcrafted seat covers tailored to your exact vehicle. Choose from premium leather, breathable fabric, heated, and ventilated options — all 3D laser-fit for a factory-finish look.",
  },
  "Steering Covers": {
    subtitle: "Grip, Comfort & Style",
    description:
      "Upgrade your steering wheel with carbon fiber, suede, and racing-grade materials. Enhanced grip for all conditions, fits 38–40 cm wheels, installs in minutes.",
  },
  "Floor Mats": {
    subtitle: "All-Weather Floor Protection",
    description:
      "Custom-fit floor mats with raised edges, waterproof backing, and non-slip bases. Premium PU leather and heavy-duty options for every vehicle.",
  },
  Accessories: {
    subtitle: "Comfort & Support Upgrades",
    description:
      "Memory foam cushions, organizers, and ergonomic accessories designed to make every drive more comfortable — from daily commutes to long road trips.",
  },
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(
    categoryParam || "All",
  );

  // When "All" is active, render every category as its own section.
  // Otherwise render just the selected category.
  const visibleCategories = useMemo(() => {
    const cats = productCategories.filter((c) => c !== "All");
    return activeCategory === "All" ? cats : [activeCategory];
  }, [activeCategory]);

  const productsByCategory = useMemo(() => {
    const map: Record<string, typeof products> = {};
    for (const cat of visibleCategories) {
      map[cat] = products.filter((p) => p.category === cat);
    }
    return map;
  }, [visibleCategories]);

  const slugify = (cat: string) =>
    cat.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Products
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of premium automotive accessories. Contact us
            on WhatsApp for pricing and custom orders.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-[1400px] mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {productCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-sm",
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-secondary text-foreground hover:bg-muted",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Category Sections (H2 for SEO) */}
      <section className="max-w-[1400px] mx-auto px-4 py-8 pb-16 space-y-16">
        {visibleCategories.map((cat) => {
          const meta = categoryMeta[cat];
          const items = productsByCategory[cat] || [];
          if (items.length === 0) return null;

          return (
            <div key={cat} id={slugify(cat)} className="scroll-mt-32">
              {/* Section header with H2 */}
              <div className="mb-8">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <div>
                    {meta && (
                      <span className="eyebrow">{meta.subtitle}</span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                      {cat}
                    </h2>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </span>
                </div>
                {meta && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-2xl">
                    {meta.description}
                  </p>
                )}
              </div>

              <ProductGrid products={items} />
            </div>
          );
        })}

        {/* Empty state */}
        {visibleCategories.every(
          (cat) => (productsByCategory[cat] || []).length === 0,
        ) && (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              No products found in this category.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveCategory("All")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-white"
              >
                View All Products
              </button>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="pt-[106px] min-h-screen">
        <Suspense
          fallback={
            <div className="max-w-[1400px] mx-auto px-4 py-12">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="aspect-square shrink-0 bg-secondary animate-pulse" />
                    <div className="flex flex-col gap-2 px-4 pt-3.5 pb-4">
                      <div className="h-2.5 w-12 bg-secondary rounded animate-pulse" />
                      <div className="h-3 w-full bg-secondary rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-secondary rounded animate-pulse mt-1" />
                      <div className="h-px bg-border mt-3 mb-2.5" />
                      <div className="h-2.5 w-20 bg-gold/20 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
