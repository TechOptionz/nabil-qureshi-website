import { NextResponse } from "next/server";
import { getChatProvider } from "@/lib/chat/provider";
import { ChatError } from "@/lib/chat/types";
import { parseChatContext, parseMessages } from "@/lib/chat/validate";

export const runtime = "nodejs";

/**
 * Answers a conversation turn. The provider is chosen in lib/chat/provider.ts:
 * Aleesa Web Chat when it is configured, the Anthropic assistant otherwise.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json(
      { error: "Expected a non-empty `messages` array." },
      { status: 400 },
    );
  }

  if (messages[messages.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "The conversation must end with a visitor message." },
      { status: 400 },
    );
  }

  // Optional; only stateful providers (Aleesa) read it.
  const context = parseChatContext(body);

  try {
    const reply = await getChatProvider().reply(messages, context);
    return NextResponse.json({ reply: reply.content });
  } catch (error) {
    // Never surface provider internals to the browser: the detail goes to the
    // server log, the visitor gets the widget's own error line.
    console.error("[chat] provider failed", error);

    const status = error instanceof ChatError ? error.status : 500;
    return NextResponse.json(
      {
        error:
          status === 429
            ? "The assistant is busy right now. Please try again shortly."
            : status === 503
              ? "The assistant is not configured on this deployment."
              : "The assistant could not respond.",
      },
      { status },
    );
  }
}
