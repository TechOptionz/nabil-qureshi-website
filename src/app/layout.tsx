import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text, Work_Sans } from "next/font/google";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { personNode, webSiteNode } from "@/lib/seo/jsonld";
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/*
 * Loaded as a variable font (no `weight` array) so the body-text utilities in
 * globals.css can use the intermediate weights the fixed axis could not reach —
 * chiefly 430 for running copy, which reads a shade heavier than 400 without
 * the bluntness of a full 500.
 */
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — Property, Business & AI, Wellness`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "property investment",
    "wealth creation",
    "business technology",
    "AI for small business",
    "health and wellness",
    "speaking",
    "Nabil Qureshi",
  ],
  authors: [{ name: site.shortName, url: `${site.url}/about` }],
  creator: site.shortName,
  publisher: site.shortName,
  applicationName: site.name,
  category: "Business",
  /*
   * Telephone auto-detection rewrites plain numbers into `tel:` anchors on
   * iOS, which injects markup the crawler sees but the source does not.
   */
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    /*
     * The .ico carries pixel-tuned 16/32/48 rasters for legacy browsers and
     * bookmark bars; it declares concrete sizes rather than `any` so modern
     * browsers prefer the scalable SVG instead of the low-res bitmap.
     */
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_AU",
    title: `${site.shortName} — Property, Business & AI, Wellness`,
    description: site.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — Executive Advisory, Property, AI & Wellness`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — Property, Business & AI, Wellness`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  /*
   * The `googleBot` block is the single most important answer-engine switch on
   * the site. Without it Google caps text snippets at ~160 characters and
   * image previews at a thumbnail, which is too little for a page to be quoted
   * in an AI Overview or a rich result. `-1` lifts both caps.
   *
   * `notranslate` is deliberately absent: a translated snippet is still a
   * citation.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#14171c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${libreCaslon.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-200 focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:text-ui focus:font-semibold focus:text-ink-on-gold"
        >
          Skip to content
        </a>
        {children}
        {/*
          The Person and WebSite nodes are declared once, here, and referenced
          by `@id` from every page's own graph — so a crawler resolves one
          entity across the whole site rather than one per URL.
        */}
        <JsonLd graph={[personNode, webSiteNode]} />
      </body>
    </html>
  );
}
