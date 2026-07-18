import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Yazhong — Premium Car Accessories Craftsmanship",
  description:
    "Learn about Yazhong — our mission, our handcrafted eco-leather craftsmanship, and why drivers worldwide trust us for custom-fit car seat covers, steering wheel covers, and floor mats.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
