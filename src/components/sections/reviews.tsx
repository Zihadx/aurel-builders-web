import { SITE_CONFIG } from "@/data/site";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { FadeUp, WordsReveal } from "@/components/ui/motion";
import { Stars } from "@/components/ui/stars";

// MOCK rating distribution (percent). Replace with your platform's real split.
const BREAKDOWN: Array<[number, number]> = [[5, 91], [4, 7], [3, 1], [2, 1], [1, 0]];

export function ReviewsSection() {
  const { proof } = SITE_CONFIG;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <WordsReveal id="reviews-title" className="t-h2" text="What homeowners notice first." />
            <FadeUp delay={0.15}>
              <div className="mt-8 flex items-end gap-4">
                <span className="font-sans text-6xl font-semibold leading-none tracking-tight [font-stretch:108%]">{proof.rating.toFixed(1)}</span>
                <div className="pb-1">
                  <Stars rating={proof.rating} />
                  <p className="t-meta mt-1 text-lead">{proof.reviewCount.toLocaleString("en-US")} reviews on {proof.platform}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-2" aria-label="Rating breakdown">
                {BREAKDOWN.map(([star, pct]) => (
                  <li key={star} className="grid grid-cols-[1.5rem_1fr_2.5rem] items-center gap-3 text-[0.8125rem] text-lead">
                    <span>{star}★</span>
                    <span className="h-1.5 overflow-hidden bg-rule" aria-hidden="true">
                      <span className="block h-full bg-patina" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="text-right tabular-nums">{pct}%</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>

        <ul className="border-t border-ink lg:col-span-8">
          {TESTIMONIALS_DATA.map((t, i) => (
            <li key={t.id} className="border-b border-rule py-8 first:pt-8">
              <FadeUp delay={i * 0.05}>
                <figure>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <Stars rating={t.rating} />
                    <span className="inline-flex items-center gap-1.5 t-meta text-patina">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5L13.5 4.5" /></svg>
                      Verified customer
                    </span>
                    <span className="t-meta text-lead">{t.date}</span>
                  </div>
                  <blockquote className="mt-4 font-serif text-[1.1875rem] leading-[1.6] sm:text-[1.3125rem]">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-semibold">{t.name}</span>
                    <span className="t-meta text-lead">{t.location} · {t.service}</span>
                  </figcaption>
                </figure>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
