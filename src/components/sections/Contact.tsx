"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading, Section } from "@/components/ui/Section";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-sm border border-line-input bg-ink-raised px-4 py-3.5 text-ui text-body outline-none transition-colors placeholder:text-dim focus:border-gold";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" tone="raised">
      <div className="shell grid gap-12 py-24 lg:grid-cols-2 lg:gap-[72px] lg:py-28">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <Heading className="text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight">
            {contact.heading}
          </Heading>
          <p className="text-copy text-pretty text-muted">
            {contact.body}
          </p>
          <ul className="mt-2 flex flex-col gap-2.5 text-ui text-body-soft">
            {contact.services.map((service) => (
              <li key={service.label}>
                <span className="font-semibold text-gold">{service.label}</span>{" "}
                — {service.body}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          {status === "sent" ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border border-line-soft bg-ink px-10 py-12 text-center">
              <p className="font-serif text-[26px] text-gold">
                {contact.successHeading}
              </p>
              <p className="text-copy-sm text-muted">
                {contact.successBody}
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4.5 rounded-lg border border-line-soft bg-ink p-10"
            >
              <div className="grid gap-4.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Name"
                    autoComplete="name"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    autoComplete="email"
                    className={field}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="sr-only">
                  What is your enquiry about?
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  defaultValue={contact.enquiryTypes[0]}
                  className={`${field} select-field pr-11`}
                >
                  {contact.enquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={contact.messagePlaceholder}
                  className={`${field} resize-y`}
                />
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                size="lg"
                padding="py-[15px]"
                className="disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : contact.submit}
              </Button>

              <p aria-live="polite" className="min-h-5 text-meta text-dim">
                {status === "error" &&
                  "Your message could not be sent. Please try again shortly."}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
