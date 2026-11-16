import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ARTICLES } from "@/data/journal";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "The Journal: roofing advice in plain language — AUREL Roofing Co.",
  description: "Guides on roof lifespan, storm damage and honest costs, from the crews who repair and replace roofs every day.",
  alternates: { canonical: "/journal" },
};

export default function JournalIndex() {
  return (
    <>
      <Navbar />
      <main id="main" className="wrap pb-24 pt-14 lg:pt-20">
        <p className="t-label flex items-center gap-3 text-patina"><span aria-hidden="true" className="h-px w-8 bg-current" />The Journal</p>
        <h1 className="t-display mt-5 max-w-[16ch]">Straight answers about your roof.</h1>
        <ul className="mt-16 border-t border-ink">
          {ARTICLES.map((a) => (
            <li key={a.slug} className="border-b border-rule">
              <Link href={`/journal/${a.slug}`} className="group grid gap-3 py-10 lg:grid-cols-12 lg:gap-10">
                <span className="t-meta text-lead lg:col-span-3">{a.category} · {a.minutes} min read<br />{formatDate(a.date)}</span>
                <span className="lg:col-span-9">
                  <span className="t-h2 block transition-colors group-hover:text-patina">{a.title}</span>
                  <span className="t-body mt-3 block text-lead">{a.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
