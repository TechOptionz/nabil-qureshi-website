import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = "claude-opus-5";
const MAX_HISTORY = 20;
const MAX_LENGTH = 1000;

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

type IncomingMessage = { role: "user" | "assistant"; text: string };

function isMessage(value: unknown): value is IncomingMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.text === "string"
  );
}

/** The design-canvas original stripped markdown from replies; keep that. */
function toPlainText(text: string): string {
  return text
    .replace(/\*\*|__/g, "")
    .replace(/(^|\n)\s*[#>]+\s*/g, "$1")
    .replace(/(^|\n)\s*[-*]\s+/g, "$1")
    .replace(/\*/g, "")
    .trim();
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "The assistant is not configured on this deployment." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return NextResponse.json(
      { error: "Expected a non-empty `messages` array." },
      { status: 400 },
    );
  }

  const messages: Anthropic.MessageParam[] = raw
    .filter(isMessage)
    .slice(-MAX_HISTORY)
    .map((message) => ({
      role: message.role,
      content: message.text.slice(0, MAX_LENGTH),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "The conversation must end with a visitor message." },
      { status: 400 },
    );
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
      messages,
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (response.stop_reason === "refusal" || !reply) {
      return NextResponse.json(
        {
          reply:
            "I would rather not answer that one. Please use the contact form below and Nabil's team will help.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ reply: toPlainText(reply) });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "The assistant is busy right now. Please try again shortly." },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth failed — check ANTHROPIC_API_KEY.");
      return NextResponse.json(
        { error: "The assistant is not configured correctly." },
        { status: 503 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${error.status}:`, error.message);
      return NextResponse.json(
        { error: "The assistant could not respond." },
        { status: 502 },
      );
    }

    console.error("Unexpected chat failure:", error);
    return NextResponse.json(
      { error: "The assistant could not respond." },
      { status: 500 },
    );
  }
}
