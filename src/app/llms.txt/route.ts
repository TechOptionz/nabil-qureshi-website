import {
  about,
  businessAi,
  contactPage,
  insights,
  insightsPage,
  property,
  site,
  speakingPage,
  wellness,
  workWithNabil,
} from "@/content/site";

/**
 * `/llms.txt` — the llmstxt.org convention.
 *
 * An assistant asked about Nabil fetches one of two things: the rendered HTML,
 * or this. HTML costs it a nav, a chat widget, three bands of placeholder
 * cards and a footer before it reaches a sentence worth citing; this file is
 * the same claims with none of the chrome, which is the whole point of the
 * format.
 *
 * It is a route handler rather than a file in `public/` on purpose: every line
 * below is composed from `src/content/site.ts`, so the copy here cannot drift
 * from the copy on the page. Nothing is written for this file — if a sentence
 * appears here, it appears on the site.
 */

const url = (path: string) => new URL(path, site.url).toString();

/** `- [Title](url): summary` — the link shape the convention expects. */
const entry = (title: string, path: string, summary: string) =>
  `- [${title}](${url(path)}): ${summary}`;

const body = `# ${site.name}

> ${site.description}

${about.storyParagraphs[0]}

${site.disclaimer}

## Pages

${[
  entry(
    site.shortName,
    "/",
    `${site.tagline} The home page introduces all three pillars.`,
  ),
  entry("About Nabil", "/about", about.meta.description),
  entry("Property & Wealth", "/property", property.meta.description),
  entry("Business, Technology & AI", "/business-ai", businessAi.meta.description),
  entry("Health & Wellness", "/wellness", wellness.meta.description),
  entry("Insights", "/insights", insightsPage.meta.description),
  entry("Speaking & Media", "/speaking", speakingPage.meta.description),
  entry("Work With Nabil", "/work-with-nabil", workWithNabil.meta.description),
  entry("Contact", "/contact", contactPage.meta.description),
].join("\n")}

## What each pillar covers

### Property & Wealth — ${url("/property")}
${property.coverage.topics.map((topic) => `- ${topic}`).join("\n")}

### Business, Technology & AI — ${url("/business-ai")}
${businessAi.coverage.topics.map((topic) => `- ${topic}`).join("\n")}

### Health & Wellness — ${url("/wellness")}
${wellness.coverage.topics.map((topic) => `- ${topic}`).join("\n")}

## Expertise

${about.capabilities.clusters
  .map(
    (cluster) =>
      `### ${cluster.category}\n${cluster.skills
        .map((skill) => `- ${skill}`)
        .join("\n")}`,
  )
  .join("\n\n")}

## Speaking topics

${speakingPage.topics.items.map((topic) => `- ${topic.title}`).join("\n")}

## Ways to work with Nabil

${workWithNabil.pathways.cards
  .map((card) => `- **${card.title}** — ${card.body} (${url(card.href)})`)
  .join("\n")}

## Optional

- [Insights library](${url("/insights")}): ${insights.body}
- Article pages are not yet published. Every title listed in the insights
  library is an announced piece without a URL, so there is nothing deeper to
  fetch than the titles themselves.
- ${workWithNabil.closing.disclaimer}
`;

/*
 * Nothing here reads the request, so the file is prerendered at build time and
 * served as a static asset — a crawler should never wait on a function
 * invocation for it.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      /*
       * The file is built from constants, so it only changes on redeploy.
       * A day of shared caching keeps repeat agent fetches off the origin.
       */
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
