import { SITE_CONFIG } from "@/data/site";
import { NAVIGATION_LINKS } from "@/data/navigation";
import { SERVICES_DATA } from "@/data/services";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const { contact, legalNote, shortName, companyName, tagline } = SITE_CONFIG;
  return (
    <footer className="on-deep bg-deeper pb-20 text-chalk lg:pb-0">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2.5">
            <Logo />
            <span className="font-sans text-xl font-semibold tracking-[0.04em] [font-stretch:115%]">{shortName}</span>
          </p>
          <p className="t-body mt-5 text-mist">{tagline}.</p>
          <p className="mt-6 text-[0.9375rem]">
            <a href={contact.phoneHref} className="font-medium hover:text-patina-hi">{contact.phoneDisplay}</a>
            <br />
            <a href={`mailto:${contact.email}`} className="text-mist hover:text-patina-hi">{contact.email}</a>
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-7">
          <div>
            <h2 className="t-label text-mist">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {NAVIGATION_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href.startsWith("/") ? l.href : `/${l.href}`} className="hover:text-patina-hi">{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="font-medium text-patina-hi hover:text-chalk">Book an inspection</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="t-label text-mist">Services</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <Link href="/#services" className="hover:text-patina-hi">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-rule-deep">
        <div className="wrap flex flex-col gap-3 py-6 t-meta text-mist lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-[70ch]">{legalNote}</p>
          <p className="shrink-0">© {new Date().getFullYear()} {companyName}</p>
        </div>
      </div>
    </footer>
  );
}
