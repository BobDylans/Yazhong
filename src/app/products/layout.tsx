import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Products — Car Seat Covers, Floor Mats & Accessories",
  description:
    "Browse our full range of premium car seat covers, steering wheel covers, floor mats, and interior accessories. Custom-fit, handcrafted, made to order.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Yazhong",
    description:
      "Premium car seat covers, steering wheel covers, floor mats, and accessories. Custom-fit for your vehicle.",
    url: "https://rimhappywoods.top/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products — Yazhong",
    description:
      "Premium car seat covers, steering wheel covers, floor mats, and accessories.",
    images: ["/og-image.png"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
      ]} />
      {children}
    </>
  );
}
