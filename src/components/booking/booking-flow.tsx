"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { SERVICES_DATA } from "@/data/services";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import {
  BOOKING_CONTACT_METHODS,
  PROPERTY_TYPES,
  ROOF_AGES,
  STEP_FIELDS,
  TIME_WINDOWS,
  bookingSchema,
  type BookingValues,
} from "@/lib/booking-schema";

const STEPS = ["Service", "Property", "Date and time", "Your details", "Review"] as const;

const input =
  "h-12 w-full rounded-[2px] border border-rule bg-chalk px-3.5 text-[0.9375rem] text-ink placeholder:text-lead/70 aria-[invalid=true]:border-alert";

interface Done {
  reference: string;
  delivered: boolean;
  values: BookingValues;
}

/* ---------- date helpers (all local time) ---------- */
const pad = (n: number) => String(n).padStart(2, "0");
const toYmd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromYmd = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const longDate = (s: string) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(fromYmd(s));

function buildIcs(v: BookingValues, reference: string) {
  const w = TIME_WINDOWS.find((x) => x.value === v.window)!;
  const day = v.date.replaceAll("-", "");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AUREL Roofing Co.//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${reference}@aurel.example`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${day}T${pad(w.start)}0000`,
    `DTEND:${day}T${pad(w.end)}0000`,
    `SUMMARY:Roof inspection with AUREL (requested window)`,
    `LOCATION:${v.address.replace(/[,;]/g, " ")}`,
    `DESCRIPTION:Reference ${reference}. This is the window you requested. AUREL will confirm the exact arrival time by ${v.contactMethod.toLowerCase()}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return new Blob([lines.join("\r\n")], { type: "text/calendar" });
}

export function BookingFlow() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState<Done | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      service: "Roof Inspection",
      propertyType: "Single-family home",
      roofAge: "Not sure",
      contactMethod: "Phone Call",
      address: "",
      date: "",
      fullName: "",
      email: "",
      phone: "",
      notes: "",
      website: "",
    },
  });
  const v = useWatch({ control }) as BookingValues;

  // Next 4 weeks, Monday to Saturday, starting tomorrow. Built only in the
  // browser (it depends on today's date), without an effect-driven setState.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const days = useMemo(() => {
    if (!mounted) return [];
    const out: string[] = [];
    const now = new Date();
    for (let i = 1; i <= 28; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      if (d.getDay() !== 0) out.push(toYmd(d));
    }
    return out;
  }, [mounted]);

  // Move focus to the step heading whenever the step changes
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const go = async (to: number) => {
    if (to > step) {
      const fields = STEP_FIELDS[step];
      if (fields && !(await trigger(fields))) return;
    }
    setDir(to > step ? 1 : -1);
    setStep(to);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const submit = async (values: BookingValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please call us instead.");
        return;
      }
      setDone({ reference: data.reference, delivered: data.delivered, values });
      window.scrollTo({ top: 0 });
    } catch {
      setServerError("We couldn’t reach the server. Check your connection, or message us on WhatsApp.");
    }
  };

  const err = (n: keyof BookingValues) => errors[n]?.message as string | undefined;

  // Calendar grid: Mon..Sat columns
  const weeks = useMemo(() => {
    const rows: Array<Array<string | null>> = [];
    let row: Array<string | null> = Array(6).fill(null);
    days.forEach((d) => {
      const col = (fromYmd(d).getDay() + 6) % 7; // Mon=0
      if (col === 0 && row.some(Boolean)) {
        rows.push(row);
        row = Array(6).fill(null);
      }
      row[col] = d;
    });
    if (row.some(Boolean)) rows.push(row);
    return rows;
  }, [days]);

  /* ---------------------------- success ---------------------------- */
  if (done) {
    const { values, reference, delivered } = done;
    const w = TIME_WINDOWS.find((x) => x.value === values.window)!;
    return (
      <div className="mx-auto max-w-2xl" role="status" aria-live="polite">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-patina text-chalk">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 ref={headingRef} tabIndex={-1} className="t-h2 mt-6 outline-none">
          {delivered ? `You’re on the schedule, ${values.fullName.split(" ")[0]}.` : `Thanks, ${values.fullName.split(" ")[0]}.`}
        </h1>
        <p className="t-body mt-4 text-lead">
          {delivered
            ? `We’ve received your request for ${longDate(values.date)}, ${w.label.toLowerCase()}. We’ll confirm your exact arrival time by ${values.contactMethod.toLowerCase()}.`
            : "Your booking passed validation, but this site isn’t connected to a destination yet, so nothing was sent. Set LEAD_WEBHOOK_URL on the server to receive bookings."}
        </p>

        <dl className="mt-8 divide-y divide-rule border-y border-rule text-[0.9375rem]">
          {[
            ["Reference", reference],
            ["Service", values.service],
            ["When", `${longDate(values.date)}, ${w.range}`],
            ["Where", values.address],
          ].map(([k, val]) => (
            <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
              <dt className="text-lead">{k}</dt>
              <dd className="font-medium">{val}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() => {
              const url = URL.createObjectURL(buildIcs(values, reference));
              const a = document.createElement("a");
              a.href = url;
              a.download = `aurel-inspection-${reference}.ics`;
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
          >
            Add to calendar
          </Button>
          <Button
            variant="outline"
            size="lg"
            href={whatsappUrl(`Hi AUREL, I just requested an inspection (${reference}) for ${longDate(values.date)}, ${w.label.toLowerCase()}.`)}
          >
            Confirm on WhatsApp
          </Button>
          <Button variant="text" href="/">
            Back to the site
          </Button>
        </div>
      </div>
    );
  }

  /* ---------------------------- wizard ---------------------------- */
  const slide = {
    initial: reduce ? false : { opacity: 0, x: 36 * dir },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? undefined : { opacity: 0, x: -36 * dir },
    transition: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as const },
  };
  const selectedWindow = TIME_WINDOWS.find((x) => x.value === v.window);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        {/* progress */}
        <nav aria-label="Booking progress">
          <ol className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <li key={s} className="flex-1">
                <button
                  type="button"
                  onClick={() => i < step && go(i)}
                  disabled={i > step}
                  aria-current={i === step ? "step" : undefined}
                  className={cn("group block w-full text-left", i < step ? "cursor-pointer" : "cursor-default")}
                >
                  <span className={cn("block h-1 w-full transition-colors duration-500", i <= step ? "bg-patina" : "bg-rule")} />
                  <span className={cn("t-meta mt-2 hidden sm:block", i === step ? "font-semibold text-ink" : "text-lead")}>
                    {i + 1}. {s}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="t-meta mt-3 text-lead sm:hidden">
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </p>
        </nav>

        <form onSubmit={handleSubmit(submit)} noValidate className="mt-10">
          {/* honeypot */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="b-website">Leave this field empty</label>
            <input id="b-website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} {...slide}>
              {step === 0 && (
                <fieldset>
                  <legend className="sr-only">Choose a service</legend>
                  <h1 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">What do you need help with?</h1>
                  <p className="t-body mt-3 text-lead">Not sure? Choose a free inspection. We’ll tell you honestly what the roof needs.</p>
                  <div className="mt-8 border-t border-ink">
                    {SERVICES_DATA.map((s) => {
                      const selected = v.service === s.formValue;
                      return (
                        <label
                          key={s.id}
                          className="flex cursor-pointer items-start justify-between gap-4 border-b border-rule py-5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-patina"
                        >
                          <input
                            type="radio"
                            value={s.formValue}
                            className="sr-only"
                            {...register("service")}
                          />
                          <span className="flex items-start gap-4">
                            <span aria-hidden="true" className={cn("mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors", selected ? "border-patina bg-patina" : "border-lead")}>
                              {selected && <span className="h-1.5 w-1.5 rounded-full bg-chalk" />}
                            </span>
                            <span>
                              <span className={cn("t-h3 block transition-colors", selected && "text-patina")}>{s.title}</span>
                              <span className="t-meta mt-1 block text-lead">{s.summary}</span>
                            </span>
                          </span>
                          <span className="t-meta shrink-0 pt-1 text-lead">{s.timeline}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h1 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">Tell us about the property.</h1>
                    <p className="t-body mt-3 text-lead">So the right person arrives with the right ladder.</p>
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-[0.9375rem] font-medium">Property type</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {PROPERTY_TYPES.map((p) => (
                        <label key={p} className={cn("flex min-h-12 cursor-pointer items-center rounded-[2px] border px-4 text-[0.9375rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-patina", v.propertyType === p ? "border-patina bg-patina/10 font-medium" : "border-rule hover:border-ink")}>
                          <input type="radio" value={p} className="sr-only" {...register("propertyType")} />
                          {p}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="b-address" className="mb-2 block text-[0.9375rem] font-medium">Property address <span aria-hidden="true" className="text-patina">*</span></label>
                    <input id="b-address" autoComplete="street-address" aria-invalid={!!errors.address} aria-describedby={errors.address ? "b-address-err" : undefined} className={input} {...register("address")} />
                    <FieldError id="b-address-err" msg={err("address")} />
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-[0.9375rem] font-medium">How old is the roof?</legend>
                    <div className="flex flex-wrap gap-2">
                      {ROOF_AGES.map((a) => (
                        <label key={a} className={cn("flex h-11 cursor-pointer items-center rounded-[2px] border px-4 text-[0.9375rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-patina", v.roofAge === a ? "border-ink bg-ink text-chalk" : "border-rule hover:border-ink")}>
                          <input type="radio" value={a} className="sr-only" {...register("roofAge")} />
                          {a}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h1 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">Pick a day and a window.</h1>
                    <p className="t-body mt-3 text-lead">Visits run Monday to Saturday. We’ll confirm your exact arrival time.</p>
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-[0.9375rem] font-medium">Day</legend>
                    {days.length === 0 ? (
                      <div className="h-48 animate-pulse bg-rule/50" aria-hidden="true" />
                    ) : (
                      <div>
                        <div className="grid grid-cols-6 gap-1.5 text-center t-meta text-lead" aria-hidden="true">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <span key={d}>{d}</span>)}
                        </div>
                        <div className="mt-1.5 space-y-1.5">
                          {weeks.map((row, ri) => (
                            <div key={ri} className="grid grid-cols-6 gap-1.5">
                              {row.map((d, ci) => {
                                if (!d) return <span key={ci} />;
                                const dt = fromYmd(d);
                                const sel = v.date === d;
                                const first = dt.getDate() === 1 || (ri === 0 && d === days[0]);
                                return (
                                  <button
                                    key={d}
                                    type="button"
                                    aria-pressed={sel}
                                    aria-label={longDate(d)}
                                    onClick={() => setValue("date", d, { shouldValidate: true })}
                                    className={cn("flex h-14 cursor-pointer flex-col items-center justify-center rounded-[2px] border text-[0.9375rem] transition-colors", sel ? "border-patina bg-patina text-chalk" : "border-rule hover:border-ink")}
                                  >
                                    <span className="font-semibold">{dt.getDate()}</span>
                                    {first && <span className={cn("text-[0.6875rem] leading-none", sel ? "text-chalk/85" : "text-lead")}>{new Intl.DateTimeFormat("en-US", { month: "short" }).format(dt)}</span>}
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <FieldError id="b-date-err" msg={err("date")} />
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-[0.9375rem] font-medium">Time window</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {TIME_WINDOWS.map((w) => (
                        <label key={w.value} className={cn("cursor-pointer rounded-[2px] border px-4 py-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-patina", v.window === w.value ? "border-ink bg-ink text-chalk" : "border-rule hover:border-ink")}>
                          <input type="radio" value={w.value} className="sr-only" {...register("window")} />
                          <span className="block font-medium">{w.label}</span>
                          <span className={cn("t-meta block", v.window === w.value ? "text-mist" : "text-lead")}>{w.range}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError id="b-window-err" msg={err("window")} />
                  </fieldset>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h1 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">How do we reach you?</h1>
                    <p className="t-body mt-3 text-lead">We’ll only use these details to confirm your visit.</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="b-name" className="mb-2 block text-[0.9375rem] font-medium">Full name <span aria-hidden="true" className="text-patina">*</span></label>
                      <input id="b-name" autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "b-name-err" : undefined} className={input} {...register("fullName")} />
                      <FieldError id="b-name-err" msg={err("fullName")} />
                    </div>
                    <div>
                      <label htmlFor="b-email" className="mb-2 block text-[0.9375rem] font-medium">Email <span aria-hidden="true" className="text-patina">*</span></label>
                      <input id="b-email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "b-email-err" : undefined} className={input} {...register("email")} />
                      <FieldError id="b-email-err" msg={err("email")} />
                    </div>
                    <div>
                      <label htmlFor="b-phone" className="mb-2 block text-[0.9375rem] font-medium">Phone <span aria-hidden="true" className="text-patina">*</span></label>
                      <input id="b-phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "b-phone-err" : undefined} className={input} {...register("phone")} />
                      <FieldError id="b-phone-err" msg={err("phone")} />
                    </div>
                    <div>
                      <label htmlFor="b-method" className="mb-2 block text-[0.9375rem] font-medium">Best way to reach you</label>
                      <select id="b-method" className={cn(input, "cursor-pointer")} {...register("contactMethod")}>
                        {BOOKING_CONTACT_METHODS.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="b-notes" className="mb-2 block text-[0.9375rem] font-medium">Anything we should know? (optional)</label>
                    <textarea id="b-notes" rows={4} placeholder="Active leak, gate code, pets, best entrance…" aria-invalid={!!errors.notes} aria-describedby={errors.notes ? "b-notes-err" : undefined} className={cn(input, "h-auto py-3")} {...register("notes")} />
                    <FieldError id="b-notes-err" msg={err("notes")} />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h1 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">Check and confirm.</h1>
                  <p className="t-body mt-3 text-lead">Everything look right? You can change any step before sending.</p>
                  <dl className="mt-8 divide-y divide-rule border-y border-ink text-[0.9375rem]">
                    {[
                      ["Service", v.service, 0],
                      ["Property", `${v.propertyType}, roof ${v.roofAge.toLowerCase()}`, 1],
                      ["Address", v.address, 1],
                      ["When", v.date && selectedWindow ? `${longDate(v.date)}, ${selectedWindow.range}` : "", 2],
                      ["Contact", `${v.fullName} · ${v.phone} · ${v.email}`, 3],
                      ["Reach you by", v.contactMethod, 3],
                      ...(v.notes ? [["Notes", v.notes, 3] as const] : []),
                    ].map(([k, val, s]) => (
                      <div key={k as string} className="grid grid-cols-[7.5rem_1fr_auto] items-start gap-4 py-3.5">
                        <dt className="text-lead">{k}</dt>
                        <dd className="break-words font-medium">{val}</dd>
                        <dd>
                          <button type="button" onClick={() => go(s as number)} className="cursor-pointer text-patina underline underline-offset-4 hover:text-patina-deep">
                            Edit<span className="sr-only"> {k}</span>
                          </button>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {serverError && (
                    <p role="alert" className="mt-6 flex items-start gap-2 text-[0.9375rem] font-medium text-alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {serverError}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* controls */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-rule pt-6">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className="inline-flex h-11 cursor-pointer items-center gap-2 text-[0.9375rem] font-medium text-lead hover:text-ink disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => go(step + 1)} size="lg">
                Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>) : "Request this inspection"}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* what to expect */}
      <aside className="lg:col-span-5" aria-label="What to expect">
        <div className="bg-deep p-7 text-chalk sm:p-9 lg:sticky lg:top-28 on-deep">
          <h2 className="t-h3">What happens on the visit</h2>
          <ol className="mt-6 divide-y divide-rule-deep border-y border-rule-deep">
            {[
              ["60 to 90 minutes", "We check the roof surface, flashings, gutters and attic."],
              ["Photographed", "You receive annotated photos of everything we find."],
              ["No obligation", "A written scope follows. You decide what, if anything, happens next."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4 py-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-patina-hi text-[0.8125rem] font-semibold text-deep">{i + 1}</span>
                <span>
                  <span className="block font-medium">{t}</span>
                  <span className="t-meta mt-1 block text-mist">{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6 space-y-2 text-[0.9375rem]">
            <p className="t-meta text-mist">Rather talk it through?</p>
            <p>
              <a href={SITE_CONFIG.contact.phoneHref} className="font-medium hover:text-patina-hi">{SITE_CONFIG.contact.phoneDisplay}</a>
              <span className="text-mist"> · </span>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-patina-hi">WhatsApp</a>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] font-medium text-alert">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {msg}
    </p>
  );
}
