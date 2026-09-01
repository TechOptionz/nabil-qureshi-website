import { credibility } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Credibility() {
  return (
    <Section tone="creamDeep" divide="top">
      <div className="shell py-16">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {credibility.stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 70}
              className="flex flex-col gap-2"
            >
              <span className="font-serif text-[44px] leading-none text-gold-dark">
                {stat.value}
              </span>
              <span className="text-ui text-ink-body">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-caption tracking-wide text-ink-muted">
          {credibility.note}
        </p>
      </div>
    </Section>
  );
}
