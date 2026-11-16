import { CARE_PLANS } from "@/data/care-plans";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { CarePlanButton } from "@/components/sections/care-plan-button";
import { cn } from "@/lib/utils";

/** Annual membership tiers. The middle plan is raised, not boxed. */
export function CarePlansSection() {
  return (
    <section id="care" aria-labelledby="care-title" className="section">
      <div className="wrap">
        <SectionHeader
          id="care-title"
          eyebrow="AUREL Care"
          title="A roof that’s looked after is a roof that lasts."
          intro="Choose a yearly plan and we watch over the roof for you: inspections, seasonal care and priority when storms hit."
        />

        <div className="mt-14 grid items-stretch gap-0 lg:mt-20 lg:grid-cols-3">
          {CARE_PLANS.map((plan, i) => (
            <FadeUp key={plan.id} delay={i * 0.08} className={cn("flex", plan.featured && "lg:-my-6")}>
              <div
                className={cn(
                  "flex w-full flex-col border-y p-8 sm:p-10 lg:border-x-0 first:lg:border-l",
                  plan.featured ? "on-deep border-deep bg-deep text-chalk shadow-[0_30px_80px_-30px_rgb(18_32_42/0.6)] lg:py-14" : "border-ink bg-chalk"
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="t-h3">{plan.name}</h3>
                  {plan.featured && <span className="t-meta bg-patina-hi px-2.5 py-1 font-semibold text-deep">Most chosen</span>}
                </div>
                <p className={cn("t-meta mt-2", plan.featured ? "text-mist" : "text-lead")}>{plan.blurb}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="font-sans text-5xl font-semibold tabular-nums tracking-tight [font-stretch:108%]">${plan.price}</span>
                  <span className={cn("text-[0.9375rem]", plan.featured ? "text-mist" : "text-lead")}>per year</span>
                </p>
                <ul className={cn("mt-8 flex-1 divide-y border-y text-[0.9375rem]", plan.featured ? "divide-rule-deep border-rule-deep" : "divide-rule border-rule")}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 py-3">
                      <svg viewBox="0 0 16 16" className={cn("mt-1 h-4 w-4 shrink-0", plan.featured ? "text-patina-hi" : "text-patina")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5L13.5 4.5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CarePlanButton planName={plan.name} featured={plan.featured} />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <p className="t-meta mt-10 max-w-[70ch] text-lead">
          Plans are billed yearly and can be cancelled at any time. Prices shown are sample figures. <Button variant="text" href="/book">Not sure which fits? Book a free inspection first.</Button>
        </p>
      </div>
    </section>
  );
}
