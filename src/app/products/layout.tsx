import { BreadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products — Car Seat Covers, Floor Mats & Accessories",
  description:
    "Browse our full range of premium car seat covers, steering wheel covers, floor mats, and interior accessories. Custom-fit, handcrafted, made to order.",
  path: "/products",
});

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
