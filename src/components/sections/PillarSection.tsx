import type { Pillar } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

export function PillarSection({ pillar }: { pillar: Pillar }) {
  const copy = (
    <Reveal className="flex flex-col gap-5">
      <Eyebrow>{pillar.eyebrow}</Eyebrow>
      <Heading className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
        {pillar.heading}
      </Heading>
      <p className="text-copy text-pretty text-muted">
        {pillar.body}
      </p>
      <ul className="flex flex-col gap-3 text-copy-sm text-body-soft">
        {pillar.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden className="text-gold">
              —
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <Button
        href={pillar.cta.href}
        size="md"
        className="mt-2 self-start"
      >
        {pillar.cta.label}
      </Button>
    </Reveal>
  );

  const media = (
    <Reveal
      delay={80}
      className={`relative mx-auto w-full max-w-md lg:max-w-none ${pillar.reversed ? "lg:order-first" : ""}`}
    >
      <MediaSlot
        src={pillar.image.src}
        alt={pillar.image.alt}
        label={pillar.image.label}
        className="aspect-[4/5] max-h-[540px] w-full"
      />
    </Reveal>
  );

  return (
    <Section
      id={pillar.id}
      tone={pillar.tone}
      divide={pillar.tone === "raised" ? "both" : "none"}
    >
      <div className="shell grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
        {copy}
        {media}
      </div>
    </Section>
  );
}
