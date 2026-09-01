import { testimonials } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

export function Testimonials() {
  return (
    <Section tone="creamDeep" divide="top">
      <div className="shell py-24">
        <Reveal className="text-center">
          <Eyebrow tone="light" className="mb-3.5">
            {testimonials.eyebrow}
          </Eyebrow>
          <Heading
            tone="light"
            className="mb-14 text-[clamp(1.875rem,3.4vw,2.75rem)]"
          >
            {testimonials.heading}
          </Heading>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <Reveal key={index} delay={index * 80}>
              <figure className="flex h-full flex-col gap-4 rounded-lg border border-cream-line bg-cream px-8 py-9">
                <span
                  aria-hidden
                  className="font-serif text-[40px] leading-[0.5] text-gold"
                >
                  &ldquo;
                </span>
                <blockquote
                  className={
                    item.pending
                      ? "font-mono text-meta text-ink-muted"
                      : "text-copy-sm text-pretty text-ink-body"
                  }
                >
                  {item.pending ? `[ ${item.quote} ]` : item.quote}
                </blockquote>
                <figcaption className="mt-auto pt-2 text-ui font-semibold text-ink-strong">
                  {item.name}
                  <span className="font-normal text-ink-muted">
                    {" "}
                    — {item.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
