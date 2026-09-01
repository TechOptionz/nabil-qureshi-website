import Anthropic from "@anthropic-ai/sdk";
import { ChatError } from "./types";
import type { ChatMessage, ChatProvider, ChatReply } from "./types";

/**
 * The fallback assistant, used when Aleesa Web Chat is not configured.
 *
 * Everything the bot knows is in SYSTEM_PROMPT below — this file *is* the
 * knowledge base, so retraining it means editing here. Once the two ALEESA_
 * variables are set (see provider.ts) this file stops running entirely and
 * the bot is trained in the Aleesa dashboard instead.
 */

const MODEL = "claude-opus-5";

/**
 * The assistant's whole world. Kept as a frozen constant so it stays a stable
 * cache prefix and cannot be influenced by anything the visitor sends.
 */
const SYSTEM_PROMPT = `You are the website assistant for NabilQureshi.com, the authority platform of Nabil Qureshi. Nabil shares practical insights across three pillars: Property & Wealth (property investment, home-and-land, finance, long-term wealth creation), Business, Technology & AI (systems, automation, AI for small and medium businesses), and Health & Wellness (energy, resilience, sustainable performance). Visitors can: explore insights articles, join the newsletter, invite Nabil to speak at events or podcasts, or start a conversation via the contact form for advisory and collaboration.

Rules:
- Answer only from this approved context.
- Be warm, concise (2-4 sentences) and practical.
- When relevant, point the visitor to the matching section of the site or the contact form.
- When the question asks for advice, note that this is general information and not professional financial, property or health advice.
- Never invent claims, statistics or credentials about Nabil.
- Reply with plain text only: no markdown, no asterisks, no bullets, no headings.`;

/** The design-canvas original stripped markdown from replies; keep that. */
function toPlainText(text: string): string {
  return text
    .replace(/\*\*|__/g, "")
    .replace(/(^|\n)\s*[#>]+\s*/g, "$1")
    .replace(/(^|\n)\s*[-*]\s+/g, "$1")
    .replace(/\*/g, "")
    .trim();
}

/** Shown instead of an answer when the model declines the question. */
const REFUSAL =
  "I would rather not answer that one. Please use the contact form below and Nabil's team will help.";

export const anthropicProvider: ChatProvider = {
  name: "anthropic",
  async reply(messages: ChatMessage[]): Promise<ChatReply> {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new ChatError("ANTHROPIC_API_KEY is not set", 503);
    }

    if (!messages.length || messages[messages.length - 1].role !== "user") {
      throw new ChatError("The conversation must end with a visitor message", 400);
    }

    const client = new Anthropic();

    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        thinking: { type: "adaptive" },
        output_config: { effort: "low" },
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: messages.map(({ role, content }) => ({ role, content })),
      });

      const reply = response.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n")
        .trim();

      if (response.stop_reason === "refusal" || !reply) {
        return { content: REFUSAL };
      }

      return { content: toPlainText(reply) };
    } catch (error) {
      if (error instanceof Anthropic.RateLimitError) {
        throw new ChatError("Anthropic rate limit reached", 429);
      }
      if (error instanceof Anthropic.AuthenticationError) {
        throw new ChatError("Anthropic auth failed — check ANTHROPIC_API_KEY", 503);
      }
      if (error instanceof Anthropic.APIError) {
        throw new ChatError(
          `Anthropic API error ${error.status}: ${error.message}`,
          502,
        );
      }
      throw error;
    }
  },
};
