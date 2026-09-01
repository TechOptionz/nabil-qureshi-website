import { pathways } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

export function Pathways() {
  return (
    <Section>
      <div className="shell py-24">
        <Reveal>
          <Eyebrow className="mb-3.5">Explore</Eyebrow>
          <Heading className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)]">
            Three pathways
          </Heading>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map((pathway, index) => (
            <Reveal key={pathway.number} delay={index * 90}>
              <a
                href={pathway.href}
                className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-ink-raised px-8 py-9 transition-colors hover:border-gold"
              >
                <span className="font-serif text-[34px] text-gold">
                  {pathway.number}
                </span>
                <span className="font-serif text-[23px] text-heading">
                  {pathway.title}
                </span>
                <p className="text-copy-sm text-pretty text-muted">
                  {pathway.body}
                </p>
                <span className="mt-auto pt-2 text-ui font-semibold text-gold">
                  {pathway.cta}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
