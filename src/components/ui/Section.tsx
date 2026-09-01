import type { ReactNode } from "react";

const tones = {
  ink: "bg-ink text-body",
  raised: "bg-ink-raised text-body",
  cream: "bg-cream text-ink-text",
  creamDeep: "bg-cream-deep text-ink-text",
} as const;

export type Tone = keyof typeof tones;

type SectionProps = {
  id?: string;
  tone?: Tone;
  /** Adds the hairline rules used between dark bands in the original design. */
  divide?: "none" | "top" | "bottom" | "both";
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = "ink",
  divide = "none",
  className = "",
  children,
}: SectionProps) {
  const light = tone === "cream" || tone === "creamDeep";
  const rule = light ? "border-cream-line" : "border-line";
  const edges =
    divide === "both"
      ? `border-y ${rule}`
      : divide === "top"
        ? `border-t ${rule}`
        : divide === "bottom"
          ? `border-b ${rule}`
          : "";

  return (
    <section id={id} className={`${tones[tone]} ${edges} ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`eyebrow ${tone === "light" ? "font-semibold text-gold-dark" : "text-gold"} ${className}`}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  tone = "dark",
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`font-serif font-normal text-balance ${
        tone === "light" ? "text-[#1a1e24]" : "text-heading"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
