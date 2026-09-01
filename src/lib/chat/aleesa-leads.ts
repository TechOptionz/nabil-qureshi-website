import { site } from "@/content/site";
import type { Lead } from "./types";

/**
 * Adapter for the Aleesa Website Form intake.
 *
 * Every captured lead — the enquiry form on /contact, the newsletter signup
 * and the three resource lead magnets — is filed in the Aleesa CRM, where it
 * lands as a Lead with `leadSource: "website_form"` alongside the full
 * submission. See ./leads for the routing around it.
 *
 *   POST {ALEESA_API_URL}/api/v1/integrations/website-form/submit
 *   x-api-key: wform_…
 *   {
 *     "formId":    "contact-enquiry",
 *     "originUrl": "https://nabilqureshi.com/contact",
 *     "fields":    { "full_name": "…", "email": "…", … }
 *   }
 *
 *   -> 201 { "success": true, "data": { "submissionId": "…", "leadId": "L-…" } }
 *
 * Aleesa derives the contact record from the field *names*, matching
 * `full_name` / `name` and `email` (case-insensitively) — so those two keys
 * are part of the contract, not cosmetic. Everything else is carried through
 * verbatim onto the lead's notes and its submission detail page.
 */

const TIMEOUT_MS = 15_000;

const PATH = "/api/v1/integrations/website-form/submit";

/** Which form a submission came from, shown against the lead in Aleesa. */
const FORM_IDS: Record<Lead["source"], string> = {
  chat: "chat-widget",
  "contact-form": "contact-enquiry",
  newsletter: "newsletter-signup",
  "ai-scorecard": "ai-readiness-scorecard",
  "property-checklist": "property-decision-checklist",
  "wellness-planner": "wellness-planner",
};

/** The page the visitor submitted from, for the lead's origin column. */
const ORIGINS: Record<Lead["source"], string> = {
  chat: site.url,
  "contact-form": `${site.url}/contact`,
  newsletter: `${site.url}/#newsletter`,
  "ai-scorecard": `${site.url}/business-ai`,
  "property-checklist": `${site.url}/property`,
  "wellness-planner": `${site.url}/wellness`,
};

function endpoint(): string {
  const configured = (process.env.ALEESA_API_URL ?? "").replace(/\/+$/, "");
  if (!configured) throw new Error("ALEESA_API_URL is not set");

  // The Aleesa dashboard prints the *full* submit URL, so the variable is
  // easily pasted with the path already on it. Appending blindly would then
  // POST to …/submit/api/v1/integrations/website-form/submit and 404 — from
  // production, with nothing but a logged failure to debug it by.
  const base = configured.endsWith(PATH)
    ? configured.slice(0, -PATH.length)
    : configured;

  return `${base}${PATH}`;
}

/**
 * Chat leads carry the conversation that led to the capture. Aleesa stores
 * flat string fields, so the turns are folded into one — the alternative,
 * a field per turn, would blow past its 50-field cap on a long chat and
 * bury the contact details in the CRM notes.
 */
function renderTranscript(lead: Lead): string {
  return lead.transcript
    .map(
      (message) =>
        `${message.role === "user" ? "Visitor" : "Assistant"}: ${message.content}`,
    )
    .join("\n");
}

/** Undefined entries are dropped so Aleesa never records an empty field. */
function buildFields(lead: Lead): Record<string, string> {
  const fields: Record<string, string | undefined> = {
    full_name: lead.name,
    email: lead.email,
    company: lead.company,
    topic: lead.topic,
    message: lead.message,
    source: lead.source,
    // Written only when the form actually asks, so a lead magnet's record
    // does not carry a misleading "no" against a box it never showed.
    marketing_consent:
      lead.consent === undefined ? undefined : lead.consent ? "yes" : "no",
    transcript: lead.transcript.length ? renderTranscript(lead) : undefined,
  };

  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => Boolean(value?.trim())),
  ) as Record<string, string>;
}

/**
 * Files the lead in the Aleesa CRM.
 *
 * Returns "skipped" when ALEESA_WEBSITE_FORM_API_KEY is unset, so the site
 * still runs — and every form still works — without it. Throws when the key
 * is configured but Aleesa rejects the submission.
 */
export async function sendLeadToAleesa(lead: Lead): Promise<"sent" | "skipped"> {
  const apiKey = process.env.ALEESA_WEBSITE_FORM_API_KEY;
  if (!apiKey) return "skipped";

  const response = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // The key travels as a header rather than in the body: Aleesa accepts
      // either, and a header keeps it out of any request-body logging.
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      formId: FORM_IDS[lead.source],
      originUrl: ORIGINS[lead.source],
      fields: buildFields(lead),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  const body = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: unknown;
  } | null;

  if (!response.ok || body?.success === false) {
    // 401 here means the key is wrong, revoked, or the Website Form
    // integration was disconnected in the Aleesa dashboard — regenerating the
    // key invalidates the old one immediately.
    const detail = typeof body?.message === "string" ? `: ${body.message}` : "";
    throw new Error(`Aleesa website form responded ${response.status}${detail}`);
  }

  return "sent";
}
