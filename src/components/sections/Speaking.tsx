import { speaking } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

export function Speaking() {
  return (
    <Section id="speaking" tone="cream">
      <div className="shell grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow tone="light">{speaking.eyebrow}</Eyebrow>
          <Heading
            tone="light"
            className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight"
          >
            {speaking.heading}
          </Heading>
          <p className="text-copy text-pretty text-ink-body">
            {speaking.body}
          </p>
          <ul className="flex flex-col gap-3 text-copy-sm text-ink-strong">
            {speaking.topics.map((topic) => (
              <li key={topic} className="flex gap-3">
                <span aria-hidden className="text-gold-dark">
                  —
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
          <Button
            href={speaking.cta.href}
            variant="dark"
            size="md"
            className="mt-2 self-start"
          >
            {speaking.cta.label}
          </Button>
        </Reveal>

        <Reveal delay={80}>
          <MediaSlot
            kind="video"
            src={speaking.showreel.src}
            alt={speaking.showreel.label}
            label={speaking.showreel.label}
            className="aspect-[16/10] w-full border-transparent bg-ink-raised"
          />
        </Reveal>
      </div>
    </Section>
  );
}
