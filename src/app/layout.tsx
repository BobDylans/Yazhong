import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display, Tajawal } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from "@/lib/schema";
import { LocaleProvider } from "@/i18n/LocaleProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Display serif for h1/h2 — pairs with Poppins (sans) body for luxury contrast.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rimhappywoods.top";
const SITE_NAME = "Yazhong";
const SITE_DESCRIPTION =
  "Premium custom-fit car seat covers, steering wheel covers, floor mats, and auto accessories. Handcrafted eco-leather, 3D laser-fit, made to order for your exact vehicle.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en": `${SITE_URL}/`,
      "ar": `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },
  title: {
    default: "Yazhong — Premium Car Seat Covers & Auto Accessories",
    template: "%s — Yazhong",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "car seat covers",
    "custom fit seat covers",
    "luxury car mats",
    "steering wheel cover",
    "floor mats",
    "car accessories",
    "eco-leather seat covers",
    "automotive interior",
    "premium car accessories",
    "made to order seat covers",
  ],
  authors: [{ name: "Yazhong" }],
  creator: "Yazhong",
  publisher: "Yazhong",
  applicationName: "Yazhong",
  category: "Automotive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Yazhong — Premium Car Seat Covers & Auto Accessories",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yazhong — Premium Car Seat Covers & Auto Accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yazhong — Premium Car Seat Covers & Auto Accessories",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/icon.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${poppins.variable} ${playfair.variable} ${tajawal.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var l=localStorage.getItem("yazhong-locale");if(l==="ar"){document.documentElement.dir="rtl";document.documentElement.lang="ar"}})()`
        }} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <LocaleProvider>
          {children}
        </LocaleProvider>
        <OrganizationSchema />
      </body>
    </html>
  );
}
