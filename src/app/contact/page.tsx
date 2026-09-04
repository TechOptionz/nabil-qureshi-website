import type { Metadata } from "next";
import { contact, contactPage, site } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { ContactEnquiryForm } from "@/components/sections/ContactEnquiryForm";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Heading, Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageGraph } from "@/lib/seo/jsonld";

const { title, description, ogImage } = contactPage.meta;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${site.url}/contact`,
    siteName: site.name,
    locale: "en_AU",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: site.shortName,
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
 * The hand-rolled node this replaces referenced `#person` and an inline
 * `WebSite`, neither of which was declared on this route — both dangled. The
 * shared graph declares them once in the root layout, so the references
 * resolve here.
 *
 * No `ContactPoint` is emitted: the page publishes no phone number or email
 * address, only a form, and inventing one is exactly the kind of claim that
 * earns a structured-data manual action.
 */
const graph = pageGraph({
  path: "/contact",
  type: "ContactPage",
  name: title,
  description,
  image: ogImage,
  trail: [{ name: "Contact", path: "/contact" }],
  mentions: contact.services.map((service) => service.label),
});

function resolveTopic(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return "Property Acquisitions & Advisory";
  return contactPage.topicSlugs[value.toLowerCase()] ?? "Property Acquisitions & Advisory";
}

export default async function ContactPage(props: PageProps<"/contact">) {
  const { topic } = await props.searchParams;
  const initialTopic = resolveTopic(topic);

  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        {/* 1 — Hero */}
        <PageHero
          eyebrow={contact.eyebrow}
          heading={contact.heading}
          lede={contact.body}
          image={{
            src: "/media/hero/hero_contact.webp",
            blurDataURL: "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoKAAYAA4BaJZwAAlr0j4joAMyZI3teNhuqBf90siKr9ps0Lx/pfKsz1bJhi/80q9uE7LOBAAA=",
            alt: "Sunlit city-view workspace with a laptop on a window bar",
            objectPosition: "center 45%",
            tone: "bright",
          }}
        />

        {/* 2 — Tell Me About It / Enquiry Form Section */}
        <Section id="enquiry" tone="cream" divide="top">
          <div className="shell grid gap-12 py-20 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
            <Reveal className="flex flex-col gap-6">
              <Heading tone="light" className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2]">
                {contactPage.expectations.heading}
              </Heading>
              <ul className="flex flex-col gap-3.5 text-copy text-ink-body">
                {contactPage.expectations.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="text-gold-dark font-bold">
                      —
                    </span>
                    <span className="text-pretty">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Direct Details & Verified Channels */}
              <div className="mt-6 pt-6 border-t border-cream-line flex flex-col gap-3">
                <p className="text-caption font-semibold tracking-[0.16em] text-gold-dark uppercase">
                  Direct Advisory & Media Channels
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 rounded-lg border border-cream-line bg-cream-deep p-4">
                    <span className="text-caption text-ink-muted">
                      {contactPage.direct.location.label}
                    </span>
                    <span className="font-medium text-ink">
                      {contactPage.direct.location.value}
                    </span>
                  </div>

                  <a
                    href={contactPage.direct.linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contactPage.direct.linkedin.cta} — opens in a new tab`}
                    className="group flex items-center gap-3.5 rounded-lg border border-cream-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0a66c2]/40 hover:shadow-[0_10px_28px_-14px_rgba(10,102,194,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a66c2]"
                  >
                    <span
                      aria-hidden
                      className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#0a66c2] text-white transition-transform duration-300 group-hover:scale-105"
                    >
                      {/* Official LinkedIn glyph — single filled path, brand blue #0A66C2. */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-caption text-ink-muted">
                        {contactPage.direct.linkedin.label}
                      </span>
                      <span className="font-medium text-ink transition-colors group-hover:text-[#0a66c2]">
                        {contactPage.direct.linkedin.name}
                      </span>
                      <span className="text-caption font-semibold text-[#0a66c2]">
                        {contactPage.direct.linkedin.cta}
                        <span aria-hidden className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                          &rarr;
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ContactEnquiryForm initialTopic={initialTopic} />
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
