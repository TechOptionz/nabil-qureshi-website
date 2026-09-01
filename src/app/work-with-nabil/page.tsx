import type { Metadata } from "next";
import Link from "next/link";
import { site, workWithNabil } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

const { title, description, ogImage } = workWithNabil.meta;

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s — NabilQureshi.com" template does not
  // append a second site name to a title that already carries one.
  title: { absolute: title },
  description,
  alternates: { canonical: "/work-with-nabil" },
  openGraph: {
    type: "website",
    url: `${site.url}/work-with-nabil`,
    siteName: site.name,
    title,
    description,
    images: [
      {
        // No artwork exists yet — drop a 1200x630 file at this path.
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${site.shortName} — ${workWithNabil.hero.eyebrow}`,
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

export default function WorkWithNabilPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={workWithNabil.hero.eyebrow}
          heading={workWithNabil.hero.heading}
          lede={workWithNabil.hero.lede}
          primaryCta={workWithNabil.hero.primary}
          image={{
            src: "/media/hero/hero_work-with-nabil.webp",
            blurDataURL: "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABQAQCdASoKAAYABUB8JZQAAkuAAP69yRPQ0PT9AnZCBE3hsbETrO35YAAAAA==",
            alt: "Dark minimalist executive architectural interior with subtle glass reflections",
            photographer: "Sora Shimazaki",
            sourceUrl: "https://unsplash.com/photos/empty-white-room-1497366216548",
          }}
        />

        {/* 2 — Pathways */}
        {/* Nabil must confirm which services he actually offers before launch. Do not describe or imply a service that has not been agreed. Delete any card that is not confirmed. */}
        <Section tone="cream">
          <div className="shell py-24 lg:py-28">
            <Reveal className="mb-14 flex flex-col gap-3.5">
              <Eyebrow tone="light">{workWithNabil.hero.eyebrow}</Eyebrow>
              <Heading tone="light" className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                Engagement Tiers & Advisory Models
              </Heading>
            </Reveal>

            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {workWithNabil.pathways.cards.map((card, index) => (
                <Reveal as="li" key={card.number} delay={index * 90}>
                  <Link
                    href={card.href}
                    className="group relative flex h-full flex-col gap-5 rounded-lg border border-cream-line bg-cream-deep p-8 transition-all hover:border-gold-dark hover:shadow-lg"
                  >
                    <div className="flex items-baseline justify-between border-b border-cream-line pb-4">
                      <span className="font-serif text-[34px] text-gold-dark">
                        {card.number}
                      </span>
                      <span className="text-caption font-medium tracking-[0.14em] text-gold-dark uppercase">
                        Tier 0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-[24px] leading-snug text-ink-text">
                      {card.title}
                    </h3>

                    <p className="text-copy-sm text-pretty text-ink-body">
                      {card.body}
                    </p>

                    <div className="flex flex-col gap-2.5 border-t border-cream-line pt-4">
                      {workWithNabil.pathways.pending.map((line) => (
                        <div key={line} className="flex items-center gap-2.5">
                          <span aria-hidden className="size-1.5 rounded-full bg-gold-dark/60" />
                          <span className="font-mono text-meta text-ink-muted">
                            [ {line} ]
                          </span>
                        </div>
                      ))}
                    </div>

                    <span className="mt-auto flex items-center justify-between border-t border-cream-line pt-4 text-ui font-semibold text-gold-dark">
                      <span>{card.cta}</span>
                      <span className="inline-block transition-transform group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* 3 — How it works */}
        <Section>
          <div className="shell py-24">
            <Reveal>
              <Heading className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {workWithNabil.process.heading}
              </Heading>
            </Reveal>

            <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {workWithNabil.process.steps.map((step, index) => (
                <Reveal as="li" key={step.number} delay={index * 70}>
                  <div className="flex h-full flex-col gap-3 border-t border-gold pt-6">
                    <span className="font-serif text-[34px] text-gold">
                      {step.number}
                    </span>
                    <span className="font-serif text-[23px] leading-snug text-pretty text-heading">
                      {step.title}
                    </span>
                    <p className="text-copy-sm text-pretty text-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>

        {/* 4 — Who this suits */}
        {/*
          Both columns ship. Naming what this is not earns more trust than a
          longer list of services — do not trim the right-hand column.
        */}
        <Section tone="raised" divide="both">
          <div className="shell grid gap-12 py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
            {workWithNabil.suitability.map((column, index) => (
              <Reveal
                key={column.heading}
                delay={index * 80}
                className="flex flex-col gap-5"
              >
                <Heading as="h3" className="text-[23px] leading-snug">
                  {column.heading}
                </Heading>
                <ul className="flex flex-col gap-3 text-copy-sm text-body-soft">
                  {column.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="text-gold">
                        —
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 5 — What to include */}
        <Section>
          <div className="shell py-24">
            <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {workWithNabil.brief.heading}
              </Heading>
              <p className="text-copy text-pretty text-muted">
                {workWithNabil.brief.body}
              </p>

              {/*
                Centred band, but the dash rules stay on a common left edge: a
                centred list of ragged rules reads as three stray marks.
              */}
              <ul className="mt-3 flex w-fit flex-col gap-3 text-left text-copy-sm text-body-soft">
                {workWithNabil.brief.prompts.map((prompt) => (
                  <li key={prompt} className="flex gap-3">
                    <span aria-hidden className="text-gold">
                      —
                    </span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* 6 — Disclaimer and CTA share the closing band */}
        <Section tone="raised" divide="top">
          <div className="shell py-24">
            <Reveal className="mx-auto max-w-[720px] text-center">
              <p className="text-caption text-pretty text-dim">
                {workWithNabil.closing.disclaimer}
              </p>
            </Reveal>

            <Reveal
              delay={80}
              className="mt-16 flex flex-col items-center gap-5 text-center"
            >
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {workWithNabil.closing.heading}
              </Heading>
              <div className="mt-3 flex">
                <Button href={workWithNabil.closing.primary.href} size="lg">
                  {workWithNabil.closing.primary.label}
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
