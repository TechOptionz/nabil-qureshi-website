/**
 * Emits one JSON-LD `@graph` for a page.
 *
 * A single cross-referenced graph beats several disconnected `<script>` blocks:
 * the nodes resolve to each other by `@id`, so a crawler reading the page sees
 * one Person, one WebSite and one WebPage rather than three unrelated islands.
 *
 * `<` is escaped because JSON-LD sits inside a raw-text element, where a `</`
 * sequence inside a string would otherwise close the script early.
 */
export function JsonLd({ graph }: { graph: object[] }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
