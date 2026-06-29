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

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(
    categoryParam || "All",
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

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

      {/* Products Grid */}
      <section className="max-w-[1400px] mx-auto px-4 py-8 pb-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No products found in this category.
          </p>
        ) : (
          <ProductGrid products={filtered} />
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
