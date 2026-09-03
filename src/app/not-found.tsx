import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Section";

/*
 * The 404 already answers with a 404 status, which is what actually keeps it
 * out of the index — but a soft-404 served from a cache or a proxy would
 * otherwise inherit the site-wide title and canonical from the root layout
 * and look like a real page. `noindex` closes that gap, and the explicit
 * title stops "Nabil Qureshi — Property, Business & AI, Wellness" appearing
 * over an error screen in a tab or a shared link.
 */
export const metadata: Metadata = {
  title: { absolute: "Page Not Found — NabilQureshi.com" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="flex flex-1 items-center justify-center bg-ink py-28 lg:py-36">
        <div className="shell flex flex-col items-center text-center">
          <div className="flex max-w-xl flex-col items-center gap-6">
            <Eyebrow>404 — Page Not Found</Eyebrow>

            <Heading
              as="h1"
              className="text-[clamp(2.5rem,5.2vw,4.125rem)] leading-[1.12] text-heading"
            >
              The page you requested does not exist.
            </Heading>

            <p className="max-w-md text-copy text-pretty text-muted">
              The page may have moved, or the link may be incorrect. Return to the
              home page or explore one of the core advisory pillars.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Button href="/" size="lg">
                Return to Home
              </Button>
              <Button href="/about" variant="outline" size="lg">
                About Nabil
              </Button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
