"use client";

import { useRef, useState, type FormEvent } from "react";
import { contact, contactPage } from "@/content/site";
import { Button } from "@/components/ui/Button";

const { form } = contactPage;

type Status = "idle" | "sending" | "sent" | "error";

type Values = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
  consent: boolean;
  /** Honeypot. Always empty for a real visitor. */
  website: string;
};

/** The five controls that can hold an error, in DOM order. */
type FieldName = "name" | "email" | "topic" | "message" | "consent";

const FIELD_ORDER: FieldName[] = [
  "name",
  "email",
  "topic",
  "message",
  "consent",
];

type Errors = Partial<Record<FieldName, string>>;
type Touched = Partial<Record<FieldName, boolean>>;

/**
 * Deliberately permissive: this only needs to catch the obvious mistakes
 * before the request is made. `/api/contact` applies the same check server
 * side, and it is the one that decides.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: FieldName, values: Values): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim() ? undefined : form.errors.name;
    case "email":
      return EMAIL.test(values.email.trim()) ? undefined : form.errors.email;
    case "topic":
      return values.topic ? undefined : form.errors.topic;
    case "message":
      return values.message.trim() ? undefined : form.errors.message;
    case "consent":
      return values.consent ? undefined : form.errors.consent;
  }
}

const control =
  "w-full rounded-sm border bg-ink px-4 py-3.5 text-copy-sm text-body outline-none transition-colors placeholder:text-dim focus:border-gold";

/*
  An invalid control is marked with the same gold as focus, because gold is
  the only accent the palette has. The state is never carried by colour alone:
  every error also renders visible text wired up through `aria-describedby`.
  A dedicated `--color-danger` token in `globals.css` would let the two read
  apart at a glance — that is a design decision, so it is not invented here.
*/
function borderFor(invalid: boolean) {
  return invalid ? "border-gold" : "border-line-input";
}

const labelClass = "mb-2 block text-ui font-medium text-body-soft";
const errorClass = "mt-2 text-meta text-gold";

/*
  `appearance-none` because the native checkbox ignores the panel's palette and
  renders as a pale box on the dark card. The tick is the usual rotated-border
  glyph on `::before`, which a checkbox can carry once its native appearance is
  switched off.
*/
const consentBox =
  "relative mt-0.5 size-[18px] shrink-0 appearance-none rounded-xs border bg-ink transition-colors checked:border-gold checked:bg-gold before:absolute before:top-[1px] before:left-[5px] before:h-[9px] before:w-[4px] before:rotate-45 before:border-r-2 before:border-b-2 before:border-ink-on-gold before:opacity-0 before:content-[''] checked:before:opacity-100";

