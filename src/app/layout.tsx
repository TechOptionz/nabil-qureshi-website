import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text, Work_Sans } from "next/font/google";
import { site } from "@/content/site";
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
  authors: [{ name: site.shortName }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14171c",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.shortName,
  url: site.url,
  description: site.description,
  knowsAbout: [
    "Property and wealth creation",
    "Business technology and AI",
    "Health and wellness",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
