import { SITE_CONFIG } from "@/data/site";

export function AssurancesSection() {
  return (
    <section aria-label="What every job includes" className="border-y border-rule">
      <ul className="wrap grid grid-cols-1 divide-y divide-rule sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
        {SITE_CONFIG.assurances.map((a) => (
          <li key={a.title} className="py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0">
            <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-patina" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                <path d="M2.5 8.5l3.5 3.5L13.5 4.5" />
              </svg>
              {a.title}
            </p>
            <p className="t-meta mt-1.5 pl-6 text-lead">{a.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
