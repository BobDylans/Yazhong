import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getImageUrl } from "@/lib/images";
import { ArrowLeft, CheckCircle, Truck, Shield, RotateCcw } from "lucide-react";
import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { ProductSchema, BreadcrumbSchema } from "@/lib/schema";
import { ProductConfigurator } from "@/components/ProductConfigurator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rimhappywoods.top";
import { ProductDetails } from "@/components/ProductDetails";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate slugs from product IDs (use id as slug for now)
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return { title: "Product" };
  const img = product.image ? getImageUrl(product.image) : "/og-image.png";
  return {
    title: `${product.title} — Yazhong`,
    description: product.description || `${product.title} — Custom-fit for your vehicle.`,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.title} — Yazhong`,
      description: product.description || "",
      url: `${SITE_URL}/products/${slug}`,
      images: [{ url: img, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — Yazhong`,
      description: product.description || "",
      images: [img],
    },
  };
}

const features = [
  { icon: CheckCircle, text: "Custom fit for your vehicle" },
  { icon: Truck, text: "Free shipping over $200" },
  { icon: Shield, text: "Premium quality guarantee" },
  { icon: RotateCcw, text: "30-day easy returns" },
];

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in: ${product.title}. Can you tell me more about pricing and fitment for my vehicle?`
  );

  return (
    <>
      <Header />
      <ProductSchema
        name={product.title}
        description={product.description || product.title}
        image={getImageUrl(product.image)}
        sku={product.id}
        brand="Yazhong"
      />
      <BreadcrumbSchema items={[
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        ...(product.category ? [{ name: product.category, href: `/products?category=${encodeURIComponent(product.category)}` }] : []),
        { name: product.title, href: `/products/${product.id}` },
      ]} />
      <main className="pt-[106px] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-accent">Products</Link>
            <span>/</span>
            {product.category && (
              <>
                <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-accent">
                  {product.category}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
          </div>

          {/* Product main section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
              <img
                src={getImageUrl(product.image)}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <span className={`absolute top-4 start-4 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-sm text-white ${
                  product.badgeColor === "red" ? "bg-[#dc2626]" :
                  product.badgeColor === "blue" ? "bg-accent" :
                  product.badgeColor === "green" ? "bg-[#16a34a]" :
                  "bg-gradient-to-r from-gold to-[#b8862d]"
                }`}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div>
                {product.category && (
                  <span className="text-xs font-medium uppercase tracking-wider text-gold">
                    {product.category}
                  </span>
                )}
                {product.series && (
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 ml-2">
                    {product.series}
                  </span>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4 leading-tight">
                  {product.title}
                </h1>
                {product.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Feature list */}
              <div className="space-y-3 mb-8">
                {features.map((f) => (
                  <div key={f.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <f.icon className="h-4 w-4 text-gold shrink-0" />
                    {f.text}
                  </div>
                ))}
              </div>

              {/* Configurator — replaces simple CTA */}
              <div className="mt-auto pt-6 border-t border-border">
                <ProductConfigurator
                  productTitle={product.title}
                  productId={product.id}
                />
              </div>
            </div>
          </div>

          {/* Product Details — specs, features, materials */}
          <ProductDetails category={product.category} className="mb-16" />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-lg font-bold text-foreground mb-6">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/products/${rp.id}`}
                    className="group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-3 border border-border">
                      <img
                        src={getImageUrl(rp.image)}
                        alt={rp.title}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mb-0.5">{rp.category}</div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {rp.title}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
