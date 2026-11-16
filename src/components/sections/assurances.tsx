import { SITE_CONFIG } from "@/data/site";
import { CountUp } from "@/components/ui/count-up";
import { Stars } from "@/components/ui/stars";
import { FadeUp } from "@/components/ui/motion";

/** Proof bar: headline numbers, the rating, then the standing commitments. */
export function AssurancesSection() {
  const { proof, assurances } = SITE_CONFIG;
  return (
    <section aria-label="Why homeowners trust AUREL" className="border-b border-rule bg-paper">
      <div className="wrap py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <FadeUp className="lg:col-span-4 lg:border-r lg:border-rule lg:pr-8">
            <div className="flex items-center gap-4">
              <span className="font-sans text-5xl font-semibold tracking-tight [font-stretch:108%]">{proof.rating.toFixed(1)}</span>
              <div>
                <Stars rating={proof.rating} />
                <p className="t-meta mt-1 text-lead">
                  {proof.reviewCount.toLocaleString("en-US")} reviews on {proof.platform}
                </p>
              </div>
            </div>
          </FadeUp>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-8 lg:grid-cols-4">
            {proof.stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-sans text-3xl font-semibold tracking-tight [font-stretch:108%] sm:text-4xl">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                  <span className="mt-1 block text-[0.9375rem] font-medium">{s.label}</span>
                  <span className="t-meta mt-0.5 block text-lead">{s.detail}</span>
                </dd>
              </FadeUp>
            ))}
          </dl>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-5 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {assurances.map((a) => (
            <li key={a.title} className="flex gap-3">
              <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-patina" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                <path d="M2.5 8.5l3.5 3.5L13.5 4.5" />
              </svg>
              <div>
                <p className="text-[0.9375rem] font-semibold">{a.title}</p>
                <p className="t-meta mt-1 text-lead">{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
