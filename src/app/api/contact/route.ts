import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

function parse(body: unknown): ContactPayload | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const topic = typeof raw.topic === "string" ? raw.topic.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!name || !message) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return {
    name: name.slice(0, 120),
    email: email.slice(0, 200),
    topic: topic.slice(0, 200),
    message: message.slice(0, 4000),
  };
}

/**
 * Accepts and validates the enquiry. Delivery is intentionally not wired up:
 * plug in the real destination (CRM, transactional email, or a database) where
 * marked before launch — until then the submission is logged server-side only.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = parse(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Please provide a name, a valid email address and a message." },
      { status: 400 },
    );
  }

  // TODO(launch): forward to Nabil's inbox / CRM instead of logging.
  console.info("[contact] enquiry received", {
    name: payload.name,
    email: payload.email,
    topic: payload.topic,
    length: payload.message.length,
  });

  return NextResponse.json({ ok: true });
}
