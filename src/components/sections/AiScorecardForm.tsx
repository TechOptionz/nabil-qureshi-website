"use client";

import { useState, type FormEvent } from "react";
import { businessAi } from "@/content/site";
import { Button } from "@/components/ui/Button";

const { resource } = businessAi;

type Status = "idle" | "sending" | "done" | "error";

/**
 * Files the request as a Lead in Aleesa, tagged `ai-scorecard` so it is
 * distinguishable from a plain newsletter signup. Throwing is what drives the
 * error state below.
 *
 * TODO(launch): the scorecard itself still has to be *sent*. Either add an
 * Aleesa automation on the `ai-readiness-scorecard` form, or attach the email
 * provider — see `src/app/api/newsletter/route.ts`.
 */
async function requestScorecard(email: string): Promise<void> {
  const response = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "ai-scorecard" }),
  });
  if (!response.ok) throw new Error("Request failed");
}

/**
 * The lead-magnet form for the /business-ai resource band. Mirrors the
 * newsletter form's box and states; kept as its own client island so the page
 * itself can stay a server component and export `metadata`.
 */
export function AiScorecardForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "done") return;

    setStatus("sending");
    try {
      await requestScorecard(email);
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
        <label htmlFor="ai-scorecard-email" className="sr-only">
          {resource.fieldLabel}
        </label>
        <input
          id="ai-scorecard-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "done"}
          placeholder={resource.placeholder}
          className="flex-1 rounded-sm border border-line-input bg-ink px-[18px] py-3.5 text-copy-sm text-body outline-none transition-colors placeholder:text-dim focus:border-gold disabled:opacity-60"
        />
        <Button
          type="submit"
          disabled={status === "sending" || status === "done"}
          size="md"
          padding="px-[26px] py-3.5"
          className="whitespace-nowrap disabled:cursor-default disabled:opacity-80"
        >
          {status === "done"
            ? resource.done
            : status === "sending"
              ? resource.sending
              : resource.submit}
        </Button>
      </form>

      <p aria-live="polite" className="min-h-5 text-meta text-dim">
        {status === "done" && resource.success}
        {status === "error" && resource.error}
      </p>
    </>
  );
}
