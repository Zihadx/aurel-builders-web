import { WordsReveal } from "@/components/ui/motion";
import { TESTIMONIALS_DATA } from "@/data/testimonials";

export function ReviewsSection() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <WordsReveal id="reviews-title" className="t-h2 lg:col-span-7" text={"What homeowners notice first."} />
          <p className="t-body text-lead lg:col-span-5 lg:pt-2">
            Sample reviews, written to show the layout. Replace them with real
            client feedback before launch.
          </p>
        </div>

        <ul className="mt-12 border-t border-ink lg:mt-16">
          {TESTIMONIALS_DATA.map((t) => (
            <li key={t.id} className="grid gap-5 border-b border-rule py-9 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="font-semibold">{t.name}</p>
                <p className="t-meta mt-1 text-lead">{t.location}</p>
                <p className="t-meta mt-4 text-lead">{t.service}</p>
                <p className="t-meta text-lead">{t.detail}</p>
              </div>
              <figure className="lg:col-span-8">
                <blockquote className="font-serif text-[1.25rem] leading-[1.6] sm:text-[1.5rem]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="sr-only">
                  {t.name}, {t.location}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
