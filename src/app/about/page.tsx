import type { Metadata } from "next";
import Link from "next/link";
import { about, site } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { Credibility } from "@/components/sections/Credibility";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

const { title, description, ogImage } = about.meta;

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s — NabilQureshi.com" template does not
  // append a second site name to a title that already carries one.
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${site.url}/about`,
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: about.portrait.alt,
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
  Do not publish unverified affiliations. `sameAs` stays a visible placeholder
  until Nabil's real profile URLs are supplied.
*/
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.shortName,
  url: `${site.url}/about`,
  mainEntityOfPage: `${site.url}/about`,
  description,
  knowsAbout: [
    "Property and wealth creation",
    "Business technology and AI",
    "Health and wellness",
  ],
  sameAs: [
    "[PLACEHOLDER: LinkedIn profile URL]",
    "[PLACEHOLDER: Instagram profile URL]",
    "[PLACEHOLDER: YouTube channel URL]",
  ],
};

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={about.hero.eyebrow}
          heading={about.hero.heading}
          lede={about.hero.lede}
          image={{
            src: "/media/hero/hero_about.webp",
            blurDataURL: "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAADwAQCdASoKAAYABUB8JYwCdAERH9Od8IAA/ukGqPev6/pyOO9Td6AA",
            alt: "Sophisticated executive library and study interior with dark mahogany wood and warm ambient lighting",
            objectPosition: "center 40%",
          }}
        />

        {/* 2 — The story */}
        <Section tone="cream">
          <div className="shell grid items-center gap-12 py-24 band:grid-cols-[minmax(280px,420px)_1fr] band:gap-[72px] band:py-28">
            <Reveal className="relative">
              <div
                aria-hidden
                className="absolute -inset-y-4 -left-4 right-4 rounded-lg border border-gold"
              />
              <MediaSlot
                src={about.portrait.src}
                alt={about.portrait.alt}
                label={about.portrait.label}
                sizes="(max-width: 900px) 100vw, 420px"
                className="relative h-[520px] w-full"
              />
            </Reveal>

            <Reveal delay={80} className="flex flex-col gap-5">
              {about.storyParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-copy text-pretty text-ink-body"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Section>

        {/* 3 — Purpose */}
        <Section>
          <div className="shell py-24 band:py-28">
            <Reveal className="mx-auto max-w-[880px]">
              <blockquote className="border-l-2 border-gold pl-6 font-serif text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.55] text-pretty text-heading italic">
                {about.purpose.quote}
              </blockquote>
              <p className="mt-6 pl-6 text-ui font-semibold tracking-[0.06em] text-gold">
                {about.purpose.attribution}
              </p>
            </Reveal>
          </div>
        </Section>

        {/* 4 — Timeline */}
        {/*
          Replace with Nabil's verified career and business timeline.
          Do not invent dates, roles or companies.
        */}
        <Section tone="raised" divide="both">
          <div className="shell py-24 band:py-28">
            <Reveal>
              <Eyebrow className="mb-3.5">{about.timeline.eyebrow}</Eyebrow>
              <Heading className="mb-14 max-w-3xl text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {about.timeline.heading}
              </Heading>
            </Reveal>

            <ol className="relative flex flex-col gap-10 border-l border-gold/40 pl-8">
              {about.timeline.nodes.map((node, index) => (
                <Reveal
                  as="li"
                  key={index}
                  delay={index * 70}
                  className="relative flex flex-col gap-1.5"
                >
                  <span
                    aria-hidden
                    className="absolute top-[7px] -left-[calc(2rem+4.5px)] size-2 rounded-full bg-gold ring-4 ring-ink-raised"
                  />
                  <span className="text-caption font-semibold tracking-wider text-gold uppercase">
                    {node.year}
                  </span>
                  <h3 className="font-serif text-heading text-[20px] sm:text-[22px] leading-snug">
                    {node.title}
                  </h3>
                  <p className="text-copy-sm leading-relaxed text-body max-w-2xl mt-0.5">
                    {node.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>

        {/* 5 — Core Competencies & Capabilities */}
        <Section tone="ink">
          <div className="shell py-24 band:py-28">
            <Reveal>
              <Eyebrow className="mb-3.5">{about.capabilities.eyebrow}</Eyebrow>
              <Heading className="mb-14 max-w-3xl text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {about.capabilities.heading}
              </Heading>
            </Reveal>

            <div className="grid gap-8 lg:grid-cols-3">
              {about.capabilities.clusters.map((cluster, index) => (
                <Reveal
                  key={cluster.category}
                  delay={index * 90}
                  className="flex flex-col gap-6 rounded-lg border border-line bg-ink-raised p-8"
                >
                  <h3 className="font-serif text-[22px] leading-snug text-gold">
                    {cluster.category}
                  </h3>
                  <ul className="flex flex-col gap-3.5">
                    {cluster.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-3 text-copy-sm text-body">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold/60" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* 6 — What I write about */}
        <Section>
          <div className="shell py-24">
            <Reveal>
              <Eyebrow className="mb-3.5">{about.pillars.eyebrow}</Eyebrow>
              <Heading className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {about.pillars.heading}
              </Heading>
            </Reveal>

            <div className="grid gap-7 sm:grid-cols-2 band:grid-cols-3">
              {about.pillars.cards.map((card, index) => (
                <Reveal key={card.number} delay={index * 90}>
                  <Link
                    href={card.href}
                    className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-ink-raised px-8 py-9 transition-colors hover:border-gold"
                  >
                    <span className="font-serif text-[34px] text-gold">
                      {card.number}
                    </span>
                    <h3 className="font-serif text-[23px] font-normal text-heading">
                      {card.title}
                    </h3>
                    <p className="text-copy-sm text-pretty text-muted">
                      {card.body}
                    </p>
                    <span className="mt-auto pt-2 text-ui font-semibold text-gold">
                      {card.cta}{" "}
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* 6 — Credibility strip, shared verbatim with the home page */}
        <Credibility />
        {/*
          Do not publish unverified figures, logos or affiliations.
          Remove any tile without written permission.
        */}
        <Section tone="creamDeep">
          <div className="shell pb-16">
            <ul className="grid grid-cols-2 gap-7 sm:grid-cols-3 band:grid-cols-6">
              {about.logoSlots.map((label, index) => (
                <Reveal as="li" key={index} delay={index * 50}>
                  <div
                    role="img"
                    aria-label={`Placeholder: ${label}`}
                    className="flex h-20 items-center justify-center rounded-lg border border-cream-line px-3 text-center opacity-60 grayscale"
                  >
                    <span className="font-mono text-caption leading-tight text-ink-muted">
                      [ {label} ]
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* 7 — Who this is for */}
        <Section tone="raised" divide="both">
          <div className="shell py-24 band:py-28">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow>{about.audience.eyebrow}</Eyebrow>
              <Heading className="max-w-3xl text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {about.audience.heading}
              </Heading>
              <ul className="mt-3 flex max-w-3xl flex-col gap-3 text-copy-sm text-body-soft">
                {about.audience.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="text-gold">
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* 8 — CTA band */}
        <Section>
          <div className="shell flex flex-col items-center py-24 text-center band:py-28">
            <Reveal className="flex flex-col items-center gap-5">
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {about.cta.heading}
              </Heading>
              <p className="max-w-[540px] text-copy text-pretty text-muted">
                {about.cta.body}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                <Button href={about.cta.primary.href} size="lg">
                  {about.cta.primary.label}
                </Button>
                <Button
                  href={about.cta.secondary.href}
                  variant="outline"
                  size="lg"
                >
                  {about.cta.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>

      <ChatWidget />
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
