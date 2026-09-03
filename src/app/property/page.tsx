import type { Metadata } from "next";
import Image from "next/image";
import { articles, insights, property, site } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { PropertyChecklistForm } from "@/components/sections/PropertyChecklistForm";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageGraph } from "@/lib/seo/jsonld";

const { title, description, ogImage } = property.meta;

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s — NabilQureshi.com" template does not
  // append a second site name to a title that already carries one.
  title: { absolute: title },
  description,
  alternates: { canonical: "/property" },
  openGraph: {
    type: "article",
    url: `${site.url}/property`,
    siteName: site.name,
    locale: "en_AU",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: property.coverage.image.alt,
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
  path: "/property",
  name: title,
  description,
  image: ogImage,
  trail: [{ name: "Property & Wealth", path: "/property" }],
  mentions: [property.coverage.heading, ...property.coverage.topics],
});

/** The card box is shared verbatim with the home Insights grid. */
const cardClass =
  "flex h-full flex-col gap-3.5 rounded-lg border border-line bg-ink-raised px-7 py-8 transition-colors hover:border-gold";

export default function PropertyPage() {
  const tagged = articles.filter(
    (article) => article.tag === property.articles.tag,
  );
  // The grid keeps its three slots whether or not three articles exist yet.
  const emptySlots = Math.max(0, property.articles.slots - tagged.length);

  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={property.hero.eyebrow}
          heading={property.hero.heading}
          lede={property.hero.lede}
          image={{
            src: "/media/hero/hero_property.webp",
            blurDataURL: "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAQCdASoKAAYABUB8JZQCsAEDe9eerwAA/qFqTvJCALKbpG22JchiU+j55ZpvOAA=",
            alt: "Dark minimalist modern architectural building facade with geometric shadow lines",
            photographer: "Renders by Renders",
            sourceUrl: "https://unsplash.com/photos/black-and-brown-concrete-building-1600585154340-be6161a56a0c",
            objectPosition: "center 40%",
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
                {property.coverage.heading}
              </Heading>
              <ul className="flex flex-col gap-3 text-copy-sm text-ink-body">
                {property.coverage.topics.map((topic) => (
                  <li key={topic} className="flex gap-3">
                    <span aria-hidden className="text-gold-dark">
                      —
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/*
              No photography has been supplied. Replace `coverage.image.src` in
              src/content/site.ts with a real property or development
              photograph, cropped 4:5, and the slot fills itself.
            */}
            <Reveal
              delay={80}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <MediaSlot
                src={property.coverage.image.src}
                alt={property.coverage.image.alt}
                label={property.coverage.image.label}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] w-full"
              />
            </Reveal>
          </div>
        </Section>

        {/* 3 — QLand Property Practice Spotlight */}
        <Section tone="raised" divide="both">
          <div className="shell py-24 band:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <Reveal className="flex flex-col gap-6">
                <Eyebrow>{property.qland.eyebrow}</Eyebrow>
                <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                  {property.qland.heading}
                </Heading>
                <p className="text-copy leading-relaxed text-body-soft">
                  {property.qland.body}
                </p>
                <div className="grid gap-6 sm:grid-cols-3 pt-2">
                  {property.qland.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1 border-l-2 border-gold pl-4">
                      <span className="font-serif text-3xl font-normal text-gold">{stat.value}</span>
                      <span className="text-caption text-dim">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={80} className="flex flex-col gap-4">
                {property.qland.capabilities.map((cap, idx) => (
                  <div
                    key={cap.title}
                    className="flex flex-col gap-2 rounded-xl border border-line bg-ink p-6 transition-colors hover:border-gold/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-caption font-bold text-gold">
                        0{idx + 1}
                      </span>
                      <h3 className="font-serif text-lg font-normal text-wordmark">
                        {cap.title}
                      </h3>
                    </div>
                    <p className="text-copy-sm leading-relaxed text-body pl-10">
                      {cap.body}
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </Section>

        {/* 4 — 3 Latest Property Video Masterclasses */}
        <Section tone="ink">
          <div className="shell py-24 band:py-28">
            <Reveal className="flex flex-col gap-4 mb-14">
              <Eyebrow>{property.videos.eyebrow}</Eyebrow>
              <Heading className="max-w-3xl text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {property.videos.heading}
              </Heading>
              <p className="max-w-2xl text-copy text-body-soft">
                {property.videos.lede}
              </p>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {property.videos.items.map((vid, index) => (
                <Reveal
                  key={vid.id}
                  delay={index * 90}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-raised shadow-xl transition-all duration-300 hover:border-gold/60 hover:-translate-y-1"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-ink-deep">
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-gold shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink-deep">
                        <span className="ml-1 text-lg font-bold">▶</span>
                      </div>
                    </div>

                    {/* Tags & Duration */}
                    <div className="absolute top-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-[12px] font-semibold text-gold backdrop-blur-sm border border-gold/30">
                      {vid.tag}
                    </div>
                    <div className="absolute bottom-3 right-4 rounded-md bg-ink-deep/90 px-2 py-0.5 font-mono text-[12px] text-wordmark">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-serif text-[20px] font-normal leading-snug text-wordmark transition-colors group-hover:text-gold">
                        {vid.title}
                      </h3>
                      <p className="text-copy-sm leading-relaxed text-body">
                        {vid.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-caption font-semibold text-gold">
                      <span>Watch Breakdown</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* 5 — Articles */}
        <Section tone="cream" divide="top">
          <div className="shell py-24">
            <Reveal>
              <Eyebrow tone="light" className="mb-3.5">{property.articles.eyebrow}</Eyebrow>
              <Heading tone="light" className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {property.articles.heading}
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
                Unfilled slots. Each one is waiting on a written and published
                article tagged "Property"; do not fabricate a headline, a date
                or a case study to fill it.
              */}
              {Array.from({ length: emptySlots }, (_, index) => (
                <Reveal
                  key={`slot-${index}`}
                  delay={(tagged.length + index) * 70}
                >
                  <div
                    className={`${cardClass} items-center justify-center gap-0 text-center`}
                  >
                    <span className="font-mono text-meta text-dim">
                      [ {property.articles.pendingLabel} ]
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex">
              <Button href={property.articles.cta.href} variant="outline">
                {property.articles.cta.label}
              </Button>
            </Reveal>
          </div>
        </Section>

        {/* 4 — Free resource */}
        <Section tone="raised" divide="both">
          <div className="shell py-24">
            <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
              <Eyebrow>{property.resource.eyebrow}</Eyebrow>
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {property.resource.heading}
              </Heading>
              <p className="max-w-lg text-copy text-pretty text-muted">
                {property.resource.body}
              </p>
              <PropertyChecklistForm />
            </Reveal>
          </div>
        </Section>

        {/* 5 + 6 — Disclaimer and CTA share one band */}
        <Section>
          <div className="shell py-24">
            <Reveal className="mx-auto max-w-[720px] text-center">
              <p className="text-caption text-pretty text-dim">
                {property.disclaimer}
              </p>
            </Reveal>

            <Reveal
              delay={80}
              className="mt-16 flex flex-col items-center gap-5 text-center"
            >
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {property.cta.heading}
              </Heading>
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                <Button href={property.cta.primary.href} size="lg">
                  {property.cta.primary.label}
                </Button>
                <Button
                  href={property.cta.secondary.href}
                  variant="outline"
                  size="lg"
                >
                  {property.cta.secondary.label}
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
