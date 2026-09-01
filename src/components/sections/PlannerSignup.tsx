"use client";

import { useState, type FormEvent } from "react";
import { wellness } from "@/content/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Stubbed delivery handler — nothing is stored and no planner is sent.
 *
 * TODO(launch): connect the real email provider (Mailchimp / ConvertKit /
 * Beehiiv, whichever the newsletter ends up on). It needs to POST the address
 * to that provider, tag the subscriber for the wellness list, and trigger the
 * automation that emails the planner PDF. Reject on a non-2xx response so the
 * error branch below stays reachable. The planner file itself is still
 * outstanding — see `wellness.resource.asset` in `src/content/site.ts`.
 */
async function requestPlanner(email: string): Promise<void> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }
}

/**
 * Lives apart from the page so `/wellness` stays a server component and keeps
 * its `metadata` export. The band around it is in `app/wellness/page.tsx`.
 */
export function PlannerSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "done") return;

    setStatus("sending");
    try {
      await requestPlanner(email.trim());
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mt-2 flex w-full max-w-[480px] flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="planner-email" className="sr-only">
          Your email address
        </label>
        <input
          id="planner-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "done"}
          placeholder="Your email address"
          className="flex-1 rounded-sm border border-line-input bg-ink px-[18px] py-3.5 text-copy-sm text-body outline-none transition-colors placeholder:text-dim focus:border-gold disabled:opacity-60"
        />
        <Button
          type="submit"
          disabled={status === "sending" || status === "done"}
          size="md"
          padding="px-[26px] py-3.5"
          className="disabled:cursor-default disabled:opacity-80"
        >
          {status === "done"
            ? "Sent ✓"
            : status === "sending"
              ? "Sending…"
              : wellness.resource.cta}
        </Button>
      </form>

      <p aria-live="polite" className="min-h-5 text-meta text-dim">
        {status === "done" && "Check your inbox — the planner is on its way."}
        {status === "error" &&
          "Something went wrong. Please try again in a moment."}
      </p>
    </>
  );
}
