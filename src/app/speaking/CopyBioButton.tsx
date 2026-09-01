"use client";

import { useEffect, useState } from "react";
import { speakingPage } from "@/content/site";
import { Button } from "@/components/ui/Button";

const { copy } = speakingPage.pressKit;

type State = "idle" | "done" | "error";

/**
 * The one interactive element on an otherwise static page: copies the press-kit
 * biography to the clipboard and confirms in place. The label reverts after a
 * moment so the control does not read as a permanently changed state.
 *
 * `navigator.clipboard` is absent on insecure origins and can be blocked by
 * permissions, so the failure path tells the reader to select the text instead
 * of silently doing nothing. That message sits beside the button rather than
 * inside it, which would stretch the box well past its size-scale width.
 */
export function CopyBioButton({ text }: { text: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2400);
    return () => clearTimeout(timer);
  }, [state]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
      <Button type="button" onClick={onCopy} variant="outline">
        {/* The visible label changes, so the accessible name is fixed separately. */}
        <span aria-hidden>{state === "done" ? copy.done : copy.label}</span>
        <span className="sr-only">{copy.label}</span>
      </Button>

      <p
        role="status"
        aria-live="polite"
        className="font-mono text-meta text-dim"
      >
        {state === "error" ? copy.error : ""}
      </p>
    </div>
  );
}
