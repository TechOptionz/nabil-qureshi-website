"use client";

import { useState, type FormEvent } from "react";
import { property } from "@/content/site";
import { Button } from "@/components/ui/Button";

const { resource } = property;

type Status = "idle" | "sending" | "done" | "error";

/**
 * Stubbed delivery. Nothing is sent and nothing is stored: the request is
 * acknowledged locally so the form's states can be exercised before launch.
 *
 * TODO(launch): replace with the real email provider — POST the address to
 * Mailchimp / ConvertKit / Beehiiv (as `/api/newsletter` will be wired) and
 * have it deliver "The Property Decision Checklist". Throwing from here is
 * what drives the error state, so surface the provider's failures.
 */
async function requestChecklist(email: string): Promise<void> {
  console.info("[property-checklist] request", { email: email.slice(0, 200) });
  await new Promise((resolve) => setTimeout(resolve, 700));
}

/**
 * The lead-magnet form for the /property resource band. Mirrors the newsletter
 * form's box and states; kept as its own client island so the page itself can
 * stay a server component and export `metadata`.
 */
export function PropertyChecklistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "done") return;

    setStatus("sending");
    try {
      await requestChecklist(email);
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
        <label htmlFor="property-checklist-email" className="sr-only">
          {resource.fieldLabel}
        </label>
        <input
          id="property-checklist-email"
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
          className="disabled:cursor-default disabled:opacity-80"
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
