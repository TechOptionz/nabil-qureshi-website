import type { Metadata } from "next";
import { site, speakingPage } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";
import { CopyBioButton } from "./CopyBioButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { abs, pageGraph } from "@/lib/seo/jsonld";

const { title, description, ogImage } = speakingPage.meta;

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s — NabilQureshi.com" template does not
  // append a second site name to a title that already carries one.
  title: { absolute: title },
  description,
  alternates: { canonical: "/speaking" },
  openGraph: {
    type: "profile",
    url: `${site.url}/speaking`,
    siteName: site.name,
    locale: "en_AU",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: speakingPage.showreel.media.alt,
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
 * The five talk titles are the page's most citable asset — they are what an
 * event organiser or a podcast researcher actually searches for. They render
 * as `<span>`s inside cards, so an `ItemList` is what makes them legible as a
 * set rather than as loose text.
 *
 * The formats band is left out: every length and audience figure under it is
 * still a visible PLACEHOLDER, and schema must not fill a gap the page shows.
 */
const talksJsonLd = {
  "@type": "ItemList",
  "@id": `${abs("/speaking")}#talks`,
  name: speakingPage.showreel.heading,
  itemListOrder: "ItemListOrderAscending",
  numberOfItems: speakingPage.topics.items.length,
  itemListElement: speakingPage.topics.items.map((topic, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: topic.title,
  })),
};

const graph = pageGraph({
  path: "/speaking",
  type: "ProfilePage",
  name: title,
  description,
  image: ogImage,
  trail: [{ name: "Speaking & Media", path: "/speaking" }],
  mentions: speakingPage.topics.items.map((topic) => topic.title),
  extra: [talksJsonLd],
});

/** The card box is shared verbatim with the About pillar grid. */
const cardClass =
  "flex h-full flex-col gap-4 rounded-lg border border-line bg-ink-raised px-8 py-9";

