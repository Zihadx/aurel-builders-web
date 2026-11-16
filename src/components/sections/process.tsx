"use client";

import { WordsReveal } from "@/components/ui/motion";
import { SITE_CONFIG } from "@/data/site";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

/** The one genuinely sequential piece of content, so it is the one numbered
 *  list. The rule draws across once when it scrolls into view. */
export function ProcessSection() {
  const { process } = SITE_CONFIG;
  const [ref, inView] = useInView<HTMLOListElement>("-20% 0px");

  return (
    <section id="process" aria-labelledby="process-title" className="section bg-chalk">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <WordsReveal id="process-title" className="t-h2 lg:col-span-7" text={process.heading} />
          <p className="t-body text-lead lg:col-span-5 lg:pt-2">{process.intro}</p>
        </div>

        <ol ref={ref} className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-[0.9rem] hidden h-px w-full origin-left bg-ink transition-transform duration-[1400ms] ease-[var(--ease-in-out)] lg:block",
              inView ? "scale-x-100" : "scale-x-0"
            )}
          />
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative lg:pt-12">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 hidden h-7 w-7 place-items-center rounded-full border border-ink bg-chalk text-[0.8125rem] font-semibold lg:grid"
              >
                {i + 1}
              </span>
              <h3 className="t-h3 flex items-baseline gap-3">
                <span className="text-patina lg:hidden">{i + 1}</span>
                {step.title}
              </h3>
              <p className="t-body mt-3 text-lead">{step.description}</p>
              <p className="mt-5 border-t border-rule pt-3 text-[0.9375rem]">
                <span className="text-lead">You receive: </span>
                <span className="font-medium">{step.deliverable}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
