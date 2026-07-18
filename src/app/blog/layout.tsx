import { BreadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog — Car Interior Tips & Buying Guides",
  description:
    "Expert tips, buying guides, and inspiration for car seat covers, steering wheel covers, floor mats, and interior care. Learn from the Yazhong team.",
  path: "/blog",
});

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
