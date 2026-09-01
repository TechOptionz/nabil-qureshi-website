"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type ShowcaseItem = {
  id: string;
  title: string;
  href: string;
  image: string;
  alt: string;
};

const showcaseItems: ShowcaseItem[] = [
  {
    id: "property",
    title: "Property",
    href: "/property",
    image: "/media/content/property_approach.webp",
    alt: "Luxury property development & architecture",
  },
  {
    id: "business-ai",
    title: "Business & AI",
    href: "/business-ai",
    image: "/media/content/business_ai_approach.webp",
    alt: "Enterprise AI command center & digital architecture",
  },
  {
    id: "health",
    title: "Health",
    href: "/wellness",
    image: "/media/content/wellness_protocol.webp",
    alt: "Private executive wellness & performance studio",
  },
  {
    id: "advisory",
    title: "Advisory",
    href: "/work-with-nabil",
    image: "/media/content/advisory_showcase.webp",
    alt: "Penthouse executive advisory boardroom",
  },
  {
    id: "speaking",
    title: "Speaking",
    href: "/speaking",
    image: "/media/content/speaking_showreel.webp",
    alt: "Keynote presentation summit stage",
  },
  {
    id: "insights",
    title: "Insights",
    href: "/insights",
    image: "/media/content/insights_showcase.webp",
    alt: "Executive study and research library",
  },
];

export function InteractiveShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = showcaseItems[activeIndex];

  return (
    <Section tone="ink" divide="bottom">
      <div className="shell py-20 band:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14 xl:gap-20">
          {/* Left Column: Clean Bold Typography Stack (Tony Robbins Reference) */}
          <div className="flex flex-col">
            <Reveal>
              <p className="mb-8 flex items-center gap-2.5 text-caption font-semibold tracking-[0.18em] text-gold uppercase">
                <span className="size-2 rounded-full bg-gold shadow-[0_0_8px_rgba(211,169,94,0.6)]" />
                Pillars of Practice & Performance
              </p>
            </Reveal>

            <div className="flex flex-col gap-1 sm:gap-2" role="tablist" aria-label="Practice pillars">
              {showcaseItems.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="group flex cursor-pointer items-center gap-4 py-1 sm:gap-5"
                  >
                    <Link
                      href={item.href}
                      className={`font-sans text-[clamp(2.5rem,4.8vw,4.5rem)] font-bold tracking-[-0.035em] leading-[1.08] transition-all duration-300 ${
                        isActive
                          ? "text-wordmark drop-shadow-[0_2px_16px_rgba(255,255,255,0.08)]"
                          : "text-[#58616f] hover:text-[#9ea8b8]"
                      }`}
                    >
                      {item.title}
                    </Link>

                    {/* Inline Explore Button Pill */}
                    {isActive && (
                      <Link
                        href={item.href}
                        className="animate-fade-in inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f3efe7] px-4 py-1.5 text-caption font-bold text-ink-deep shadow-xl transition-all duration-300 hover:bg-gold hover:text-ink-deep hover:shadow-[0_0_20px_rgba(211,169,94,0.4)]"
                      >
                        <span>Explore</span>
                        <span className="text-xs font-bold">›</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Massive Full-Height Rounded Showcase Image (4:5 / 5:6 Scale) */}
          <Reveal delay={100} className="w-full">
            <div className="relative">
              {/* Subtle Gold Ambient Halo */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[38px] bg-gradient-to-tr from-gold/20 via-transparent to-gold/15 blur-2xl opacity-70 pointer-events-none"
              />

              <Link
                href={activeItem.href}
                className="group relative block aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] xl:aspect-[5/6] w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] overflow-hidden rounded-[32px] border border-white/10 bg-ink-raised shadow-2xl ring-1 ring-white/10 transition-transform duration-500 hover:scale-[1.008]"
                aria-label={`Explore ${activeItem.title}`}
              >
                {/* Layered Showcase Images with Smooth Cross-fade */}
                {showcaseItems.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                        isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 52vw, 100vw"
                        className={`object-cover transition-transform duration-700 ease-out ${
                          isActive ? "scale-100" : "scale-105"
                        }`}
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
