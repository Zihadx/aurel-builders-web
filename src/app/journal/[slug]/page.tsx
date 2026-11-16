import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ARTICLES } from "@/data/journal";
import { SITE_CONFIG } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";
import { formatDate } from "@/lib/format";
import { jsonLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: `${a.title} — AUREL Journal`,
    description: a.excerpt,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: "article", publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const idx = ARTICLES.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const a = ARTICLES[idx];
  const next = ARTICLES[(idx + 1) % ARTICLES.length];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    author: { "@type": "Organization", name: SITE_CONFIG.companyName },
    publisher: { "@type": "Organization", name: SITE_CONFIG.companyName },
    mainEntityOfPage: `${SITE_URL}/journal/${a.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <Navbar />
      <main id="main" className="wrap pb-24 pt-12 lg:pt-16">
        <nav aria-label="Breadcrumb" className="t-meta text-lead">
          <Link href="/journal" className="hover:text-patina">The Journal</Link> <span aria-hidden="true">/</span> {a.category}
        </nav>
        <article className="mx-auto mt-8 max-w-[44rem]">
          <h1 className="t-h2 text-[clamp(2rem,4.6vw,3.5rem)]">{a.title}</h1>
          <p className="t-meta mt-5 text-lead">{formatDate(a.date)} · {a.minutes} min read · By the AUREL team</p>
          <p className="t-lede mt-8 text-lead">{a.excerpt}</p>
          <div className="mt-10 space-y-6">
            {a.body.map((b, i) => (
              <section key={i}>
                {b.h && <h2 className="t-h3 mt-10">{b.h}</h2>}
                {b.p && <p className="t-body mt-3 max-w-none text-[1.125rem]">{b.p}</p>}
                {b.list && (
                  <ul className="mt-4 space-y-2.5 border-l-2 border-patina pl-5">
                    {b.list.map((li) => <li key={li} className="t-body max-w-none">{li}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="on-deep mt-16 bg-deep p-8 text-chalk sm:p-10" aria-label="Book an inspection">
            <p className="t-h3">Want a straight answer about your own roof?</p>
            <p className="t-body mt-2 text-mist">A free, photographed 45-point inspection takes about 90 minutes and comes with a written report.</p>
            <div className="mt-6"><Button href="/book" size="lg">Book a free inspection</Button></div>
          </aside>

          <p className="t-meta mt-12 text-lead">Next: <Link href={`/journal/${next.slug}`} className="font-medium text-patina underline underline-offset-4">{next.title}</Link></p>
          <p className="t-meta mt-6 text-lead">General guidance only. Every roof and climate is different; an on-site inspection is the only way to know.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
