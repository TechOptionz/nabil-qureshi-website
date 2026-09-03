import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "outline" | "dark" | "chip";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * The four button treatments already in use on the site.
 *
 * `dark` still carries a literal `#1a1e24`: the value is the same as
 * `--color-ink-on-gold`, but here it is a *fill on cream*, not text on gold,
 * so borrowing that token would misname it. It needs its own token — see the
 * refactor notes.
 */
const variants: Record<ButtonVariant, string> = {
  primary: "bg-gold font-semibold text-ink-on-gold hover:bg-gold-light",
  outline:
    "border border-line-outline font-medium text-body hover:border-gold hover:text-gold",
  dark: "bg-[#1a1e24] font-semibold text-cream hover:bg-ink-strong",
  chip: "border font-medium",
};

const radii: Record<ButtonVariant, string> = {
  primary: "rounded-sm",
  outline: "rounded-sm",
  dark: "rounded-sm",
  chip: "rounded-full",
};

/** The three primary-button boxes actually used in the design. */
const sizes: Record<ButtonSize, { padding: string; text: string }> = {
  sm: { padding: "px-[22px] py-2.5", text: "text-ui" },
  md: { padding: "px-[26px] py-[13px]", text: "text-ui" },
  lg: { padding: "px-[30px] py-[15px]", text: "text-ui" },
};

const chipSize = { padding: "px-4 py-2", text: "text-caption" };

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Chip only: renders the filled/selected state. */
  selected?: boolean;
  /**
   * One-off padding replacing the size scale, for the handful of buttons whose
   * box would otherwise shift by more than 1px.
   */
  padding?: string;
  /** One-off font-size replacing the size scale. */
  textSize?: string;
  /** One-off radius replacing the variant default. */
  radius?: string;
  className?: string;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  children,
  variant = "primary",
  size = "md",
  selected = false,
  padding,
  textSize,
  radius,
  className = "",
  ...rest
}: ButtonProps) {
  const scale = variant === "chip" ? chipSize : sizes[size];

  const chipState =
    variant === "chip"
      ? selected
        ? "border-gold bg-gold text-ink-on-gold"
        : "border-line-input text-body-soft hover:border-gold hover:text-gold"
      : "";

  const classes = [
    radius ?? radii[variant],
    variants[variant],
    chipState,
    padding ?? scale.padding,
    textSize ?? scale.text,
    "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (typeof rest.href === "string") {
    /* `rest.href` carries the narrowing; `anchorProps.href` would not. */
    const href = rest.href;
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    /*
     * Internal routes go through `next/link`, external ones and in-page
     * anchors stay a plain `<a>`.
     *
     * Every primary conversion path on the site is a `Button` — the hero
     * CTAs, "Start a Conversation", "Work With Nabil" — so routing them
     * through a bare `<a>` meant a full document reload and no prefetch on
     * exactly the journeys that matter most. Both halves of that cost the
     * page's interaction metrics, which feed ranking.
     *
     * An in-page `#anchor` is excluded deliberately: `next/link` would treat
     * it as a route and interfere with the nav's scroll-spy.
     */
    const isInternalRoute = href.startsWith("/");

    if (isInternalRoute) {
      return (
        <Link {...anchorProps} href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <a
        {...anchorProps}
        /*
          A target-less external link needs no `rel` for security, but
          `noopener` costs nothing and keeps the pattern uniform.
        */
        rel={
          href.startsWith("http")
            ? (anchorProps.rel ?? "noopener")
            : anchorProps.rel
        }
        className={classes}
      >
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
