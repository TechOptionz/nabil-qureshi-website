import { aleesaProvider } from "./aleesa-provider";
import { anthropicProvider } from "./anthropic-provider";
import type { ChatProvider } from "./types";

/**
 * THE SWAP POINT. First match wins:
 *
 *   1. Aleesa Web Chat — ALEESA_WEBHOOK_URL + ALEESA_WEBCHAT_API_KEY.
 *      The bot is trained in the Aleesa dashboard (Knowledge Base + Chat
 *      Agent) and every conversation lands in the Aleesa inbox, where a
 *      human can take over.
 *   2. Anthropic — ANTHROPIC_API_KEY. Trained by the system prompt in
 *      ./anthropic-provider.ts.
 *
 * Nothing else in the app changes with the choice: the widget and the API
 * route only know about the ChatProvider interface.
 *
 * See .env.example for the variables.
 */
export function getChatProvider(): ChatProvider {
  if (process.env.ALEESA_WEBHOOK_URL && process.env.ALEESA_WEBCHAT_API_KEY) {
    return aleesaProvider;
  }
  return anthropicProvider;
}
