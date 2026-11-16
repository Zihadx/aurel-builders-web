"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { HEALTH_QUESTIONS, bandFor } from "@/data/health-check";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { useEstimate } from "@/lib/estimate-context";
import { cn } from "@/lib/utils";

type Answers = Record<string, number[]>; // question id -> chosen option indexes

const RING = 2 * Math.PI * 54;

/** Two-minute interactive roof check. Scores locally (nothing is sent), then
 *  hands the result to the booking page so the visit starts informed. */
export function HealthCheckSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const reduce = useReducedMotion();
  const { setService, setScope } = useEstimate();

  const done = step >= HEALTH_QUESTIONS.length;
  const q = HEALTH_QUESTIONS[Math.min(step, HEALTH_QUESTIONS.length - 1)];
  const chosen = answers[q.id] ?? [];

  const penalty = HEALTH_QUESTIONS.reduce((sum, qu) => sum + (answers[qu.id] ?? []).reduce((s, i) => s + qu.options[i].penalty, 0), 0);
  const score = Math.max(5, 100 - penalty);
  const band = bandFor(score);

  const pick = (i: number) => {
    const opt = q.options[i];
    if (q.multi) {
      setAnswers((a) => {
        const cur = a[q.id] ?? [];
        if (opt.none) return { ...a, [q.id]: [i] };
        const withoutNone = cur.filter((x) => !q.options[x].none);
        return { ...a, [q.id]: withoutNone.includes(i) ? withoutNone.filter((x) => x !== i) : [...withoutNone, i] };
      });
    } else {
      setAnswers((a) => ({ ...a, [q.id]: [i] }));
      window.setTimeout(() => setStep((s) => s + 1), reduce ? 0 : 220);
    }
  };

  const summary = () =>
    `Roof Health Check: ${score}/100 (${band.label}). ` +
    HEALTH_QUESTIONS.map((qu) => `${qu.prompt} ${(answers[qu.id] ?? []).map((i) => qu.options[i].label).join(", ") || "n/a"}.`).join(" ");

  return (
    <section id="health-check" aria-labelledby="health-title" className="section on-deep grain bg-deep text-chalk">
      <div className="wrap">
        <SectionHeader
          id="health-title"
          eyebrow="Roof health check"
          title="How healthy is your roof? Find out in two minutes."
          intro="Five quick questions give you an honest score and a sensible next step. Your answers stay in your browser."
          tone="dark"
        />

        <div className="mt-14 grid gap-10 border border-rule-deep p-6 sm:p-10 lg:mt-20 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <AnimatePresence mode="wait" initial={false}>
            {!done ? (
              <motion.div
                key={`q-${step}`}
                className="lg:col-span-12"
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="t-label text-patina-hi">Question {step + 1} of {HEALTH_QUESTIONS.length}</p>
                  {step > 0 && (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex cursor-pointer items-center gap-1.5 text-[0.9375rem] text-mist hover:text-chalk">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                    </button>
                  )}
                </div>
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                  {HEALTH_QUESTIONS.map((_, i) => (
                    <span key={i} className={cn("h-1 flex-1 transition-colors duration-500", i <= step ? "bg-patina-hi" : "bg-rule-deep")} />
                  ))}
                </div>

                <fieldset className="mt-10">
                  <legend className="t-h2 max-w-[22ch]">{q.prompt}</legend>
                  <p className="t-body mt-3 text-mist">{q.hint}</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {q.options.map((o, i) => {
                      const on = chosen.includes(i);
                      return (
                        <button
                          key={o.label}
                          type="button"
                          aria-pressed={on}
                          onClick={() => pick(i)}
                          className={cn(
                            "flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-[2px] border px-5 py-3 text-left text-[1rem] transition-colors",
                            on ? "border-patina-hi bg-patina-hi/10 text-chalk" : "border-rule-deep text-mist hover:border-mist hover:text-chalk"
                          )}
                        >
                          {o.label}
                          <span aria-hidden="true" className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors", on ? "border-patina-hi bg-patina-hi" : "border-mist")}>
                            {on && <svg viewBox="0 0 16 16" className="h-3 w-3 text-deep" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8.5l3.5 3.5L13 5" /></svg>}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {q.multi && (
                    <div className="mt-8">
                      <Button onClick={() => setStep((s) => s + 1)} disabled={chosen.length === 0} size="lg">
                        {chosen.length === 0 ? "Choose at least one" : "Continue"}
                      </Button>
                    </div>
                  )}
                </fieldset>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className="grid gap-10 lg:col-span-12 lg:grid-cols-12 lg:items-center lg:gap-16"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                role="status"
                aria-live="polite"
              >
                <div className="relative mx-auto grid h-56 w-56 place-items-center lg:col-span-4">
                  <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-rule-deep)" strokeWidth="6" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="var(--color-patina-hi)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={RING}
                      strokeDashoffset={RING * (1 - score / 100)}
                      style={{ transition: reduce ? "none" : "stroke-dashoffset 1.6s var(--ease-out)" }}
                    />
                  </svg>
                  <div className="text-center">
                    <p className="font-sans text-6xl font-semibold tabular-nums [font-stretch:108%]">{score}</p>
                    <p className="t-meta text-mist">out of 100</p>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <p className="t-label text-patina-hi">{band.label}</p>
                  <h3 className="t-h2 mt-2 max-w-[24ch]">{band.headline}</h3>
                  <ul className="mt-6 space-y-2.5">
                    {band.advice.map((a) => (
                      <li key={a} className="flex gap-3 text-[1rem] text-mist">
                        <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-patina-hi" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5L13.5 4.5" /></svg>
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                      href="/book"
                      size="lg"
                      onClick={() => {
                        setService("Roof Inspection");
                        setScope(summary());
                      }}
                    >
                      Book a free inspection
                    </Button>
                    <button type="button" onClick={() => { setAnswers({}); setStep(0); }} className="cursor-pointer text-[0.9375rem] text-mist underline underline-offset-4 hover:text-chalk">
                      Retake the check
                    </button>
                  </div>
                  <p className="t-meta mt-6 max-w-[60ch] text-mist">This is a guide, not a diagnosis. Only an on-site inspection can confirm your roof’s condition.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