export default function SpeakingPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={speakingPage.hero.eyebrow}
          heading={speakingPage.hero.heading}
          lede={speakingPage.hero.lede}
          primaryCta={speakingPage.hero.cta}
          image={{
            src: "/media/hero/hero_speaking.webp",
            blurDataURL: "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoKAAYABUB8JZwAAxeTnpBgAP7qJ+hYNspAWmgZfAkqJkCAAAA=",
            alt: "Dramatic executive keynote auditorium and speaker stage with architectural spotlighting",
            objectPosition: "center 45%",
          }}
        />

        {/* 2 — Showreel */}
        <Section tone="cream">
          <div className="shell grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
            {/*
              No footage has been supplied. Replace `showreel.media.src` in
              src/content/site.ts with a real 16:9 showreel still or poster
              frame and the slot fills itself.
            */}
            <Reveal>
              <MediaSlot
                kind="video"
                src={speakingPage.showreel.media.src}
                alt={speakingPage.showreel.media.alt}
                label={speakingPage.showreel.media.label}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[16/9] w-full border-transparent bg-ink-raised"
              />
            </Reveal>

            <Reveal delay={80} className="flex flex-col gap-5">
              <Heading
                tone="light"
                className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]"
              >
                {speakingPage.showreel.heading}
              </Heading>
              <ul className="flex flex-col gap-3 text-copy-sm text-ink-body">
                {speakingPage.showreel.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="text-gold-dark">
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* 3 — Talk topics */}
        {/*
          The five titles are verified copy. The one-line descriptions have not
          been written — do not fabricate one to fill a card.
        */}
        <Section>
          <div className="shell py-24">
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {speakingPage.topics.items.map((topic, index) => (
                <Reveal as="li" key={topic.number} delay={index * 70}>
                  <article className={cardClass}>
                    <span className="font-serif text-[34px] text-gold">
                      {topic.number}
                    </span>
                    <span className="font-serif text-[23px] leading-snug text-pretty text-heading">
                      {topic.title}
                    </span>
                    <span className="mt-auto pt-2 font-mono text-meta text-dim">
                      [ {speakingPage.topics.pendingDescription} ]
                    </span>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* 4 — Formats */}
        {/*
          Running times and audience sizes are unconfirmed. Replace both lines
          per format in src/content/site.ts before launch.
        */}
        <Section tone="raised" divide="both">
          <div className="shell py-24 lg:py-28">
            <Reveal className="mb-14 flex flex-col gap-3.5">
              <Eyebrow>Engagement Formats</Eyebrow>
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                Keynote & Workshop Structures
              </Heading>
            </Reveal>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {speakingPage.formats.map((format, index) => (
                <Reveal as="li" key={format.name} delay={index * 70}>
                  <div className="flex h-full flex-col justify-between rounded-lg border border-line bg-ink p-7 transition-all hover:border-gold">
                    <div className="flex flex-col gap-3">
                      <span className="text-caption font-medium tracking-[0.14em] text-gold uppercase">
                        Format 0{index + 1}
                      </span>
                      <h3 className="font-serif text-[22px] leading-snug text-heading">
                        {format.name}
                      </h3>
                    </div>

                    <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4">
                      <div className="flex items-center justify-between text-meta">
                        <span className="text-dim">Duration</span>
                        <span className="font-mono text-dim">[ {format.length} ]</span>
                      </div>
                      <div className="flex items-center justify-between text-meta">
                        <span className="text-dim">Audience</span>
                        <span className="font-mono text-dim">[ {format.audience} ]</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* 5 — Past appearances */}
        {/* Do not publish any logo or appearance without written permission and verification. Delete this section entirely at launch if none are confirmed. */}
        <Section tone="creamDeep">
          <div className="shell py-24">
            <Reveal>
              <Heading
                tone="light"
                className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]"
              >
                {speakingPage.appearances.heading}
              </Heading>
            </Reveal>

            <ul className="grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-6">
              {speakingPage.appearances.logoSlots.map((label, index) => (
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

            <ul className="mt-12 flex flex-col gap-4 border-t border-cream-line pt-10">
              {speakingPage.appearances.entries.map((entry, index) => (
                <Reveal as="li" key={index} delay={index * 70}>
                  <span className="font-mono text-meta text-ink-muted">
                    {entry}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* 6 — Press kit */}
        <Section>
          <div className="shell grid items-start gap-12 py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow>Media & Press</Eyebrow>
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {speakingPage.pressKit.heading}
              </Heading>
              <p className="text-copy text-pretty text-muted">
                {speakingPage.pressKit.bio}
              </p>
              <div className="mt-2">
                <CopyBioButton text={speakingPage.pressKit.bio} />
              </div>
            </Reveal>

            {/*
              Every asset is outstanding. Each row links to "#" until a real
              file exists — do not point one at a placeholder image.
            */}
            <Reveal delay={80}>
              <div className="flex flex-col gap-3">
                {speakingPage.pressKit.downloads.map((file) => (
                  <a
                    key={file.label}
                    href={file.href}
                    className="group flex items-center justify-between rounded-lg border border-line bg-ink-raised p-5.5 transition-all hover:border-gold"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-copy-sm font-medium text-heading group-hover:text-gold transition-colors">
                        {file.label}
                      </span>
                      <span className="font-mono text-caption text-dim">
                        [ {file.note} ]
                      </span>
                    </div>
                    <span className="flex size-9 items-center justify-center rounded-full border border-line bg-ink text-gold transition-transform group-hover:translate-x-1 group-hover:border-gold">
                      ↓
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 7 — CTA band */}
        <Section tone="raised" divide="top">
          <div className="shell flex flex-col items-center py-24 text-center lg:py-28">
            <Reveal className="flex flex-col items-center gap-5">
              <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {speakingPage.cta.heading}
              </Heading>
              <p className="max-w-[540px] text-copy text-pretty text-muted">
                {speakingPage.cta.body}
              </p>
              <div className="mt-3 flex">
                <Button href={speakingPage.cta.primary.href} size="lg">
                  {speakingPage.cta.primary.label}
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
