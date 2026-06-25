import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { IconFeatures } from "@/components/IconFeatures";
import { BrandMarquee } from "@/components/BrandMarquee";
import { ProductGrid } from "@/components/ProductCard";
import { BlogGrid } from "@/components/BlogCard";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { featuredProducts } from "@/data/products";
import { blogPosts } from "@/data/blog-posts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />

        <Reveal>
          <IconFeatures />
        </Reveal>

        {/* Featured Products */}
        <Reveal delay={100}>
          <section className="max-w-[1400px] mx-auto px-4 py-20 md:py-28">
            <ProductGrid
              products={featuredProducts}
              heading="Featured Products"
              subheading="Browse our selection of premium car accessories. Contact us on WhatsApp for pricing and custom orders."
            />
            <div className="text-center mt-12">
              <a
                href="/products"
                className="group inline-flex items-center gap-2.5 rounded-full border-2 border-[#3178c6] px-8 py-3 text-sm font-semibold text-[#3178c6] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#3178c6] hover:text-white active:scale-[0.97]"
              >
                View All Products
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                  →
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
          <section className="bg-[#f0f2f4] py-20 md:py-28">
            <div className="max-w-[1400px] mx-auto px-4">
              <div className="text-center mb-10 md:mb-12">
                <span className="eyebrow mb-4">Insights</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1f24] tracking-tight">
                  Car Interior Insights
                </h2>
                <p className="mt-3 text-sm text-[#8c9196] max-w-xl mx-auto">
                  Tips, guides, and inspiration from our team of automotive
                  enthusiasts.
                </p>
              </div>
              <BlogGrid posts={blogPosts.slice(0, 3)} />
              <div className="text-center mt-12">
                <a
                  href="/blog"
                  className="group inline-flex items-center gap-2.5 rounded-full border-2 border-[#3178c6] px-8 py-3 text-sm font-semibold text-[#3178c6] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#3178c6] hover:text-white active:scale-[0.97]"
                >
                  Read All Articles
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                    →
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
