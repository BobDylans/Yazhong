import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Yazhong — Premium Car Accessories Craftsmanship",
  description:
    "Learn about Yazhong — our mission, our handcrafted eco-leather craftsmanship, and why drivers worldwide trust us for custom-fit car seat covers, steering wheel covers, and floor mats.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Yazhong — Premium Car Accessories Craftsmanship",
    description:
      "Handcrafted eco-leather, custom-fit for your exact vehicle. Discover the Yazhong story and our commitment to quality.",
    url: "/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Yazhong" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
