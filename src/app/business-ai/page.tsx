import type { Metadata } from "next";
import {
  articles,
  businessAi,
  insights,
  site,
  technologyPartner,
} from "@/content/site";
import { AiScorecardForm } from "@/components/sections/AiScorecardForm";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { TechnologyPartner } from "@/components/sections/TechnologyPartner";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageGraph } from "@/lib/seo/jsonld";

const { title, description, ogImage } = businessAi.meta;

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s — NabilQureshi.com" template does not
  // append a second site name to a title that already carries one.
  title: { absolute: title },
  description,
  alternates: { canonical: "/business-ai" },
  openGraph: {
    type: "article",
    url: `${site.url}/business-ai`,
    siteName: site.name,
    locale: "en_AU",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: businessAi.coverage.image.alt,
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
 * A topic hub, not an article: the page states its own scope in the
 * "What I cover here" list, and `mentions` hands that same list to a crawler
 * as structured terms rather than leaving it to infer them from bullets.
 */
const graph = pageGraph({
  path: "/business-ai",
  name: title,
  description,
  image: ogImage,
  trail: [{ name: "Business, Technology & AI", path: "/business-ai" }],
  mentions: [
    businessAi.coverage.heading,
    ...businessAi.coverage.topics,
    technologyPartner.heading,
    ...technologyPartner.capabilities,
  ],
});

/** The card box is shared verbatim with the home Insights grid. */
const cardClass =
  "flex h-full flex-col gap-3.5 rounded-lg border border-line bg-ink-raised px-7 py-8 transition-colors hover:border-gold";

export default function BusinessAiPage() {
  const tagged = articles.filter(
    (article) => article.tag === businessAi.articles.tag,
  );
  // The grid keeps its three slots whether or not three articles exist yet.
  const emptySlots = Math.max(0, businessAi.articles.slots - tagged.length);

  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={businessAi.hero.eyebrow}
          heading={businessAi.hero.heading}
          lede={businessAi.hero.lede}
          image={{
            src: "/media/hero/hero_business-ai.webp",
            blurDataURL: "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoKAAYABUB8JbACdADbHGfLAAD+hv08RmbEf0uQSeobH9aBq5fZZfsy6tQ2bLyyTXG6TaJgAAA=",
            alt: "Dark obsidian technology matrix texture with subtle precision geometric lines",
            photographer: "Frederic Köberl",
            sourceUrl: "https://unsplash.com/photos/computer-motherboard-with-green-lights-550751827",
            objectPosition: "center 30%",
          }}
        />

        {/* 2 — What I cover */}
        <Section tone="cream">
          <div className="shell grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
            <Reveal className="flex flex-col gap-5">
              <Heading
                tone="light"
                className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]"
              >
                {businessAi.coverage.heading}
              </Heading>
              <ul className="flex flex-col gap-3 text-copy-sm text-ink-body">
                {businessAi.coverage.topics.map((topic) => (
                  <li key={topic} className="flex gap-3">
                    <span aria-hidden className="text-gold-dark">
                      —
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={80}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <MediaSlot
                src={businessAi.coverage.image.src}
                alt={businessAi.coverage.image.alt}
                label={businessAi.coverage.image.label}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] max-h-[540px] w-full"
              />
            </Reveal>
          </div>
        </Section>

        {/* 3 — Articles */}
        <Section>
          <div className="shell py-24">
            <Reveal>
              <Eyebrow className="mb-3.5">
                {businessAi.articles.eyebrow}
              </Eyebrow>
              <Heading className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {businessAi.articles.heading}
              </Heading>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tagged.map((article, index) => {
                const inner = (
                  <>
                    <span className="text-caption tracking-[0.16em] text-gold uppercase">
                      {article.tag}
                    </span>
                    <span className="font-serif text-[19px] leading-snug text-pretty text-heading">
                      {article.title}
                    </span>
                    <span className="mt-auto pt-2 text-meta text-dim">
                      {article.href ? "Read article →" : insights.pendingLabel}
                    </span>
                  </>
                );

                return (
                  <Reveal key={article.title} delay={index * 70}>
                    {article.href ? (
                      <a href={article.href} className={cardClass}>
                        {inner}
                      </a>
                    ) : (
                      <article className={cardClass}>{inner}</article>
                    )}
                  </Reveal>
                );
              })}

              {/*
                Unfilled slots. Replace each one by adding a real, published
                article tagged "Business & AI" to `articles` in
                src/content/site.ts. Do not invent headlines to fill the grid.
              */}
              {Array.from({ length: emptySlots }, (_, index) => (
                <Reveal
                  key={`slot-${index}`}
                  delay={(tagged.length + index) * 70}
                >
                  <div
                    className={`${cardClass} min-h-[176px] items-center justify-center gap-0 text-center`}
                  >
                    <span className="font-mono text-meta text-dim">
                      [ {businessAi.articles.pendingLabel} ]
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex">
              <Button href={businessAi.articles.cta.href} variant="outline">
                {businessAi.articles.cta.label}
              </Button>
            </Reveal>
          </div>
        </Section>

        {/* 4 — Technology partner */}
        <TechnologyPartner />

        {/* 5 — Free resource */}
        {/*
          The form is wired to a stub: nothing is delivered yet. See the
          TODO(launch) in AiScorecardForm before publishing this band.
        */}
        <Section tone="raised" divide="both">
          <div className="shell py-24">
            <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
              <Eyebrow>{businessAi.resource.eyebrow}</Eyebrow>
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {businessAi.resource.heading}
              </Heading>
              <p className="max-w-lg text-copy text-pretty text-muted">
                {businessAi.resource.body}
              </p>

              <AiScorecardForm />
            </Reveal>
          </div>
        </Section>

        {/* 6 + 7 — Disclaimer and CTA share one band */}
        <Section>
          <div className="shell py-24">
            <Reveal className="mx-auto max-w-[720px] text-center">
              <p className="text-caption text-pretty text-dim">
                {businessAi.disclaimer}
              </p>
            </Reveal>

            <Reveal
              delay={80}
              className="mt-16 flex flex-col items-center gap-5 text-center"
            >
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {businessAi.cta.heading}
              </Heading>
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                <Button href={businessAi.cta.primary.href} size="lg">
                  {businessAi.cta.primary.label}
                </Button>
                <Button
                  href={businessAi.cta.secondary.href}
                  variant="outline"
                  size="lg"
                >
                  {businessAi.cta.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>

      <ChatWidget />
      <SiteFooter />
      <JsonLd graph={graph} />
    </>
  );
}
