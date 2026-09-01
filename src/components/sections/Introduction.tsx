import { introduction } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Introduction() {
  return (
    <Section tone="raised" divide="both">
      <Reveal className="mx-auto max-w-[880px] px-7 py-24 text-center">
        <p className="font-serif text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.55] text-pretty text-body">
          {introduction}
        </p>
        <div className="mx-auto mt-9 h-0.5 w-14 bg-gold" />
      </Reveal>
    </Section>
  );
}
