import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * The AI crawlers are listed explicitly and allowed.
 *
 * Allow is already the default for an unlisted agent, so the list changes no
 * behaviour — it states intent. This is a personal-brand site whose whole
 * purpose is to be quoted when someone asks an assistant about property,
 * business AI or wellness, so being read by answer engines is the goal rather
 * than a leak. Removing a name from `aiCrawlers` (or moving it to a
 * `disallow` rule) is the switch if that ever changes.
 *
 *   GPTBot / OAI-SearchBot   ChatGPT training and ChatGPT Search
 *   ChatGPT-User             a live fetch made on a user's behalf
 *   ClaudeBot / Claude-User  Claude's crawler and live fetches
 *   PerplexityBot            Perplexity's index
 *   Google-Extended          gates Gemini and AI Overviews grounding
 *   Applebot-Extended        gates Apple Intelligence
 *   CCBot                    Common Crawl, the corpus behind many models
 *   Bingbot / Amazonbot      Copilot and Alexa surfaces
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "meta-externalagent",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
];

/**
 * `/api/` holds the chat, contact and newsletter route handlers. They are
 * POST-only and answer 405 to a crawler, so blocking them saves crawl budget
 * rather than hiding anything.
 */
const disallow = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
