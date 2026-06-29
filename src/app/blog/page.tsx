"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogGrid } from "@/components/BlogCard";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-[106px] min-h-screen">
        {/* Page Header */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Car Interior Insights
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and inspiration for keeping your car&apos;s interior
              looking and feeling its best.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-[1400px] mx-auto px-4 pt-8 pb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-sm",
                  activeCategory === cat
                    ? "bg-accent text-white"
                    : "bg-secondary text-foreground hover:bg-border"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-[1400px] mx-auto px-4 py-8 pb-16">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No posts found in this category.
            </p>
          ) : (
            <BlogGrid posts={filtered} />
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
