import type { Metadata } from "next";
import { articles, insightsPage, site } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { InsightsLibrary } from "@/components/sections/InsightsLibrary";
import { Newsletter } from "@/components/sections/Newsletter";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageGraph } from "@/lib/seo/jsonld";

const { title, description, ogImage } = insightsPage.meta;

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s — NabilQureshi.com" template does not
  // append a second site name to a title that already carries one.
  title: { absolute: title },
  description,
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    url: `${site.url}/insights`,
    siteName: site.name,
    locale: "en_AU",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

/*
 * `CollectionPage` rather than `Blog`: every article in `articles` still has
 * `href: null`, so there is nothing to emit as a `BlogPosting` — a
 * `blogPost`/`ItemList` of URL-less entries would be an empty promise to a
 * crawler. Swap this for a `Blog` node with real `BlogPosting` items once the
 * articles have URLs.
 *
 * The titles are still handed over as `mentions`, which states what the
 * library covers without claiming each one is a reachable document.
 */
const graph = pageGraph({
  path: "/insights",
  type: "CollectionPage",
  name: title,
  description,
  image: ogImage,
  trail: [{ name: "Insights", path: "/insights" }],
  mentions: articles.map((article) => article.title),
});

/** Shared by the three format cards; the ink fill reads on the raised band. */
const cardClass =
  "flex h-full flex-col gap-3.5 rounded-lg border border-line bg-ink px-7 py-8";

export default function InsightsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={insightsPage.hero.eyebrow}
          heading={insightsPage.hero.heading}
          lede={insightsPage.hero.lede}
          image={{
            src: "/media/hero/hero_insights.webp",
            blurDataURL: "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoKAAYABUB8JYwCdAC0+qwAAOHI3AciRmpLOLZwcaXofw24AAA=",
            alt: "Dark mood editorial desk texture with notebook and fountain pen shadow",
            photographer: "Aaron Burden",
            sourceUrl: "https://unsplash.com/photos/open-book-on-table-1457369804613",
          }}
        />

        {/* 2 + 3 — Filter bar and grid; the bar stays pinned over the grid */}
        <InsightsLibrary />

        {/* 4 — Formats */}
        <Section tone="raised" divide="both">
          <div className="shell py-24">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {insightsPage.formats.map((format, index) => (
                <Reveal key={format.name} delay={index * 70}>
                  <div className={cardClass}>
                    <Heading as="h2" className="text-[23px]">
                      {format.name}
                    </Heading>
                    <p className="text-copy-sm text-pretty text-muted">
                      {format.body}
                    </p>
                    {/* Replace placeholder counts and states once real content exists. */}
                    <span className="mt-auto pt-2 font-mono text-meta text-dim">
                      [ {format.state} ]
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* 5 — Newsletter, shared verbatim with the home page */}
        <Newsletter />
      </main>

      <ChatWidget />
      <SiteFooter />
      <JsonLd graph={graph} />
    </>
  );
}
