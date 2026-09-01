import type { Metadata } from "next";
import Image from "next/image";
import { contactPage, site } from "@/content/site";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { ContactEnquiryForm } from "@/components/sections/ContactEnquiryForm";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Section } from "@/components/ui/Section";

const { title, description, ogImage } = contactPage.meta;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${site.url}/contact`,
    siteName: site.name,
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

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${site.url}/contact#contactpage`,
  url: `${site.url}/contact`,
  name: title,
  description,
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  },
  about: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.shortName,
  },
};

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
        {/* 1 — Full-Bleed Artwork Hero (Covers the entire hero section edge-to-edge) */}
        <header className="relative w-full h-[50svh] sm:h-[62svh] lg:h-[75svh] min-h-[420px] max-h-[780px] overflow-hidden bg-ink">
          <Image
            src="/media/contact_bg_art.webp"
            alt="Inspirational I AM art mural"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </header>

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
                  {contactPage.direct.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1 rounded-lg border border-cream-line bg-cream-deep p-4"
                    >
                      <span className="text-caption text-ink-muted">{item.label}</span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-medium text-ink hover:text-gold-dark transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-medium text-ink">{item.value}</span>
                      )}
                    </div>
                  ))}
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
    </>
  );
}
