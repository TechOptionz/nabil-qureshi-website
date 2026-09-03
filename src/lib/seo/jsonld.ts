/**
 * Structured data shared by every route.
 *
 * Two rules govern this file:
 *
 *  1. Schema may only assert what the rendered page already says. Search and
 *     answer engines treat invisible or unsupported claims as spam, and the
 *     career history in `about.timeline` is still flagged unverified in
 *     `src/content/site.ts` — so no `worksFor`, `alumniOf`, `jobTitle` or
 *     aggregate rating is emitted here, and no copy is invented for schema.
 *  2. Every page points at the same `Person` and `WebSite` nodes by `@id`, so
 *     a crawler resolves one entity across nine URLs instead of nine loosely
 *     related ones. That single resolved entity is what an answer engine
 *     cites when it attributes a claim to Nabil.
 */
import { about, footer, site } from "@/content/site";

/** Stable node ids. Referenced, never redefined, by the per-page graphs. */
export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

/** schema.org consumers do not resolve site-relative paths — always absolute. */
export const abs = (path: string) => new URL(path, site.url).toString();

/**
 * Real profile URLs only. The Instagram and YouTube entries in the footer are
 * still `#`, and a `sameAs` pointing at a fragment is worse than no `sameAs`:
 * it breaks the entity reconciliation the property exists to support.
 */
const sameAs = footer.columns
  .flatMap((column) => column.links)
  .map((link) => link.href)
  .filter((href) => href.startsWith("http"));

/**
 * The strongest topical signal a personal-brand site has. It is what lets a
 * query like "who writes about AI adoption for small business" resolve to this
 * Person. Every entry is lifted verbatim from copy that renders on the home
 * pillars or /about, so the claim and the page agree.
 */
const knowsAbout = Array.from(
  new Set([
    /*
     * Topic names, not headlines. The pillar *headings* ("Build wealth
     * through informed property decisions.") are sentences and would make
     * poor `knowsAbout` entries; the card titles are what the nav, the
     * footer and /about all call these subjects.
     */
    ...about.pillars.cards.map((card) => card.title),
    ...about.capabilities.clusters.flatMap((cluster) => [
      cluster.category,
      ...cluster.skills,
    ]),
  ]),
);

export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.shortName,
  url: site.url,
  description: site.description,
  ...(about.portrait.src
    ? {
        image: {
          "@type": "ImageObject",
          url: abs(about.portrait.src),
          caption: about.portrait.alt,
        },
      }
    : {}),
  ...(sameAs.length > 0 ? { sameAs } : {}),
  knowsAbout,
  /** The canonical page describing the entity, not the page linking to it. */
  mainEntityOfPage: { "@id": `${site.url}/about#webpage` },
};

export const webSiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  inLanguage: "en-AU",
  publisher: { "@id": PERSON_ID },
  copyrightHolder: { "@id": PERSON_ID },
  /**
   * `disambiguatingDescription` is read by answer engines as the one-line
   * "what is this" gloss. It reuses the tagline rather than adding new copy.
   */
  disambiguatingDescription: site.tagline,
};

export type Crumb = { name: string; path: string };

/**
 * The trail always begins at the home page, so callers pass only the
 * descendants. Breadcrumbs are what let an engine state where a cited page
 * sits in the site, which is half of why they earn a rich result.
 */
export function breadcrumbNode(pagePath: string, trail: Crumb[]) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(pagePath)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

type PageGraphOptions = {
  path: string;
  /** `ProfilePage`, `ContactPage`, `CollectionPage` where one applies. */
  type?: string;
  name: string;
  description: string;
  /** Site-relative path to the page's lead image. */
  image?: string | null;
  /** Descendants of Home. Omitted on the home page itself. */
  trail?: Crumb[];
  /**
   * Headings, list items or talk titles already on the page. Emitted as
   * `significantLink`-free `mentions` text so an answer engine can see what
   * the page covers without parsing the layout.
   */
  mentions?: string[];
  /** Extra nodes unique to the route — a `Service`, an `ItemList`, and so on. */
  extra?: object[];
};

/**
 * Builds the `@graph` for one route: the page node, its breadcrumb, and any
 * route-specific nodes. The `Person` and `WebSite` nodes live in the root
 * layout and are referenced here by `@id`.
 */
export function pageGraph({
  path,
  type = "WebPage",
  name,
  description,
  image,
  trail,
  mentions,
  extra = [],
}: PageGraphOptions): object[] {
  const url = abs(path);

  const page = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-AU",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    ...(type === "ProfilePage" ? { mainEntity: { "@id": PERSON_ID } } : {}),
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(image) } }
      : {}),
    ...(mentions && mentions.length > 0
      ? { mentions: mentions.map((term) => ({ "@type": "Thing", name: term })) }
      : {}),
    ...(trail ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };

  return [page, ...(trail ? [breadcrumbNode(path, trail)] : []), ...extra];
}
