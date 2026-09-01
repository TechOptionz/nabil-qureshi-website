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

## Before launch

- `src/app/api/contact/route.ts` and `src/app/api/newsletter/route.ts` validate
  input and return success, but only log server-side. Wire them to the real
  inbox/CRM and list provider at the `TODO(launch)` markers.
- Set `site.url` in `src/content/site.ts` to the production origin.
- Replace the footer's `#` social links with real profiles.
