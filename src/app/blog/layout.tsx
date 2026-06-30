import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog — Car Interior Tips & Buying Guides",
  description:
    "Expert tips, buying guides, and inspiration for car seat covers, steering wheel covers, floor mats, and interior care. Learn from the Yazhong team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Yazhong",
    description:
      "Car interior tips, buying guides, and maintenance advice from Yazhong.",
    url: "https://rimhappywoods.top/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Yazhong",
    description:
      "Car interior tips, buying guides, and maintenance advice from Yazhong.",
    images: ["/og-image.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
      ]} />
      {children}
    </>
  );
}
