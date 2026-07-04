"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogGrid } from "@/components/BlogCard";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";
import { MessageCircle, Search } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { useLocale } from "@/i18n/LocaleProvider";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useLocale();

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-[106px] min-h-screen">
        {/* Page Header */}
        <section className="bg-secondary py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <span className="eyebrow mb-4 inline-flex">{t("blogInsights")}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("blogTitle")}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm">
              {t("blogDesc")}
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
                  "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full",
                  activeCategory === cat
                    ? "bg-accent text-white shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-border"
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
            <div className="text-center py-16">
              <Search className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">{t("blogNoPosts")}</p>
            </div>
          ) : (
            <BlogGrid posts={filtered} />
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-[1400px] mx-auto px-4 pb-20">
          <div className="rounded-xl bg-foreground p-8 md:p-10 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              {t("blogNeedHelp")}
            </h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-6">
              {t("blogNeedHelpDesc")}
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-semibold hover:bg-[#22c35e] transition-all duration-300 hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              {t("chatOnWA")}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
