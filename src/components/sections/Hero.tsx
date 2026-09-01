"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const quickPillars = [
  {
    id: "property",
    title: "Real Estate",
    tagline: "Smarter decisions. Stronger foundations.",
    href: "/property",
    icon: (
      <svg className="size-6 text-gold transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "business-ai",
    title: "Business & AI",
    tagline: "Growth through systems, technology and AI.",
    href: "/business-ai",
    icon: (
      <svg className="size-6 text-gold transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: "wellness",
    title: "Health & Wellness",
    tagline: "A healthy body, mind and mindset.",
    href: "/wellness",
    icon: (
      <svg className="size-6 text-gold transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0v-8m-4 4l4-4 4 4" />
      </svg>
    ),
  },
  {
    id: "speaking",
    title: "Speaking & Consulting",
    tagline: "Inspiring audiences. Delivering impact.",
    href: "/speaking",
    icon: (
      <svg className="size-6 text-gold transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden bg-black pt-6 pb-8 band:pt-10 band:pb-10"
    >


      {/* Ambient Lighting & Top Right Golden Spotlight Beam */}
      <div
        aria-hidden
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 85% 20%, rgba(211,169,94,0.35) 0%, rgba(211,169,94,0.1) 45%, transparent 70%), radial-gradient(circle at 15% 40%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 60%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 right-0 z-1 h-[650px] w-[550px] pointer-events-none opacity-80"
        style={{
          background:
            "conic-gradient(from 220deg at 90% 5%, rgba(211,169,94,0.38) 0deg, rgba(211,169,94,0.08) 45deg, transparent 90deg)",
          filter: "blur(28px)",
        }}
      />

      {/* Directional Vignette Scrim to Ensure 100% Contrast for Left Typography */}
      <div
        aria-hidden
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.88) 42%, rgba(0,0,0,0.3) 72%, rgba(0,0,0,0.65) 100%), linear-gradient(to top, rgba(0,0,0,0.98) 0%, transparent 25%)",
        }}
      />

      {/* Main Hero Container */}
      <div className="shell relative z-10 w-full pt-4 pb-2 band:pt-6 band:pb-4">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-4 xl:gap-8">
          {/* Left Column: Headlines, Copy, Action Buttons */}
          <div className="flex flex-col gap-6 sm:gap-7 py-4 lg:py-8 z-10">
            <p className="animate-fade-up text-caption font-semibold tracking-[0.18em] text-gold uppercase">
              PROPERTY & WEALTH · BUSINESS, TECHNOLOGY & AI · HEALTH & WELLNESS
            </p>

            <h1 className="animate-fade-up font-serif text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[1.08] text-heading text-balance">
              <span className="block">Build wealth.</span>
              <span className="block">Build better businesses.</span>
              <em className="block text-gold italic font-normal">Build a better life.</em>
            </h1>

            <p className="animate-fade-up max-w-xl text-copy leading-relaxed text-body-soft">
              Practical insights from Nabil on property and wealth creation, business technology and AI, and the health and mindset required for lasting success.
            </p>

            <div className="animate-fade-up flex flex-wrap items-center gap-4 pt-2">
              <Button href="/insights" size="lg" className="group">
                <span>Explore Nabil&apos;s Insights</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button href="/work-with-nabil" variant="outline" size="lg" className="group">
                <span>Work With Nabil</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Large Seamless Executive Nabil Portrait (NO CARD / NO BOX) */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Ambient Warm Golden Halo behind Nabil */}
            <div
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2 right-10 size-[540px] rounded-full bg-gold/35 blur-3xl pointer-events-none"
            />

            <div className="relative aspect-[1024/965] w-full max-w-[780px] sm:max-w-[920px] lg:max-w-[1100px] xl:max-w-[1250px] -translate-y-8 sm:-translate-y-12 lg:-translate-y-16 xl:-translate-y-20 lg:translate-x-6 xl:translate-x-10 -mb-8 lg:-mb-14 scale-110 sm:scale-120 origin-bottom">
              <Image
                src="/media/nabil_hero_glasses_portrait.png"
                alt="Nabil Qureshi — Build wealth, build better businesses, build a better life"
                fill
                priority
                sizes="(min-width: 1280px) 70vw, (min-width: 1024px) 65vw, 100vw"
                className="object-contain object-bottom filter brightness-[1.14] contrast-[1.02] drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Quick-Pillars Navigation Card */}
      <div className="shell relative z-10 w-full mt-2">
        <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#14171c]/85 p-4 shadow-2xl backdrop-blur-xl sm:grid-cols-2 sm:p-5 lg:grid-cols-4 lg:gap-5">
          {quickPillars.map((pillar) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.03] hover:translate-y-[-2px]"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20 group-hover:border-gold/60">
                {pillar.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-serif text-base font-normal text-wordmark transition-colors duration-200 group-hover:text-gold">
                  {pillar.title}
                </span>
                <span className="text-[12.5px] leading-snug text-dim">
                  {pillar.tagline}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
