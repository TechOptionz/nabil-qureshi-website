import Image from "next/image";

type MediaSlotProps = {
  src: string | null;
  alt: string;
  /** Shown inside the placeholder while no real asset exists. */
  label: string;
  className?: string;
  /** Renders a play glyph — use for video slots. */
  kind?: "image" | "video";
  /** Larger play glyph for the hero-sized video slot. */
  size?: "sm" | "md" | "lg";
  /** Loads the image eagerly at high priority — for an LCP candidate. */
  eager?: boolean;
  sizes?: string;
};

/**
 * The Next equivalent of the design canvas `<image-slot>`: renders the real
 * asset when one has been supplied, and an honest labelled placeholder when it
 * has not. Placeholders are deliberately visible so nothing ships pretending
 * to be finished artwork.
 */
export function MediaSlot({
  src,
  alt,
  label,
  className = "",
  kind = "image",
  size = "md",
  eager = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
}: MediaSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="object-cover"
        />
      </div>
    );
  }

  const ring =
    size === "lg" ? "size-18" : size === "sm" ? "size-11" : "size-16";
  const arrow =
    size === "lg"
      ? "border-l-[20px] border-y-[12px]"
      : size === "sm"
        ? "border-l-[12px] border-y-[7px]"
        : "border-l-[16px] border-y-[10px]";

  return (
    <div
      role="img"
      aria-label={`Placeholder: ${alt}`}
      className={`relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border border-line-soft bg-ink ${className}`}
    >
      {/* Faint diagonal hatch so an empty slot reads as intentional */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(211,169,94,0.06) 0 1px, transparent 1px 11px)",
        }}
      />
      {kind === "video" ? (
        <span
          className={`relative flex ${ring} items-center justify-center rounded-full border-[1.5px] border-gold`}
        >
          <span
            className={`ml-[15%] size-0 border-y-transparent border-l-gold ${arrow}`}
          />
        </span>
      ) : (
        <span className="relative font-serif text-3xl text-gold/70">◍</span>
      )}
      <span className="relative px-6 text-center font-mono text-caption tracking-wide text-dim">
        [ {label} ]
      </span>
    </div>
  );
}
