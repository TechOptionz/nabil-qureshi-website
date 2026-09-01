"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { articles, insightsPage } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Section } from "@/components/ui/Section";

const { filters, grid } = insightsPage;

type FilterTag = (typeof filters.tags)[number];

/**
 * Chip label → `?tag=` value. Derived rather than mapped by hand so a new
 * chip in `insights.filters` cannot fall out of sync with its deep link:
 * "Business & AI" → "business-ai".
 */
function slugify(tag: string) {
  return tag
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function tagFromSlug(slug: string | null): FilterTag {
  if (!slug) return "All";
  const wanted = slug.toLowerCase();
  return filters.tags.find((tag) => slugify(tag) === wanted) ?? "All";
}

/** Shared by the real cards and the format cards, as on the home grid. */
const cardClass =
  "flex h-full flex-col gap-3.5 rounded-lg border border-line bg-ink-raised px-7 py-8 transition-colors hover:border-gold";

type LibraryProps = {
  selected: FilterTag;
  /** Absent in the prerendered fallback, before the URL is known. */
  onSelect?: (tag: FilterTag) => void;
};

/**
 * Filter bar and grid are one component because they share the selected tag,
 * and one element because `position: sticky` is bounded by its parent: the bar
 * stays pinned under the nav for exactly the length of the grid.
 */
function Library({ selected, onSelect }: LibraryProps) {
  const visible = useMemo(
    () =>
      selected === "All"
        ? articles
        : articles.filter((article) => article.tag === selected),
    [selected],
  );

  return (
    <div>
      {/* 2 — Filters */}
      <div className="sticky top-20 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
          <div
            role="group"
            aria-label={filters.label}
            className="flex flex-wrap gap-2"
          >
            {filters.tags.map((tag) => {
              const isSelected = tag === selected;
              return (
                <Button
                  key={tag}
                  type="button"
                  variant="chip"
                  selected={isSelected}
                  aria-pressed={isSelected}
                  onClick={onSelect ? () => onSelect(tag) : undefined}
                >
                  {tag}
                </Button>
              );
            })}
          </div>

          <p aria-live="polite" className="text-meta text-dim">
            Showing {visible.length} of {articles.length}
          </p>
        </div>
      </div>

      {/* 3 — Grid */}
      <Section>
        <div className="shell py-24">
          {visible.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((article, index) => {
                const inner = (
                  <>
                    <span className="text-caption tracking-[0.16em] text-gold uppercase">
                      {article.tag}
                    </span>
                    <Heading as="h2" className="text-[19px] leading-snug">
                      {article.title}
                    </Heading>
                    {article.excerpt ? (
                      <p className="text-copy-sm text-pretty text-muted">
                        {article.excerpt}
                      </p>
                    ) : (
                      /*
                        No excerpt has been written for this piece. Replace by
                        setting `excerpt` on the article in
                        src/content/site.ts — never invent a summary.
                      */
                      <p className="font-mono text-meta text-dim">
                        [ {grid.excerptPending} ]
                      </p>
                    )}
                    <span className="mt-auto pt-2 text-meta text-dim">
                      {article.href ? grid.readLabel : grid.pendingLabel}
                    </span>
                  </>
                );

                return (
                  <Reveal key={article.title} delay={(index % 3) * 70}>
                    {article.href ? (
                      <a href={article.href} className={cardClass}>
                        {inner}
                      </a>
                    ) : (
                      <article className={cardClass}>{inner}</article>
                    )}
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 py-6 text-center">
              <p className="font-mono text-meta text-dim">
                [ {grid.empty.message} ]
              </p>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onSelect ? () => onSelect("All") : undefined}
              >
                {grid.empty.cta}
              </Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

function LiveLibrary() {
  const searchParams = useSearchParams();
  const selected = tagFromSlug(searchParams.get("tag"));

  function select(tag: FilterTag) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === "All") params.delete("tag");
    else params.set("tag", slugify(tag));

    // The native History API is wired into the Next router, so this updates
    // `useSearchParams` — and therefore the grid — without a navigation or a
    // reload. `replaceState`, not `pushState`: a chip is a view preference,
    // not a place in the visitor's history.
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `?${query}` : window.location.pathname,
    );
  }

  return <Library selected={selected} onSelect={select} />;
}

/**
 * `useSearchParams` opts the tree below it out of prerendering, so the
 * Suspense fallback is the unfiltered library: the static HTML carries every
 * card, and the deep-linked filter is applied on hydration.
 */
export function InsightsLibrary() {
  return (
    <Suspense fallback={<Library selected="All" />}>
      <LiveLibrary />
    </Suspense>
  );
}
