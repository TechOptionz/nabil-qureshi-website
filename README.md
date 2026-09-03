# NabilQureshi.com — Next.js

Production rebuild of the Nabil Qureshi personal brand site, ported from the
Claude Design canvas document in [`../nabil-qureshi-website`](../nabil-qureshi-website).

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY` to enable the
chat assistant. Without it the site works fully; the assistant returns a
"not configured" message instead of answering.

## Structure

| Path | Purpose |
| --- | --- |
| `src/content/site.ts` | **All copy and data.** Every section reads from here — edit text, articles, stats and testimonials in one file. |
| `src/app/layout.tsx` | Fonts (`next/font`, self-hosted), metadata, Open Graph, `Person` JSON-LD, skip link. |
| `src/app/page.tsx` | Composes the sections in order. |
| `src/app/globals.css` | Design tokens as Tailwind v4 `@theme` variables, plus the `shell` / `eyebrow` utilities and reveal animation. |
| `src/components/sections/` | One component per section of the page. |
| `src/components/ui/` | `Section`/`Eyebrow`/`Heading` primitives, `MediaSlot`, `Reveal`. |
| `src/app/api/` | `chat`, `contact`, `newsletter` route handlers. |
| `src/lib/seo/jsonld.ts` | Shared `Person` / `WebSite` nodes and the `pageGraph()` builder every route's JSON-LD comes from. |
| `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`, `llms.txt/route.ts` | Crawl and answer-engine surface — all generated from `site.ts`. |

Only five components are client components — `SiteNav`, `Insights`,
`Newsletter`, `Contact`, `ChatWidget` and the `Reveal` wrapper. Everything else
renders on the server.

## Design tokens

Defined once in `globals.css` under `@theme`, so `bg-ink`, `text-gold`,
`border-cream-line` etc. are real Tailwind utilities:

| Token | Value | Use |
| --- | --- | --- |
| `ink` / `ink-raised` / `ink-deep` | `#14171c` / `#1a1e24` / `#101318` | Dark bands, raised cards, footer |
| `gold` / `gold-light` / `gold-dark` | `#d3a95e` / `#e6c284` / `#a97f35` | Accent, hover, accent on light bands |
| `cream` / `cream-deep` | `#f3efe7` / `#e9e3d6` | Light bands (story, speaking, testimonials) |
| `heading` / `body` / `muted` / `dim` | `#f6f3ec` / `#e9e6df` / `#a9aeb5` / `#7d838c` | Type scale on dark |

Fonts are Libre Caslon Text (`font-serif`) and Work Sans (`font-sans`), loaded
through `next/font/google` — self-hosted at build time, no runtime CDN request.

## Chat assistant

`POST /api/chat` proxies to the Anthropic Messages API (`claude-opus-5`,
adaptive thinking at low effort). The system prompt is a server-side constant,
so the visitor cannot alter the assistant's brief. History is capped at 20
messages and each message at 1000 characters. Markdown is stripped from replies
to match the original design's plain-text bubbles.

## Adding the missing assets

The design ships with honest placeholders rather than invented content. Each is
a one-line change in `src/content/site.ts`:

| Item | How to add it |
| --- | --- |
| Hero background video | Put the file in `public/media/`, set `hero.video` to `"/media/brand-loop.mp4"`. |
| Portrait and pillar photography | Put files in `public/media/`, set `story.portrait.src` and each `pillars[].image.src`. |
| Welcome / property / business videos, showreel | Set `videos.feature.src`, `videos.secondary[].src`, `speaking.showreel.src`. |
| Credibility figures | Replace the `XX` values in `credibility.stats` and delete `credibility.note`. |
| Testimonials | Replace each item's `quote`/`name`/`role` and set `pending: false`. |
| Article links | Set each `articles[].href`. |

Until then those slots render as visibly labelled placeholders — nothing on the
site claims a figure or quote that has not been supplied.

## Search, answer engines and AI crawlers

Everything below is generated from `src/content/site.ts`, so adding a page or
changing a description updates all of it at once.

| Route | What it does |
| --- | --- |
| `/robots.txt` | Allows everything but `/api/`, names the sitemap, and lists the AI crawlers explicitly. Editing `aiCrawlers` in `src/app/robots.ts` is the switch if the site should stop feeding a given assistant. |
| `/sitemap.xml` | The nine indexable routes, each with its hero image through the Google image extension. **Add new routes to the `routes` array in `src/app/sitemap.ts`** — nothing discovers them automatically. |
| `/llms.txt` | The [llmstxt.org](https://llmstxt.org) summary: every page, pillar topic, capability and speaking topic as plain text, with no nav or chrome for an assistant to wade through. |
| `/manifest.webmanifest` | Name, description and theme colour for installed and app-surface contexts. |

**Structured data.** One JSON-LD `@graph` per page, built by `pageGraph()` in
`src/lib/seo/jsonld.ts`. The root layout declares the `Person` and `WebSite`
nodes once; every page references them by `@id`, so a crawler resolves a single
entity across the whole site. Pages add their own `WebPage`/`ProfilePage`/
`ContactPage`/`CollectionPage` node, a `BreadcrumbList`, and where it applies a
`Service` (`/work-with-nabil`) or `ItemList` of talks (`/speaking`).

Two rules apply when extending it:

1. **Schema may only assert what the page renders.** The career history in
   `about.timeline` is still marked unverified, so no `worksFor`, `jobTitle` or
   `alumniOf` is emitted; the `/speaking` formats band is still PLACEHOLDER
   lengths and audiences, so it stays out too. Unsupported claims are what
   earns a structured-data manual action.
2. **`sameAs` takes real profile URLs only.** It is derived from the footer's
   Follow column, filtered to absolute URLs — so replacing the `#` placeholders
   there is all that is needed to add Instagram and YouTube to the entity.

**Share cards** live in `public/og/` (1200x630, one per route) plus
`public/og-image.jpg` for the home page, wired through each section's
`meta.ogImage` in `site.ts`.

## Before launch

- `src/app/api/contact/route.ts` and `src/app/api/newsletter/route.ts` validate
  input and return success, but only log server-side. Wire them to the real
  inbox/CRM and list provider at the `TODO(launch)` markers.
- Set `site.url` in `src/content/site.ts` to the production origin.
- Replace the footer's `#` social links with real profiles. They feed the
  `sameAs` in the Person schema and the `rel="me"` on each link, so the entity
  stays thinner than it needs to be until they are set.
- Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and
  add the verification token to `metadata.verification` in
  `src/app/layout.tsx`.
- `/contact` is server-rendered on every request because it reads
  `?topic=` from `searchParams`. It is fully crawlable, but moving that read
  into a `Suspense`-wrapped client component would let it prerender like the
  other eight routes.
