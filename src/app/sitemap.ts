import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Every indexable route on the site. There are no dynamic routes yet — the
 * articles in `src/content/site.ts` all carry `href: null` — so this is a
 * literal list rather than a generated one. Add entries here when article
 * pages land, or replace the list with a map over `articles.filter(a => a.href)`.
 *
 * `/contact` and `/work-with-nabil` overlap in purpose but are distinct pages
 * with distinct canonicals, so both belong here.
 */
/*
 * `image` is the route's hero photograph, emitted through the sitemap's Google
 * image extension. It is the only machine-readable statement that a given
 * photograph belongs to a given page — `og:image` addresses share cards, not
 * Google Images.
 */
const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  image: string;
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly", image: "/media/hero/hero_home.webp" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly", image: "/media/hero/hero_about.webp" },
  { path: "/property", priority: 0.9, changeFrequency: "monthly", image: "/media/hero/hero_property.webp" },
  { path: "/business-ai", priority: 0.9, changeFrequency: "monthly", image: "/media/hero/hero_business-ai.webp" },
  { path: "/wellness", priority: 0.8, changeFrequency: "monthly", image: "/media/hero/hero_wellness.webp" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly", image: "/media/hero/hero_insights.webp" },
  { path: "/speaking", priority: 0.8, changeFrequency: "monthly", image: "/media/hero/hero_speaking.webp" },
  { path: "/work-with-nabil", priority: 0.7, changeFrequency: "monthly", image: "/media/hero/hero_work-with-nabil.webp" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly", image: "/media/hero/hero_contact.webp" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  /*
   * One timestamp for the whole build. Per-route dates would be more useful,
   * but the copy has no per-page modification history to read them from, and
   * an invented `lastModified` teaches crawlers to distrust the field.
   */
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency, image }) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency,
    priority,
    images: [new URL(image, site.url).toString()],
  }));
}
