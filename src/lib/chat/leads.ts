import { sendLeadToAleesa } from "./aleesa-leads";
import type { Lead } from "./types";

/**
 * THE DESTINATION FOR CAPTURED LEADS.
 *
 * Every capture point — the enquiry form on /contact, the newsletter signup,
 * and the three resource lead magnets — routes through here, so there is one
 * place to maintain.
 *
 * The primary destination is the Aleesa CRM (see ./aleesa-leads).
 * LEADS_WEBHOOK_URL is supported on top of it as an optional extra hop for
 * another CRM or automation tool.
 *
 * With neither configured the lead is logged server-side so the flow is
 * testable end to end — logs are not durable storage, so
 * ALEESA_WEBSITE_FORM_API_KEY must be set before launch.
 */
export async function deliverLead(lead: Lead): Promise<void> {
  // Awaited rather than left floating: a serverless function is frozen the
  // moment it responds, so an un-awaited write here would simply be dropped.
  const delivery = await sendLeadToAleesa(lead).then(
    (result) => ({ ok: true as const, result }),
    (error: unknown) => ({ ok: false as const, error }),
  );

  if (!delivery.ok) {
    console.error("[lead] Aleesa delivery failed", delivery.error);
  }

  if (delivery.ok && delivery.result === "skipped") {
    console.info("[lead] captured (no delivery destination configured)", {
      source: lead.source,
      name: lead.name,
      email: lead.email,
      topic: lead.topic,
      length: lead.message.length,
      messages: lead.transcript.length,
    });
  }

  const url = process.env.LEADS_WEBHOOK_URL;

  // Nothing holds the lead. Surface it to the visitor rather than showing a
  // confirmation for a message that went nowhere — unless a webhook is
  // configured, which is then the one destination left to try.
  if (!delivery.ok && !url) throw delivery.error;

  if (!url) return;

  if (delivery.ok) {
    // Deliberately not awaited: Aleesa already has the lead, and a slow or
    // broken webhook must not fail the visitor's submission.
    void postWebhook(url, lead).catch((error) => {
      console.error("[lead] webhook failed", error);
    });
    return;
  }

  // Aleesa rejected it, so the webhook is the only destination left — its
  // result now decides whether the visitor sees a confirmation.
  await postWebhook(url, lead);
}

async function postWebhook(url: string, lead: Lead): Promise<void> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.LEADS_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.LEADS_WEBHOOK_SECRET}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook responded ${response.status}`);
  }
}
