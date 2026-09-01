import { story } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Story() {
  return (
    <Section id="about" tone="cream">
      <div className="shell grid items-center gap-12 py-24 lg:grid-cols-[minmax(280px,440px)_1fr] lg:gap-16 xl:gap-20 lg:py-28">
        {/* Left Column: Portrait */}
        <Reveal className="relative">
          <div
            aria-hidden
            className="absolute -inset-y-4 -left-4 right-4 rounded-2xl border border-gold/40 shadow-xl"
          />
          <MediaSlot
            src={story.portrait.src}
            alt={story.portrait.alt}
            label={story.portrait.label}
            sizes="(max-width: 1024px) 100vw, 440px"
            className="relative h-[540px] w-full rounded-xl overflow-hidden shadow-2xl"
          />
        </Reveal>

        {/* Right Column: Copy matching exact reference */}
        <Reveal delay={80} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-caption font-semibold tracking-[0.18em] text-gold uppercase">
              {story.eyebrow}
            </span>
            <span className="h-[2px] w-10 bg-gold" />
          </div>

          <h2 className="font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] font-normal leading-[1.12] text-ink text-balance">
            {story.heading}{" "}
            <em className="text-gold italic font-normal">{story.headingAccent}</em>
          </h2>

          {story.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-copy leading-relaxed text-ink-body max-w-2xl"
            >
              {paragraph}
            </p>
          ))}

          <div className="pt-2">
            <Button
              href={story.cta.href}
              size="lg"
              className="group bg-[#101317] text-white border border-transparent shadow-xl hover:bg-gold hover:text-ink-deep"
            >
              <span>{story.cta.label}</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
