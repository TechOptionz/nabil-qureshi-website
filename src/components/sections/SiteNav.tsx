"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";

const ctaHref = "/work-with-nabil";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const ctaActive = pathname === ctaHref;

  // Track scroll position to enhance glassmorphism navbar border & shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Never leave the mobile sheet open behind a desktop layout
  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia("(min-width: 1024px)");
    const close = () => setOpen(false);
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, [open]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold/25 bg-ink-deep/95 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl py-0.5"
          : "border-b border-line/70 bg-ink/90 backdrop-blur-xl"
      }`}
    >
      <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3.5">
        {/* Brand Wordmark Logo */}
        <Link
          href="/"
          className="group flex items-center gap-1 font-serif text-[22px] tracking-[0.01em] text-wordmark transition-opacity hover:opacity-90"
        >
          <span>NabilQureshi</span>
          <span className="text-gold transition-transform duration-300 group-hover:scale-125">.</span>
          <span className="text-caption font-sans text-dim">com</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden min-w-0 flex-auto flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-ui lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "rounded-full border border-gold/35 bg-gold/12 px-3.5 py-1.5 text-gold shadow-[0_0_12px_rgba(211,169,94,0.15)]"
                    : "rounded-full px-3.5 py-1.5 text-body-soft hover:bg-white/[0.04] hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Button
            href={ctaHref}
            aria-current={ctaActive ? "page" : undefined}
            size="sm"
            className="hidden whitespace-nowrap sm:inline-block shadow-[0_0_15px_rgba(211,169,94,0.2)]"
          >
            Work With Nabil
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-xl border border-line-input bg-ink-raised/80 text-body transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[6px] h-px bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[12px] h-px bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="animate-fade-down border-t border-line/80 bg-ink-raised/95 backdrop-blur-2xl lg:hidden"
      >
        <div className="shell flex flex-col py-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between border-b border-line/50 py-3.5 text-ui transition-colors last:border-0 ${
                  isActive ? "font-semibold text-gold" : "text-body-soft hover:text-gold"
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="text-caption font-bold text-gold">●</span>}
              </Link>
            );
          })}
          <Button
            href={ctaHref}
            aria-current={ctaActive ? "page" : undefined}
            onClick={() => setOpen(false)}
            size="sm"
            padding="px-5 py-3"
            className="mt-4 mb-3 text-center sm:hidden"
          >
            Work With Nabil
          </Button>
        </div>
      </div>
    </nav>
  );
}
