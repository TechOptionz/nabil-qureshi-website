import Image from "next/image";
import { technologyPartner } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

/*
 * KEYOB supplied this band as standalone HTML in its own navy/cyan palette.
 * It is re-skinned here onto the site's tokens rather than pasted in, so the
 * page keeps one visual language: KEYOB navy maps to `ink-raised`, KEYOB cyan
 * to `gold`, and the reference's white-on-tint cards to `cream` on
 * `cream-deep`. The wordmark is the only KEYOB brand asset that survives, and
 * it is never recoloured.
 */

const { logo, partnerLabel } = technologyPartner;

/** "In partnership with" + the wordmark, in whichever colourway the band needs. */
function PartnerLockup({
  on,
  className = "",
}: {
  on: "dark" | "light";
  className?: string;
}) {
  const mark = on === "dark" ? logo.white : logo.navy;

  return (
    <span className={`flex items-center gap-3.5 ${className}`}>
      <span
        className={`text-caption tracking-[0.14em] uppercase ${
          on === "dark" ? "text-dim" : "text-ink-muted"
        }`}
      >
        {partnerLabel}
      </span>
      <Image
        src={mark.src}
        alt={logo.alt}
        width={mark.width}
        height={mark.height}
        className="h-[22px] w-auto"
      />
    </span>
  );
}

/**
 * The full partner band, used once on /business-ai. `technologyPartner.id` is
 * its anchor: the home-page banner deep-links straight to it.
 */
export function TechnologyPartner() {
  const {
    id,
    lockup,
    eyebrow,
    heading,
    lede,
    system,
    capabilities,
    benefits,
    steps,
    cta,
    disclaimer,
  } = technologyPartner;

  return (
    <Section id={id} tone="creamDeep" divide="both">
      <div className="shell py-24">
        {/* Lockup and eyebrow */}
        <Reveal className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-cream-line bg-cream px-4 py-2 text-caption font-semibold tracking-[0.12em] text-ink-text uppercase">
            <span aria-hidden className="size-[7px] rounded-full bg-gold-dark" />
            {lockup}
          </span>

          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </Reveal>

        {/*
          Heading and lede split into two columns from `lg` up. Stacked in one
          narrow measure they left the right third of the band empty while
          every grid below ran its full width; side by side they occupy the
          same width, and match the two-column rhythm of the band above.
        */}
        <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-[72px]">
          <Reveal>
            <Heading
              tone="light"
              className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.15]"
            >
              {heading}
            </Heading>
          </Reveal>
          <Reveal delay={70}>
            <p className="text-copy text-pretty text-ink-body">{lede}</p>
          </Reveal>
        </div>

        {/* The three-part starting system */}
        <div className="mt-14 grid gap-3.5 md:grid-cols-3">
          {system.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="flex h-full flex-col gap-2.5 rounded-lg bg-ink-raised px-7 py-7">
                <span className="text-caption font-semibold tracking-[0.14em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-[19px] leading-snug text-heading">
                  {item.title}
                </h3>
                <p className="text-copy-sm text-pretty text-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={80}>
          <p className="mt-4 text-copy-sm text-pretty text-ink-muted italic">
            {system.note}
          </p>
        </Reveal>

        {/* Capabilities */}
        <Reveal delay={60}>
          <ul className="mt-11 flex flex-wrap gap-2.5">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-full border border-cream-line bg-cream px-4 py-2 text-caption font-medium text-ink-strong"
              >
                {capability}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* What it changes */}
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 70}>
              <div className="flex h-full flex-col gap-2.5 rounded-lg border border-cream-line bg-cream px-7 py-7">
                <h3 className="flex items-center gap-3 font-serif text-[17px] text-ink-text">
                  <span
                    aria-hidden
                    className="inline-flex size-5 flex-none items-center justify-center rounded-full bg-gold-dark text-[11px] font-bold text-cream"
                  >
                    ✓
                  </span>
                  {benefit.title}
                </h3>
                <p className="text-copy-sm text-pretty text-ink-body">
                  {benefit.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* How it runs */}
        <ol className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const last = index === steps.length - 1;

            return (
              /* `as="li"` keeps the reveal wrapper from breaking the list. */
              <Reveal
                key={step}
                as="li"
                delay={index * 60}
                className={`flex h-full flex-col items-center gap-2 rounded-lg px-5 py-5 text-center text-ui font-semibold ${
                  last
                    ? "bg-ink-raised text-heading"
                    : "border border-cream-line bg-cream text-ink-text"
                }`}
              >
                <span
                  aria-hidden
                  className={`text-caption font-semibold tracking-[0.12em] ${
                    last ? "text-gold" : "text-gold-dark"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </Reveal>
            );
          })}
        </ol>

        {/* Close */}
        <Reveal delay={80} className="mt-11">
          <div className="flex flex-col gap-8 rounded-lg bg-ink-raised px-9 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-3">
              <Heading
                as="h3"
                className="text-[clamp(1.375rem,2.2vw,1.625rem)] leading-snug"
              >
                {cta.heading}
              </Heading>
              <p className="max-w-[52ch] text-copy-sm text-pretty text-muted">
                {cta.body}
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:items-end">
              <div className="flex flex-wrap gap-3.5">
                <Button href={cta.primary.href} target="_blank">
                  {cta.primary.label}
                </Button>
                <Button
                  href={cta.secondary.href}
                  variant="outline"
                  target="_blank"
                >
                  {cta.secondary.label}
                </Button>
              </div>
              <PartnerLockup on="dark" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          {/*
            No max-width here, unlike the lede and card copy: the disclaimer
            is one legal sentence and reads as a single rule under the band,
            so it runs the full shell and only wraps once the viewport is too
            narrow to hold it.
          */}
          <p className="mt-6 text-caption text-pretty text-ink-muted">
            {disclaimer}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * The compact home-page version: one card below the Business & AI pillar that
 * carries the same claim and links into the full band on /business-ai.
 */
export function TechnologyPartnerBanner() {
  const { eyebrow, banner, id } = technologyPartner;

  return (
    <Section divide="bottom">
      <div className="shell py-16">
        <Reveal>
          <div className="flex flex-col gap-7 rounded-lg border border-line border-l-2 border-l-gold bg-ink-raised px-8 py-9 sm:px-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex flex-col gap-3.5 lg:flex-1">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Heading
                as="h3"
                className="text-[clamp(1.375rem,2.2vw,1.75rem)] leading-snug"
              >
                {banner.heading}
              </Heading>
              <p className="max-w-[62ch] text-copy-sm text-pretty text-muted">
                {banner.body}
              </p>
            </div>

            <div className="flex flex-col items-start gap-6 lg:items-end">
              <Button href={`/business-ai#${id}`} variant="outline">
                {banner.cta}
              </Button>
              <PartnerLockup on="dark" />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
