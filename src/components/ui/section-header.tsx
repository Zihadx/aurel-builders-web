import { cn } from "@/lib/utils";
import { FadeUp, WordsReveal } from "@/components/ui/motion";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
}

/** One header for every section, so label, title and intro always line up the
 *  same way: title left (7 cols), intro right (5 cols), bottoms aligned. */
export function SectionHeader({ id, eyebrow, title, intro, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-7">
        <FadeUp>
          <p className={cn("t-label mb-5 flex items-center gap-3", dark ? "text-patina-hi" : "text-patina")}>
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {eyebrow}
          </p>
        </FadeUp>
        <WordsReveal id={id} className="t-h2" text={title} />
      </div>
      {intro && (
        <FadeUp delay={0.1} className="lg:col-span-5">
          <p className={cn("t-body", dark ? "text-mist" : "text-lead")}>{intro}</p>
        </FadeUp>
      )}
    </div>
  );
}
