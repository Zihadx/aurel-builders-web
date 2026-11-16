"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { NAVIGATION_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn, scrollToSection } from "@/lib/utils";

const IDS = NAVIGATION_LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = usePathname() === "/";
  const active = useActiveSection(IDS);
  // Off the home page there is no dark hero behind the bar, so it is always solid.
  const solid = scrolled || !onHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,box-shadow,color] duration-300",
          solid ? "bg-paper text-ink shadow-[0_1px_0_var(--color-rule)]" : "on-deep bg-transparent text-chalk"
        )}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href="/"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToSection("#home");
              }
            }}
            className="flex items-center gap-2.5"
          >
            <Logo />
            <span className="font-sans text-lg font-semibold tracking-[0.04em] [font-stretch:115%]">
              {SITE_CONFIG.shortName}
            </span>{" "}
            <span className={cn("t-meta max-sm:sr-only", solid ? "text-lead" : "text-mist")}>Roofing Co.</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <Link
                      href={onHome ? link.href : `/${link.href}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(e) => {
                        if (onHome) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }
                      }}
                      className={cn(
                        "relative py-2 text-[0.9375rem] font-medium transition-colors",
                        isActive ? "text-current" : solid ? "text-lead hover:text-ink" : "text-chalk/70 hover:text-chalk",
                        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-patina-hi after:transition-transform after:duration-300 after:ease-[var(--ease-out)]",
                        isActive ? "after:scale-x-100" : "after:scale-x-0"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium hover:text-patina-hi"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
            <Button href="/book">Book inspection</Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={SITE_CONFIG.contact.phoneHref}
              aria-label={`Call ${SITE_CONFIG.contact.phoneDisplay}`}
              className="grid h-11 w-11 place-items-center"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="h-11 cursor-pointer px-3 text-[0.9375rem] font-medium"
            >
              Menu
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={open} onClose={() => setOpen(false)} onHome={onHome} />
    </>
  );
}
