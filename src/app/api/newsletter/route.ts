import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/chat/leads";
import { MAX_EMAIL_LENGTH } from "@/lib/chat/types";
import type { LeadSource } from "@/lib/chat/types";
import { isValidEmail } from "@/lib/chat/validate";

export const runtime = "nodejs";

/**
 * The email-only capture points, and the line filed against each in Aleesa —
 * the address alone says nothing about what the visitor actually asked for.
 * The newsletter signup and the three resource lead magnets all post here;
 * `source` is what tells them apart in the CRM.
 */
const REQUESTS: Partial<Record<LeadSource, string>> = {
  newsletter: "Newsletter signup.",
  "ai-scorecard":
    "Requested the free resource: Small Business AI Readiness Scorecard.",
  "property-checklist":
    "Requested the free resource: The Property Decision Checklist.",
  "wellness-planner":
    "Requested the free resource: Weekly Performance and Wellness Planner.",
};

function parseSource(value: unknown): LeadSource | null {
  return typeof value === "string" && value in REQUESTS
    ? (value as LeadSource)
    : null;
}

/**
 * Files an email-only signup as a Lead in Aleesa (see lib/chat/leads).
 *
 * Aleesa records the request; actually *delivering* the resource PDF is a
 * separate step — either an Aleesa automation on the matching `formId`, or
 * the email provider once one is chosen.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  const email =
    typeof raw.email === "string"
      ? raw.email.trim().slice(0, MAX_EMAIL_LENGTH)
      : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  // Unknown or missing source: treat it as the newsletter, which is what the
  // original signup posted before the lead magnets shared this route.
  const source = parseSource(raw.source) ?? "newsletter";

  try {
    await deliverLead({
      email,
      message: REQUESTS[source] as string,
      source,
      transcript: [],
    });
  } catch (error) {
    console.error("[newsletter] delivery failed", error);
    return NextResponse.json(
      { error: "Could not sign you up just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
