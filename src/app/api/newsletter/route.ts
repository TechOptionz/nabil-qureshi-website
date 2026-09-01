import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Validates the address and acknowledges the signup. Connect this to the real
 * list provider (Mailchimp, ConvertKit, Beehiiv, …) where marked before launch.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    typeof (body as { email?: unknown })?.email === "string"
      ? (body as { email: string }).email.trim()
      : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  // TODO(launch): subscribe to the real newsletter provider.
  console.info("[newsletter] signup", { email: email.slice(0, 200) });

  return NextResponse.json({ ok: true });
}
