import Link from "next/link";
import { footer, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-deep">
      <div className="shell grid gap-12 pt-18 pb-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <p className="font-serif text-2xl text-wordmark">
            NabilQureshi<span className="text-gold">.</span>com
          </p>
          <p className="max-w-[300px] text-ui text-pretty text-dim">
            {footer.blurb}
          </p>
        </div>

        {footer.columns.map((column) => (
          <nav key={column.title} className="flex flex-col gap-3">
            <p className="mb-1 text-caption tracking-[0.18em] text-dim uppercase">
              {column.title}
            </p>
            {column.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-ui text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="shell flex flex-wrap justify-between gap-5 pb-10 text-caption text-faint">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>{site.disclaimer}</p>
      </div>
    </footer>
  );
}
