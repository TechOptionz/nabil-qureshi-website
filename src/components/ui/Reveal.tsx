"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Rendered element. Defaults to a plain div. */
  as?: ElementType;
  /** Stagger in milliseconds, for grids of cards. */
  delay?: number;
  className?: string;
};

/**
 * Fades content up the first time it scrolls into view.
 *
 * Visibility is toggled directly on the DOM node rather than through state:
 * it is a one-way, one-time visual flip, so there is nothing for React to
 * re-render. The hidden starting state lives in CSS (`.reveal`), which means
 * the markup is fully present for crawlers and is forced visible under
 * `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-visible", "true");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible="false"
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
