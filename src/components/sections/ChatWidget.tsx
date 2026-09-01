"use client";

import { useEffect, useRef, useState } from "react";
import { chat } from "@/content/site";
import { Button } from "@/components/ui/Button";

type Message = { role: "user" | "assistant"; text: string };

const SESSION_KEY = "nq_chat_session_id";

/**
 * A stable id for this visitor's conversation, reused across page loads.
 *
 * The Aleesa provider keys the transcript and the inbox thread on it, so a
 * fresh id every turn would leave the bot with no memory and scatter one
 * conversation across many threads. Providers that hold no state — the
 * Anthropic fallback — ignore it.
 */
function getSessionId(): string {
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = `chat_${crypto.randomUUID()}`;
    window.localStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    // Private mode / storage disabled: still usable, just not across reloads.
    return `chat_${crypto.randomUUID()}`;
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Minted lazily, on the first turn: reading localStorage during render
  // would not match the server-rendered markup.
  const sessionIdRef = useRef("");

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [log, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;

    const history = [...log, { role: "user", text: trimmed } as Message];
    setLog(history);
    setDraft("");
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          // Both are only read by the Aleesa provider: the session id keeps
          // the conversation in one inbox thread, the path tells whoever
          // picks it up which page the question was asked from.
          sessionId: (sessionIdRef.current ||= getSessionId()),
          page: window.location.pathname,
        }),
      });
      if (!response.ok) throw new Error("Chat request failed");
      const data: { reply?: string } = await response.json();
      setLog([
        ...history,
        { role: "assistant", text: data.reply ?? chat.error },
      ]);
    } catch {
      setLog([...history, { role: "assistant", text: chat.error }]);
    } finally {
      setBusy(false);
    }
  }

  const bubble = (role: Message["role"]) =>
    role === "user"
      ? "self-end max-w-[85%] rounded-xl rounded-br-sm bg-gold px-3.5 py-2.5 text-meta whitespace-pre-wrap text-ink-on-gold"
      : "self-start max-w-[85%] rounded-xl rounded-bl-sm border border-line bg-ink px-3.5 py-2.5 text-meta whitespace-pre-wrap text-body-soft";

  return (
    <div className="fixed right-5 bottom-5 z-100 flex flex-col items-end gap-3.5 sm:right-7 sm:bottom-7">
      {open && (
        <div
          role="dialog"
          aria-label={chat.title}
          className="flex h-[480px] max-h-[calc(100svh-8rem)] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl border border-line-input bg-ink-raised shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center gap-3 border-b border-line bg-ink px-5 py-4">
            <span
              aria-hidden
              className="flex size-9 items-center justify-center rounded-full bg-gold font-serif text-[17px] text-ink-on-gold"
            >
              N
            </span>
            <div className="flex-1">
              <p className="text-ui font-semibold text-heading">
                {chat.title}
              </p>
              <p className="text-caption text-dim">{chat.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="p-1 text-xl leading-none text-dim transition-colors hover:text-body"
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto p-4.5"
          >
            <p className={bubble("assistant")}>{chat.greeting}</p>

            {log.map((message, index) => (
              <p key={index} className={bubble(message.role)}>
                {message.text}
              </p>
            ))}

            {busy && (
              <p className={bubble("assistant")} aria-label="Assistant is typing">
                …
              </p>
            )}

            {log.length === 0 && !busy && (
              <div className="mt-1 flex flex-col gap-2">
                {chat.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => ask(suggestion)}
                    className="rounded-lg border border-line-input px-3.5 py-2.5 text-left text-meta text-body-soft transition-colors hover:border-gold hover:text-gold"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(draft);
            }}
            className="flex items-center gap-2.5 border-t border-line p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Ask a question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={chat.placeholder}
              className="flex-1 rounded-lg border border-line-input bg-ink px-3.5 py-2.5 text-meta text-body outline-none transition-colors placeholder:text-dim focus:border-gold"
            />
            <Button
              type="submit"
              disabled={busy || !draft.trim()}
              radius="rounded-lg"
              padding="px-4 py-2.5"
              textSize="text-meta"
              className="disabled:opacity-50"
            >
              Send
            </Button>
          </form>

          <p className="px-3.5 pb-2.5 text-center text-caption text-faint">
            {chat.disclaimer}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="flex size-15 items-center justify-center rounded-full bg-gold text-2xl text-ink-on-gold shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-colors hover:bg-gold-light"
      >
        {open ? "×" : "✉"}
      </button>
    </div>
  );
}
