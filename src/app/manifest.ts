import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yazhong — Premium Car Accessories",
    short_name: "Yazhong",
    description:
      "Premium custom-fit car seat covers, steering wheel covers, floor mats, and auto accessories.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#D08C3C",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["shopping", "automotive"],
  };
}
