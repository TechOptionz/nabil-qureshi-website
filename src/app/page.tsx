import { pillars } from "@/content/site";
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
    </>
  );
}
