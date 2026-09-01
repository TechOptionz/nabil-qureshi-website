import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/chat/leads";
import {
  MAX_BRIEF_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
} from "@/lib/chat/types";
import { isValidEmail } from "@/lib/chat/validate";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  topic?: string;
  message: string;
  consent: boolean;
};

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parse(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = body as Record<string, unknown>;

  const name = text(raw.name, MAX_NAME_LENGTH);
  const email = text(raw.email, MAX_EMAIL_LENGTH);
  const message = text(raw.message, MAX_BRIEF_LENGTH);

  if (!name || !message) return null;
  if (!isValidEmail(email)) return null;

  return {
    name,
    email,
    company: text(raw.company, MAX_NAME_LENGTH) || undefined,
    topic: text(raw.topic, MAX_EMAIL_LENGTH) || undefined,
    message,
    consent: raw.consent === true,
  };
}

/**
 * Accepts the enquiry and files it as a Lead in Aleesa (see lib/chat/leads).
 *
 * The browser-side honeypot in ContactEnquiryForm only stops a bot that
 * drives the form; one that POSTs here directly never sees it, so the same
 * trap is checked again below.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot tripped. Answer exactly as a success so the script learns
  // nothing, and file nothing.
  if (text((body as Record<string, unknown>)?.website, 1)) {
    return NextResponse.json({ ok: true });
  }

  const payload = parse(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Please provide a name, a valid email address and a message." },
      { status: 400 },
    );
  }

  try {
    await deliverLead({ ...payload, source: "contact-form", transcript: [] });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { error: "Could not send that through. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
