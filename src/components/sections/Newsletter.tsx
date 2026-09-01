"use client";

import { useState, type FormEvent } from "react";
import { newsletter } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

type Status = "idle" | "sending" | "done" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "done") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="newsletter" divide="bottom">
      <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-5 px-7 py-24 text-center">
        <Eyebrow>{newsletter.eyebrow}</Eyebrow>
        <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)]">
          {newsletter.heading}
        </Heading>
        <p className="max-w-lg text-copy text-pretty text-muted">
          {newsletter.body}
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-2 flex w-full max-w-[480px] flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "done"}
            placeholder="Your email address"
            className="flex-1 rounded-sm border border-line-input bg-ink-raised px-[18px] py-3.5 text-copy-sm text-body outline-none transition-colors placeholder:text-dim focus:border-gold disabled:opacity-60"
          />
          <Button
            type="submit"
            disabled={status === "sending" || status === "done"}
            size="md"
            padding="px-[26px] py-3.5"
            className="disabled:cursor-default disabled:opacity-80"
          >
            {status === "done"
              ? newsletter.done
              : status === "sending"
                ? "Joining…"
                : newsletter.cta}
          </Button>
        </form>

        <p aria-live="polite" className="min-h-5 text-meta text-dim">
          {status === "done" && "You’re on the list — thank you."}
          {status === "error" &&
            "Something went wrong. Please try again in a moment."}
        </p>
      </Reveal>
    </Section>
  );
}
