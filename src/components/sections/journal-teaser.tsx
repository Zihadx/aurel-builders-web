import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/data/journal";
import { SectionHeader } from "@/components/ui/section-header";
import { formatDate } from "@/lib/format";

export function JournalTeaser() {
  return (
    <section id="journal" aria-labelledby="journal-title" className="section">
      <div className="wrap">
        <SectionHeader
          id="journal-title"
          eyebrow="The Journal"
          title="Straight answers before you spend a dollar."
          intro="Plain-language guides on lifespan, storms and cost, written by the people who fix roofs for a living."
        />
        <ul className="mt-14 border-t border-ink lg:mt-20">
          {ARTICLES.map((a) => (
            <li key={a.slug} className="border-b border-rule">
              <Link href={`/journal/${a.slug}`} className="group grid items-baseline gap-3 py-8 lg:grid-cols-12 lg:gap-10">
                <span className="t-meta text-lead lg:col-span-2">{a.category}<span className="mx-2">·</span>{a.minutes} min</span>
                <span className="lg:col-span-7">
                  <span className="t-h3 block transition-colors group-hover:text-patina">{a.title}</span>
                  <span className="t-body mt-2 block text-lead">{a.excerpt}</span>
                </span>
                <span className="flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end">
                  <span className="t-meta text-lead">{formatDate(a.date)}</span>
                  <ArrowUpRight className="h-6 w-6 text-patina transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8"><Link href="/journal" className="text-[0.9375rem] font-medium text-patina underline underline-offset-4 hover:text-patina-deep">Read all articles</Link></p>
      </div>
    </section>
  );
}
