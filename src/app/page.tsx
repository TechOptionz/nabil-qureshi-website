import type { Metadata } from "next";
import { insights, pillars, site, speaking } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageGraph } from "@/lib/seo/jsonld";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { Contact } from "@/components/sections/Contact";
import { Credibility } from "@/components/sections/Credibility";
import { Hero } from "@/components/sections/Hero";
import { Insights } from "@/components/sections/Insights";
import { InteractiveShowcase } from "@/components/sections/InteractiveShowcase";
import { Introduction } from "@/components/sections/Introduction";
import { Newsletter } from "@/components/sections/Newsletter";
import { PillarSection } from "@/components/sections/PillarSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Speaking } from "@/components/sections/Speaking";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";

/*
 * The root layout supplies the title, description, Open Graph and Twitter
 * cards for this route already. Only the self-canonical is missing there —
 * declaring it in the layout would hand every page that did not override it
 * the same "/" canonical, including the 404.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/*
 * The home page is the site's hub: it carries every pillar, the insight
 * grid, the speaking band and the contact band. `mentions` lists what it
 * actually covers, drawn verbatim from the headings already rendered below,
 * so an answer engine can read the page's scope without inferring it from
 * layout.
 */
const graph = pageGraph({
  path: "/",
  name: `${site.shortName} — Property, Business & AI, Wellness`,
  description: site.description,
  image: "/og-image.jpg",
  mentions: [
    ...pillars.map((pillar) => pillar.eyebrow.split("— ")[1] ?? pillar.eyebrow),
    ...pillars.flatMap((pillar) => pillar.points),
    insights.heading,
    speaking.heading,
  ],
});

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex-1">
        <Hero />
        <Introduction />
        <InteractiveShowcase />
        <Story />
        <Credibility />

        {pillars.map((pillar) => (
          <PillarSection key={pillar.id} pillar={pillar} />
        ))}

        <Insights />
        <Speaking />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>

      <ChatWidget />
      <SiteFooter />
      <JsonLd graph={graph} />
    </>
  );
}
