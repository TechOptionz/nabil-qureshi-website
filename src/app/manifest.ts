import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Next injects `<link rel="manifest">` for this file convention automatically.
 * It is here for the installed-to-homescreen case and because the name,
 * description and theme colour it declares are a second, machine-readable
 * statement of what the site is — read by app surfaces that never parse
 * JSON-LD.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.shortName}`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#14171c",
    theme_color: "#14171c",
    lang: "en-AU",
    categories: ["business", "finance", "education", "lifestyle"],
    icons: [
      { src: "/favicon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
