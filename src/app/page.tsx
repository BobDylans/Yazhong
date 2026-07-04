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
  openGraph: {
    title: "Yazhong — Premium Car Seat Covers & Auto Accessories",
    description:
      "Shop premium custom-fit car seat covers, steering wheel covers, floor mats, and auto accessories.",
    url: "https://rimhappywoods.top",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yazhong — Premium Car Seat Covers & Auto Accessories",
    description:
      "Shop premium custom-fit car seat covers, steering wheel covers, floor mats, and auto accessories.",
    images: ["/og-image.png"],
  },
};
import { BlogGrid } from "@/components/BlogCard";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/HowItWorks";
import { CustomerGallery } from "@/components/CustomerGallery";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FeaturedSection, FeaturedHeading, InsightsSection } from "@/components/SectionHeadings";
import { StatsSection } from "@/components/StatsSection";
import { testimonials } from "@/data/testimonials";
import { featuredProducts, products } from "@/data/products";
import { blogPosts } from "@/data/blog-posts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <TrustBadges />
        <StatsSection />

        {/* How It Works */}
        <HowItWorks />

        <Reveal>
          <IconFeatures />
        </Reveal>

        {/* Chapter break — quiet divider before the featured collection */}
        <div className="max-w-[1400px] mx-auto px-4 pt-16 md:pt-24">
          <div className="divider-premium" />
        </div>

        {/* Featured Products — symmetrical grid */}
        <FeaturedSection>
          <FeaturedHeading />
          <ProductGrid
            products={featuredProducts}
            heading=""
            subheading=""
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
          </FeaturedSection>

        {/* Customer Reviews */}
        <ReviewsSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 100} direction="up">
                <div className="p-6 border border-border rounded-xl bg-card shadow-ambient h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} className={si < t.rating ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 fill-none text-border"} viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">{t.name}</div>
                      <div className="text-[11px] text-muted-foreground">{t.vehicle}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="text-center mt-10">
              <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-foreground hover:text-white transition-all duration-300"
              >
                Read More Reviews
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            </div>
          </Reveal>
        </ReviewsSection>

        {/* Customer Gallery + Reviews */}
        <CustomerGallery />

        <Reveal delay={150} direction="left">
          <BrandMarquee />
        </Reveal>

        {/* Blog Preview */}
        <InsightsSection>
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
          </InsightsSection>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
