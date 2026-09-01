import { site } from "@/content/site";
import { ChatError } from "./types";
import type { ChatContext, ChatMessage, ChatProvider, ChatReply } from "./types";

/**
 * Adapter for Aleesa Web Chat.
 *
 * Active as soon as ALEESA_WEBHOOK_URL and ALEESA_WEBCHAT_API_KEY are set
 * (see provider.ts). Unlike the Anthropic fallback, Aleesa is *stateful*: it
 * keeps the transcript, the knowledge base and the agent's persona on its own
 * side, keyed by `sessionId`. So this sends the latest visitor turn, not the
 * history, and not a system prompt — the bot's training lives in the Aleesa
 * dashboard (Knowledge Base + Chat Agent), not in anthropic-provider.ts.
 *
 *   POST {ALEESA_WEBHOOK_URL}/webhooks/web-chat
 *   {
 *     "apiKey":    "…",            // tenant Web Chat API key, server-side only
 *     "sessionId": "chat_…",       // stable per visitor; groups the conversation
 *     "text":      "Hello",
 *     "customerName":  "…",        // optional, enriches the Aleesa contact
 *     "customerEmail": "…",
 *     "customerPhone": "…",
 *     "metadata":  { "page": "/property", "source": "website-widget" }
 *   }
 *
 *   -> { "success": true, "sessionId": "chat_…", "reply": "…" }
 *
 * Every turn also lands in the Aleesa inbox, so a human can take over the
 * conversation from the dashboard.
 */

const TIMEOUT_MS = 30_000;

const PATH = "/webhooks/web-chat";

/** The visitor's newest turn — the only part Aleesa needs from us. */
function latestUserMessage(messages: ChatMessage[]): string | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "user" && message.content.trim()) {
      return message.content.trim();
    }
  }
  return null;
}

function endpoint(): string {
  const configured = (process.env.ALEESA_WEBHOOK_URL ?? "").replace(/\/+$/, "");
  if (!configured) throw new ChatError("ALEESA_WEBHOOK_URL is not set", 503);

  // The Aleesa setup guide prints the *full* endpoint, so the variable is
  // easily pasted with the path already on it. Appending blindly would then
  // POST to /webhooks/web-chat/webhooks/web-chat and 404 — from production,
  // with nothing but a 502 in the browser to debug it by.
  const base = configured.endsWith(PATH)
    ? configured.slice(0, -PATH.length)
    : configured;

  return `${base}${PATH}`;
}

/** Strips the protocol so the metadata carries a bare host, as Aleesa shows it. */
const SITE_HOST = site.url.replace(/^https?:\/\//, "").replace(/\/+$/, "");

export const aleesaProvider: ChatProvider = {
  name: "aleesa",
  async reply(
    messages: ChatMessage[],
    context?: ChatContext,
  ): Promise<ChatReply> {
    const apiKey = process.env.ALEESA_WEBCHAT_API_KEY;
    if (!apiKey) throw new ChatError("ALEESA_WEBCHAT_API_KEY is not set", 503);

    const text = latestUserMessage(messages);
    if (!text) throw new ChatError("No visitor message to send", 400);

    // Without a session id Aleesa would start a fresh conversation on every
    // turn, so the bot would lose the thread. The widget supplies one; this
    // is only a backstop for callers that don't.
    const sessionId = context?.sessionId ?? `chat_${crypto.randomUUID()}`;

    let response: Response;
    try {
      response = await fetch(endpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          sessionId,
          text,
          customerName: context?.customerName,
          customerEmail: context?.customerEmail,
          customerPhone: context?.customerPhone,
          metadata: {
            source: "website-widget",
            site: SITE_HOST,
            page: context?.page,
          },
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch (error) {
      // Timeout or DNS/connection failure. 504 rather than 502 so a slow
      // Aleesa is distinguishable from one that answered with an error.
      throw new ChatError(
        `Aleesa Web Chat unreachable: ${(error as Error).message}`,
        504,
      );
    }

    if (!response.ok) {
      throw new ChatError(
        `Aleesa Web Chat responded ${response.status}`,
        response.status === 429 ? 429 : 502,
      );
    }

    const body = (await response.json().catch(() => null)) as {
      success?: boolean;
      reply?: unknown;
      message?: unknown;
    } | null;

    // Aleesa can answer 200 with success:false (bad key, chat disabled for the
    // tenant). Treat that as a failure rather than echoing an empty bubble.
    if (body?.success === false) {
      throw new ChatError(
        typeof body.message === "string"
          ? `Aleesa Web Chat rejected the request: ${body.message}`
          : "Aleesa Web Chat rejected the request",
        502,
      );
    }

    const reply = typeof body?.reply === "string" ? body.reply.trim() : "";
    if (!reply) throw new ChatError("Aleesa Web Chat returned no reply", 502);

    return { content: reply };
  },
};
