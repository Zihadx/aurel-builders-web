import { TEAM_DATA } from "@/data/team";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeUp } from "@/components/ui/motion";

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

/** The people behind the work. Monogram portraits until real photos exist. */
export function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-title" className="section bg-chalk">
      <div className="wrap">
        <SectionHeader
          id="team-title"
          eyebrow="The people"
          title="The people who will be on your roof."
          intro="Four decades of combined experience, and the same crews on every job, so you meet the people doing the work."
        />
        <ul className="mt-14 grid gap-x-8 gap-y-12 border-t border-ink pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {TEAM_DATA.map((m, i) => (
            <li key={m.name}>
              <FadeUp delay={i * 0.07}>
                <div aria-hidden="true" className="relative grid aspect-square w-24 place-items-center rounded-full bg-deep font-sans text-3xl font-semibold tracking-wide text-patina-hi [font-stretch:112%]">
                  {initials(m.name)}
                  <span className="absolute inset-[-6px] rounded-full border border-patina/40" />
                </div>
                <h3 className="t-h3 mt-6">{m.name}</h3>
                <p className="mt-1 text-[0.9375rem] font-medium text-patina">{m.role}</p>
                <p className="t-meta mt-1 text-lead">{m.years} years in roofing · {m.focus}</p>
                <blockquote className="t-body mt-5 border-l-2 border-patina pl-4 text-[1rem] italic">“{m.quote}”</blockquote>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
