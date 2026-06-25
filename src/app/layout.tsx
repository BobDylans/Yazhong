import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Luxus Car Mats | The Gold Standard in Made to Order Luxury Car Mats",
  description:
    "Precision-made luxury car mats. 3D laser-fit, handcrafted eco-leather, maximum coverage. Made to order for your exact vehicle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
