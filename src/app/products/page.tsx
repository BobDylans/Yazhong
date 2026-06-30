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
          <p className="text-center text-muted-foreground py-12">
            No products found in this category.
          </p>
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
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">Loading products...</p>
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
