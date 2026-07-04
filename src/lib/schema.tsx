/**
 * JSON-LD structured data generators for SEO.
 * Outputs <script type="application/ld+json"> snippets.
 * Usage: drop <Script id="..." type="application/ld+json">{schema}</Script> in a layout or page.
 */
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rimhappywoods.top";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface ProductSchema {
  name: string;
  description: string;
  image: string;
  sku?: string;
  mpn?: string;
  brand?: string;
  price?: string;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  review?: { rating: string; count: number };
}

export interface ArticleSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  category?: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/*  React components                                                  */
/* ------------------------------------------------------------------ */

/** Organization / LocalBusiness — drop in root layout */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Yazhong",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description:
      "Premium custom-fit car seat covers, steering wheel covers, floor mats, and auto accessories.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-513-800-9985",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [
      "https://wa.me/15138009985",
      SITE_URL,
    ],
  };

  return (
    <Script
      id="schema-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Product — drop on product detail pages */
export function ProductSchema({
  name,
  description,
  image,
  sku,
  mpn,
  brand,
  price,
  priceCurrency = "USD",
  availability = "InStock",
  review,
}: ProductSchema) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku: sku || mpn || name,
    mpn: mpn || sku || name,
    brand: {
      "@type": "Brand",
      name: brand || "Yazhong",
    },
  };

  if (price) {
    schema.offers = {
      "@type": "Offer",
      price,
      priceCurrency,
      availability: `https://schema.org/${availability}`,
      url: `${SITE_URL}/products/${sku || ""}`,
    };
  }

  if (review && review.count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: review.rating,
      reviewCount: review.count,
    };
  }

  return (
    <Script
      id="schema-product"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Article — drop on blog detail pages */
export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  category,
}: ArticleSchema) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Yazhong",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_URL,
    },
  };

  if (category) {
    schema.articleSection = category;
  }

  return (
    <Script
      id="schema-article"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** BreadcrumbList — drop on layouts or pages */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQPage — drop on contact/FAQ pages */
export function FaqPageSchema({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Script
      id="schema-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
