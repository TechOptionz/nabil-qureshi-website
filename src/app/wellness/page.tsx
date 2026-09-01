import type { Metadata } from "next";
import { articles, site, wellness } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { PlannerSignup } from "@/components/sections/PlannerSignup";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

const { title, description, ogImage } = wellness.meta;

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s — NabilQureshi.com" template does not
  // append a second site name to a title that already carries one.
  title: { absolute: title },
  description,
  alternates: { canonical: "/wellness" },
  openGraph: {
    type: "article",
    url: `${site.url}/wellness`,
    siteName: site.name,
    title,
    description,
    images: [
      {
        // Placeholder path — no 1200x630 artwork exists for this page yet.
        url: ogImage,
        width: 1200,
        height: 630,
        alt: wellness.coverage.image.alt,
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

const tagged = articles.filter(
  (article) => article.tag === wellness.articles.tag,
);
const pendingSlots = Math.max(0, wellness.articles.slots - tagged.length);

/** Shared by the real cards and the placeholder cards, as on the home grid. */
const cardClass =
  "flex h-full flex-col gap-3.5 rounded-lg border border-line bg-ink-raised px-7 py-8 transition-colors hover:border-gold";

export default function WellnessPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={wellness.hero.eyebrow}
          heading={wellness.hero.heading}
          lede={wellness.hero.lede}
          image={{
            src: "/media/hero/hero_wellness.webp",
            blurDataURL: "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoKAAYABUB8JZgCsADcPMi04AD7nmP9gZMNu4sNjt3EAuxyx6NogAAA",
            alt: "Dark organic fluid dark stone texture with ambient lighting",
            photographer: "Rene Böhmer",
            sourceUrl: "https://unsplash.com/photos/water-reflection-light-1518241353330",
          }}
        />

        {/* 2 — What I cover */}
        <Section tone="cream">
          <div className="shell py-24 lg:py-28">
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_minmax(320px,400px)] lg:gap-[64px]">
              <Reveal className="flex flex-col gap-8">
                <div>
                  <Eyebrow tone="light">Performance Protocol</Eyebrow>
                  <Heading
                    tone="light"
                    className="mt-3.5 text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight"
                  >
                    {wellness.coverage.heading}
                  </Heading>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {wellness.coverage.topics.map((topic, index) => (
                    <div
                      key={topic}
                      className="flex flex-col justify-between rounded-lg border border-cream-line bg-cream-deep p-6 transition-colors hover:border-gold-dark"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-caption font-medium tracking-[0.14em] text-gold-dark uppercase">
                          Pillar 0{index + 1}
                        </span>
                      </div>
                      <p className="mt-3 text-copy-sm font-medium text-ink-strong">
                        {topic}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal
                delay={80}
                className="mx-auto w-full max-w-md lg:max-w-none"
              >
                {/*
                  Unfilled image slot. Replace by setting
                  `wellness.coverage.image.src` in src/content/site.ts once the
                  commissioned health/lifestyle photograph exists. Nothing may be
                  substituted from stock or from another person's shoot.
                */}
                <MediaSlot
                  src={wellness.coverage.image.src}
                  alt={wellness.coverage.image.alt}
                  label={wellness.coverage.image.label}
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="aspect-[4/5] w-full"
                />
              </Reveal>
            </div>
          </div>
        </Section>

        {/* 3 — Articles */}
        <Section>
          <div className="shell py-24">
            <Reveal>
              <Eyebrow className="mb-3.5">{wellness.articles.eyebrow}</Eyebrow>
              <Heading className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {wellness.articles.heading}
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
                      {article.href
                        ? "Read article →"
                        : "Article — coming soon"}
                    </span>
                  </>
                );

                return (
                  <Reveal key={article.title} delay={(index % 3) * 70}>
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
                Unfilled article slots. Each must be replaced by a real piece
                added to `articles` in src/content/site.ts with the tag
                "Wellness" — never by an invented title, summary or date.
              */}
              {Array.from({ length: pendingSlots }, (_, index) => (
                <Reveal
                  key={`pending-${index}`}
                  delay={((tagged.length + index) % 3) * 70}
                >
                  <div className={cardClass}>
                    <span className="text-caption tracking-[0.16em] text-gold uppercase">
                      {wellness.articles.tag}
                    </span>
                    <span className="font-mono text-meta text-dim">
                      [ {wellness.articles.pendingLabel} ]
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              <Button
                href={wellness.articles.cta.href}
                variant="outline"
                size="lg"
              >
                {wellness.articles.cta.label}
              </Button>
            </Reveal>
          </div>
        </Section>

        {/* 4 — Free resource */}
        <Section tone="raised" divide="both">
          <div className="shell py-24">
            <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
              <Eyebrow>{wellness.resource.eyebrow}</Eyebrow>
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {wellness.resource.heading}
              </Heading>
              <p className="max-w-lg text-copy text-pretty text-muted">
                {wellness.resource.body}
              </p>
              <PlannerSignup />
            </Reveal>
          </div>
        </Section>

        {/* 5 + 6 — Disclaimer and CTA share the closing band */}
        <Section>
          <div className="shell py-24">
            <Reveal className="mx-auto max-w-[720px] text-center">
              <p className="text-caption text-pretty text-dim">
                {wellness.disclaimer}
              </p>
            </Reveal>

            <Reveal
              delay={80}
              className="mt-16 flex flex-col items-center gap-5 text-center"
            >
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {wellness.cta.heading}
              </Heading>
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                <Button href={wellness.cta.primary.href} size="lg">
                  {wellness.cta.primary.label}
                </Button>
                <Button
                  href={wellness.cta.secondary.href}
                  variant="outline"
                  size="lg"
                >
                  {wellness.cta.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>

      <ChatWidget />
      <SiteFooter />
    </>
  );
}
