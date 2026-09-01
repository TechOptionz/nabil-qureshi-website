export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatReply = {
  content: string;
};

/**
 * Per-visitor context that travels with a turn.
 *
 * Only stateful providers use it. Aleesa needs `sessionId` to keep the
 * conversation together across turns and to file it in the right inbox
 * thread; the customer fields enrich the contact record it creates. The
 * Anthropic provider ignores all of it.
 */
export type ChatContext = {
  sessionId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  /** Path the visitor was on, so the reply can be read in context. */
  page?: string;
};

/**
 * Anything that can answer a conversation. Implemented by the Aleesa Web Chat
 * adapter and the Anthropic fallback.
 */
export type ChatProvider = {
  name: string;
  reply(messages: ChatMessage[], context?: ChatContext): Promise<ChatReply>;
};

/**
 * A provider failure with the HTTP status the route should answer with.
 *
 * The providers know why they failed — a missing key is not a rate limit is
 * not an upstream 500 — and that distinction is worth keeping in the response
 * status even though the widget shows the same line either way. `message` is
 * for the server log only; the route never forwards it to the browser.
 */
export class ChatError extends Error {
  readonly status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = "ChatError";
    this.status = status;
  }
}

/** Where a lead came from, so the destination can route it. */
export type LeadSource =
  | "chat"
  | "contact-form"
  | "newsletter"
  | "ai-scorecard"
  | "property-checklist"
  | "wellness-planner";

export type Lead = {
  /** Absent for the email-only signups, which never ask for one. */
  name?: string;
  email: string;
  message: string;
  source: LeadSource;
  /** Only the enquiry form asks for these. */
  company?: string;
  topic?: string;
  /** Whether the visitor ticked the contact form's consent box. */
  consent?: boolean;
  /** Conversation leading up to the capture, for context. */
  transcript: ChatMessage[];
};

/** A single chat turn. Matches the cap the Anthropic route already applied. */
export const MAX_MESSAGE_LENGTH = 1000;
/** A form message body, which is allowed to be a good deal longer. */
export const MAX_BRIEF_LENGTH = 4000;
export const MAX_HISTORY = 20;
export const MAX_NAME_LENGTH = 120;
export const MAX_EMAIL_LENGTH = 200;
