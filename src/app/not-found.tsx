import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteNav } from "@/components/sections/SiteNav";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Section";

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
