import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { IconFeatures } from "@/components/IconFeatures";
import { BrandMarquee } from "@/components/BrandMarquee";
import { ProductGrid } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "Yazhong — Premium Car Seat Covers & Auto Accessories",
  description:
    "Shop premium custom-fit car seat covers, steering wheel covers, floor mats, and auto accessories. Handcrafted eco-leather, made to order for your exact vehicle.",
  alternates: { canonical: "/" },
};
import { BlogGrid } from "@/components/BlogCard";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { featuredProducts, products } from "@/data/products";
import { blogPosts } from "@/data/blog-posts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <TrustBadges />

        <Reveal>
          <IconFeatures />
        </Reveal>

        {/* Featured Products — symmetrical grid */}
        <Reveal delay={100}>
          <section className="max-w-[1400px] mx-auto px-4 py-24 md:py-32">
            <ProductGrid
              products={featuredProducts}
              heading="Featured Products"
              subheading="Browse our selection of premium car accessories. Contact us on WhatsApp for pricing and custom orders."
            />
            <div className="text-center mt-14">
              <a
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground hover:text-white active:scale-[0.97] shadow-ambient hover:shadow-ambient-hover"
              >
                View All Products
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </section>
        </Reveal>

        <Reveal delay={150}>
          <BrandMarquee />
        </Reveal>

        {/* Blog Preview */}
        <Reveal delay={100}>
          <section className="bg-secondary py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-4">
              <div className="text-center mb-14 md:mb-16">
                <span className="eyebrow mb-4">Insights</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Car Interior Insights
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
                  Tips, guides, and inspiration from our team of automotive
                  enthusiasts.
                </p>
              </div>
              <BlogGrid posts={blogPosts.slice(0, 3)} />

              <div className="text-center mt-14">
                <a
                  href="/blog"
                  className="group inline-flex items-center gap-3 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground hover:text-white active:scale-[0.97] shadow-ambient hover:shadow-ambient-hover"
                >
                  Read All Articles
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
