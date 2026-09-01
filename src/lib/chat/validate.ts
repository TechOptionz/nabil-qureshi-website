import { MAX_HISTORY, MAX_MESSAGE_LENGTH } from "./types";
import type { ChatContext, ChatMessage } from "./types";

/**
 * Accepts unknown JSON and returns a safe message list, or null if invalid.
 *
 * The widget posts `{ role, text }` — the shape the design canvas shipped
 * with — while everything server side speaks `{ role, content }`. Both are
 * read here so the wire format stays as it was and the providers still see
 * one shape.
 */
export function parseMessages(input: unknown): ChatMessage[] | null {
  if (!input || typeof input !== "object") return null;
  const raw = (input as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  // Only the most recent turns are trusted, to cap payload size.
  for (const item of raw.slice(-MAX_HISTORY)) {
    if (!item || typeof item !== "object") return null;
    const { role, text, content } = item as {
      role?: unknown;
      text?: unknown;
      content?: unknown;
    };
    if (role !== "user" && role !== "assistant") return null;
    const body = typeof text === "string" ? text : content;
    if (typeof body !== "string") return null;
    const trimmed = body.trim();
    if (!trimmed) continue;
    messages.push({ role, content: trimmed.slice(0, MAX_MESSAGE_LENGTH) });
  }

  return messages.length ? messages : null;
}

/** Deliberately permissive — enough to catch typos, not to police addresses. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Pulls the optional per-visitor context off a request body.
 *
 * Everything here is browser-supplied, so it is bounded and charset-limited
 * before it reaches Aleesa: the session id groups a conversation, so a junk
 * or oversized one would either poison a thread or be rejected downstream.
 */
export function parseChatContext(input: unknown): ChatContext {
  if (!input || typeof input !== "object") return {};
  const raw = input as Record<string, unknown>;

  const text = (value: unknown, max: number): string | undefined => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim().slice(0, max);
    return trimmed || undefined;
  };

  const sessionId = text(raw.sessionId, 64);

  return {
    // Ids are minted client-side as `chat_<uuid>`; accept that shape only.
    sessionId:
      sessionId && /^[A-Za-z0-9_-]+$/.test(sessionId) ? sessionId : undefined,
    customerName: text(raw.customerName, 120),
    customerEmail: text(raw.customerEmail, 200),
    customerPhone: text(raw.customerPhone, 40),
    page: text(raw.page, 200),
  };
}
