import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Section";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroImageProps {
  src: string;
  blurDataURL?: string;
  alt: string;
  objectPosition?: string;
  /**
   * `"bright"` for a light, high-key photograph. The default treatment is
   * tuned for the dark interiors the other heroes use; over a bright image it
   * leaves the gold eyebrow at 2.4:1 and the lede at 2.9:1, both well under
   * WCAG AA. A bright hero therefore dims the photograph further and carries
   * a heavier scrim, which measures 4.6:1 and 6.0:1 respectively.
   */
  tone?: "bright";
  photographer?: string;
  sourceUrl?: string;
}

interface PageHeroProps {
  eyebrow: string | string[];
  heading: string;
  lede: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  image?: HeroImageProps;
  isBlocked?: boolean;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  heading,
  lede,
  primaryCta,
  secondaryCta,
  image,
  isBlocked,
  children,
}: PageHeroProps) {
  const isBright = image?.tone === "bright";

  return (
    <header
      id="top"
      className="relative flex min-h-[500px] items-center overflow-hidden bg-ink py-20 lg:min-h-[560px] lg:py-28"
    >
      {isBlocked && (
        <>
          {/* Awaiting real photography — do not substitute stock. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(85% 75% at 78% 22%, rgba(211,169,94,0.25), transparent 60%), radial-gradient(70% 60% at 15% 85%, rgba(211,169,94,0.12), transparent 55%), radial-gradient(100% 100% at 50% 50%, #1a1e24 0%, #14171c 100%)",
            }}
          />
        </>
      )}

      {image && !isBlocked && (
        <>
          {/* Image source: {image.sourceUrl} | Photographer: {image.photographer} */}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            /*
              `priority` is deprecated in Next 16; this pair is what it
              expanded to. The hero photograph is the LCP element on every
              page that uses this component.
            */
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            className={`object-cover transition-opacity duration-700 ${
              isBright ? "opacity-55" : "opacity-80 md:opacity-85"
            }`}
            style={{ objectPosition: image.objectPosition || "center" }}
          />

          {/* Ambient warm gold lighting highlight */}
          <div
            aria-hidden
            className="absolute inset-0 z-1 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 85% 25%, rgba(211,169,94,0.24), transparent 75%)",
            }}
          />
        </>
      )}

      {/* Directional scrim protecting text contrast on the left while revealing artwork on the right */}
      <div
        aria-hidden
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: isBright
            ? "linear-gradient(90deg, rgba(20,23,28,0.90) 0%, rgba(20,23,28,0.70) 45%, rgba(20,23,28,0.25) 80%, transparent 100%), linear-gradient(to top, rgba(20,23,28,0.90) 0%, transparent 18%)"
            : "linear-gradient(90deg, rgba(20,23,28,0.85) 0%, rgba(20,23,28,0.55) 45%, rgba(20,23,28,0.15) 80%, transparent 100%), linear-gradient(to top, rgba(20,23,28,0.90) 0%, transparent 18%)",
        }}
      />

      <div className="shell relative z-10 w-full">
        <div className="animate-fade-up flex max-w-3xl flex-col gap-6">
          {Array.isArray(eyebrow) ? (
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-gold">
              {eyebrow.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  {index > 0 && <span aria-hidden className="text-gold/50">·</span>}
                  {item}
                </span>
              ))}
            </p>
          ) : (
            <Eyebrow>{eyebrow}</Eyebrow>
          )}

          <Heading
            as="h1"
            className="max-w-4xl text-[clamp(2.5rem,5.2vw,4.125rem)] leading-[1.12] text-balance text-heading"
          >
            {heading}
          </Heading>

          <p className="max-w-[620px] text-lede text-pretty text-muted">
            {lede}
          </p>

          {(primaryCta || secondaryCta || children) && (
            <div className="mt-2 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
