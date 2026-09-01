"use client";

import { useMemo, useState } from "react";
import { articles, insights } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

export function Insights() {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? articles
        : articles.filter((article) => article.tag === filter),
    [filter],
  );

  return (
    <Section id="insights" divide="top">
      <div className="shell py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="mb-3.5">{insights.eyebrow}</Eyebrow>
            <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)]">
              {insights.heading}
            </Heading>
          </div>
          <p className="max-w-md text-ui text-muted">
            {insights.body}
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Filter insights by topic"
          className="mb-10 flex flex-wrap gap-2"
        >
          {insights.filters.map((tag) => {
            const selected = filter === tag;
            return (
              <Button
                key={tag}
                type="button"
                role="tab"
                variant="chip"
                selected={selected}
                aria-selected={selected}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </Button>
            );
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((article, index) => {
            const inner = (
              <>
                <span className="text-caption tracking-[0.16em] text-gold uppercase">
                  {article.tag}
                </span>
                <span className="font-serif text-[19px] leading-snug text-pretty text-heading">
                  {article.title}
                </span>
                <span className="mt-auto pt-2 text-meta text-dim">
                  {article.href ? "Read article →" : insights.pendingLabel}
                </span>
              </>
            );

            const className =
              "flex h-full flex-col gap-3.5 rounded-lg border border-line bg-ink-raised px-7 py-8 transition-colors hover:border-gold";

            return (
              <Reveal key={article.title} delay={(index % 4) * 70}>
                {article.href ? (
                  <a href={article.href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <article className={className}>{inner}</article>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
