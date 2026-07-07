import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { IconFeatures } from "@/components/IconFeatures";
import { BrandMarquee } from "@/components/BrandMarquee";
import { ProductGrid } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { LinkCTA } from "@/components/LinkCTA";
import { StatsBand } from "@/components/StatsBand";

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
import { FeaturedSection, FeaturedHeading, InsightsSection } from "@/components/SectionHeadings";
import { HomeReviews } from "@/components/HomeReviews";
import { featuredProducts } from "@/data/products";
import { blogPosts } from "@/data/blog-posts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <TrustBadges />
        <StatsBand />

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
              <LinkCTA href="/products" labelKey="allProducts" />
            </div>
          </FeaturedSection>

        {/* Customer Reviews */}
        <HomeReviews />

        {/* Customer Gallery + Reviews */}
        <CustomerGallery />

        <Reveal delay={150} direction="left">
          <BrandMarquee />
        </Reveal>

        {/* Blog Preview */}
        <InsightsSection>
          <BlogGrid posts={blogPosts.slice(0, 3)} />

              <div className="text-center mt-14">
                <LinkCTA href="/blog" labelKey="allArticles" />
              </div>
          </InsightsSection>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