export function ContactEnquiryForm({ initialTopic }: { initialTopic: string }) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    company: "",
    topic: initialTopic,
    message: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<Status>("idle");

  const refs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // Only re-validate a field the visitor has already left once, so an error
    // never appears while they are still part-way through typing it.
    if (touched[key as FieldName]) {
      setErrors((current) => ({
        ...current,
        [key]: validate(key as FieldName, next),
      }));
    }
  }

  function onBlur(field: FieldName) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validate(field, values) }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found: Errors = {};
    for (const field of FIELD_ORDER) found[field] = validate(field, values);

    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      setErrors(found);
      setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));
      refs.current[firstInvalid]?.focus();
      return;
    }

    /*
      Honeypot tripped: acknowledge it exactly as a success so the script
      learns nothing, and send nothing. `/api/contact` checks the same field
      again, for a bot that POSTs to the endpoint without driving the form.
    */
    if (values.website) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      /*
        `/api/contact` files the enquiry as a Lead in Aleesa, carrying every
        field below — see `src/lib/chat/aleesa-leads.ts`. Without
        ALEESA_WEBSITE_FORM_API_KEY set it falls back to a server-side log,
        which is enough to exercise the flow but not to launch on.
      */
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          topic: values.topic,
          message: values.message.trim(),
          consent: values.consent,
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  // The confirmation state from the home design, reusing the same two lines.
  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border border-line-soft bg-ink-raised px-10 py-16 text-center">
        <p className="font-serif text-[26px] text-gold">
          {contact.successHeading}
        </p>
        <p className="max-w-[38ch] text-copy-sm text-pretty text-muted">
          {contact.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-4.5 rounded-lg border border-line-soft bg-ink-raised p-10"
    >
      <div className="grid gap-4.5 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className={labelClass}>
            {form.name.label}
          </label>
          <input
            id="enquiry-name"
            name="name"
            ref={(node) => {
              refs.current.name = node;
            }}
            required
            autoComplete="name"
            placeholder={form.name.placeholder}
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            className={`${control} ${borderFor(Boolean(errors.name))}`}
          />
          {errors.name && (
            <p id="enquiry-name-error" role="alert" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-email" className={labelClass}>
            {form.email.label}
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            ref={(node) => {
              refs.current.email = node;
            }}
            required
            autoComplete="email"
            placeholder={form.email.placeholder}
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            className={`${control} ${borderFor(Boolean(errors.email))}`}
          />
          {errors.email && (
            <p id="enquiry-email-error" role="alert" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-company" className={labelClass}>
          {form.company.label}{" "}
          <span className="font-normal text-dim">
            ({form.company.optional})
          </span>
        </label>
        <input
          id="enquiry-company"
          name="company"
          autoComplete="organization"
          placeholder={form.company.placeholder}
          value={values.company}
          onChange={(event) => set("company", event.target.value)}
          className={`${control} border-line-input`}
        />
      </div>

      <div>
        <label htmlFor="enquiry-topic" className={labelClass}>
          {form.topic.label}
        </label>
        <select
          id="enquiry-topic"
          name="topic"
          ref={(node) => {
            refs.current.topic = node;
          }}
          required
          value={values.topic}
          onChange={(event) => set("topic", event.target.value)}
          onBlur={() => onBlur("topic")}
          aria-invalid={errors.topic ? true : undefined}
          aria-describedby={errors.topic ? "enquiry-topic-error" : undefined}
          className={`${control} select-field pr-11 ${borderFor(Boolean(errors.topic))}`}
        >
          {contact.enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p id="enquiry-topic-error" role="alert" className={errorClass}>
            {errors.topic}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="enquiry-message" className={labelClass}>
          {form.message.label}
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          ref={(node) => {
            refs.current.message = node;
          }}
          required
          rows={5}
          placeholder={contact.messagePlaceholder}
          value={values.message}
          onChange={(event) => set("message", event.target.value)}
          onBlur={() => onBlur("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "enquiry-message-error" : undefined
          }
          className={`${control} ${borderFor(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p id="enquiry-message-error" role="alert" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      {/*
        Honeypot. `hidden` keeps it out of the accessibility tree and off the
        tab order for everyone except a form-filling script.
      */}
      <div hidden aria-hidden>
        <label htmlFor="enquiry-website">{form.honeypot.label}</label>
        <input
          id="enquiry-website"
          name={form.honeypot.name}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => set("website", event.target.value)}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="enquiry-consent"
            name="consent"
            type="checkbox"
            ref={(node) => {
              refs.current.consent = node;
            }}
            required
            checked={values.consent}
            onChange={(event) => set("consent", event.target.checked)}
            onBlur={() => onBlur("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={
              errors.consent ? "enquiry-consent-error" : undefined
            }
            className={`${consentBox} ${borderFor(Boolean(errors.consent))}`}
          />
          <label
            htmlFor="enquiry-consent"
            className="text-ui text-body-soft"
          >
            {form.consent.label}
          </label>
        </div>
        {errors.consent && (
          <p id="enquiry-consent-error" role="alert" className={errorClass}>
            {errors.consent}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        size="lg"
        className="mt-1 w-full disabled:opacity-70"
      >
        {status === "sending" ? form.sending : contact.submit}
      </Button>

      <p aria-live="polite" className="min-h-5 text-meta text-dim">
        {status === "error" && form.errors.submit}
      </p>
    </form>
  );
}
