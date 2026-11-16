"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useEstimate } from "@/lib/estimate-context";
import { whatsappUrl } from "@/lib/whatsapp";
import { IMAGES } from "@/data/images";
import { Photo } from "@/components/ui/photo";
import { WordsReveal } from "@/components/ui/motion";
import {
  CONTACT_METHODS,
  SERVICE_OPTIONS,
  estimateSchema,
  type EstimateFormValues,
} from "@/lib/estimate-schema";
import { cn } from "@/lib/utils";

interface Result {
  values: EstimateFormValues;
  reference: string;
  delivered: boolean;
}

const field =
  "h-12 w-full rounded-[2px] border border-rule bg-paper px-3.5 text-[0.9375rem] text-ink placeholder:text-lead/70 aria-[invalid=true]:border-alert";

export function ContactSection() {
  const { contact, contactSection } = SITE_CONFIG;
  const { service, scope } = useEstimate();
  const [result, setResult] = useState<Result | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      propertyAddress: "",
      serviceRequired: "Roof Replacement",
      preferredContactMethod: "Phone Call",
      projectDescription: "",
      website: "",
    },
  });

  // Pre-fill from the services list and the material configurator
  useEffect(() => {
    if (service && (SERVICE_OPTIONS as readonly string[]).includes(service)) {
      setValue("serviceRequired", service as EstimateFormValues["serviceRequired"]);
    }
  }, [service, setValue]);
  useEffect(() => {
    if (scope) setValue("projectDescription", scope, { shouldValidate: false });
  }, [scope, setValue]);

  const onSubmit = async (values: EstimateFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please call us instead.");
        return;
      }
      setResult({ values, reference: data.reference, delivered: data.delivered });
    } catch {
      setServerError("We couldn’t reach the server. Check your connection or call us instead.");
    }
  };

  const err = (name: keyof EstimateFormValues) => errors[name]?.message as string | undefined;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="pitch-top on-deep relative isolate bg-deep text-chalk"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Photo image={IMAGES.cta} sizes="100vw" className="h-full w-full" imgClassName="opacity-25 saturate-[0.6]" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/80 to-deep" />
      </div>
      <div className="wrap pb-[var(--section-y)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <WordsReveal id="contact-title" className="t-h2" text={contactSection.heading} />
            <p className="t-body mt-6 text-mist">{contactSection.intro}</p>
            <ul className="mt-6 space-y-2.5">
              {SITE_CONFIG.included.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem]">
                  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-patina-hi" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5L13.5 4.5" /></svg>
                  {item}
                </li>
              ))}
            </ul>

            <dl className="mt-10 divide-y divide-rule-deep border-y border-rule-deep">
              <div className="py-5">
                <dt className="t-meta text-mist">Call</dt>
                <dd className="mt-1">
                  <a href={contact.phoneHref} className="font-sans text-2xl font-semibold [font-stretch:108%] hover:text-patina-hi">
                    {contact.phoneDisplay}
                  </a>
                  <span className="t-meta mt-1 block text-mist">{contact.emergencyNote}</span>
                </dd>
              </div>
              <div className="py-5">
                <dt className="t-meta text-mist">Prefer to pick a time?</dt>
                <dd className="mt-3 flex flex-wrap gap-3">
                  <Button href="/book" variant="outline-deep">Book online</Button>
                  <Button href={whatsappUrl()} variant="outline-deep">WhatsApp us</Button>
                </dd>
              </div>
              <div className="py-5">
                <dt className="t-meta text-mist">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${contact.email}`} className="break-all text-[1.0625rem] font-medium hover:text-patina-hi">
                    {contact.email}
                  </a>
                  <span className="t-meta mt-1 block text-mist">Send photos, drawings or questions.</span>
                </dd>
              </div>
              <div className="py-5">
                <dt className="t-meta text-mist">Hours</dt>
                <dd className="mt-1 text-[1.0625rem] font-medium">
                  {contact.officeHours}
                  <span className="t-meta mt-1 block font-normal text-mist">{contact.headquartersSample}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-chalk p-6 text-ink sm:p-10">
              {result ? (
                <div role="status" aria-live="polite" className="space-y-6">
                  <h3 className="t-h2 text-[1.75rem] sm:text-[2.25rem]">
                    Thanks, {result.values.fullName.split(" ")[0]}.
                  </h3>
                  <p className="t-body">
                    {result.delivered
                      ? `We’ve received your ${result.values.serviceRequired.toLowerCase()} request and will reach out by ${result.values.preferredContactMethod.toLowerCase()} to arrange a time.`
                      : "Your request passed validation, but this site isn’t connected to a destination yet, so nothing was sent. Set LEAD_WEBHOOK_URL on the server to deliver requests."}
                  </p>
                  <dl className="divide-y divide-rule border-y border-rule text-[0.9375rem]">
                    {[
                      ["Reference", result.reference],
                      ["Service", result.values.serviceRequired],
                      ["Contact by", `${result.values.preferredContactMethod}, ${result.values.phone}`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-3">
                        <dt className="text-lead">{k}</dt>
                        <dd className="text-right font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResult(null);
                      reset();
                    }}
                  >
                    Send another request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  <div className="border-b border-rule pb-5">
                    <h3 className="t-h3">{contactSection.formTitle}</h3>
                    <p className="t-meta mt-1 text-lead">{contactSection.formNote}</p>
                  </div>

                  {/* Honeypot: hidden from people and assistive tech */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Leave this field empty</label>
                    <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="fullName" label="Full name" error={err("fullName")} required>
                      <input id="fullName" type="text" autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-err" : undefined} className={field} {...register("fullName")} />
                    </Field>
                    <Field id="email" label="Email" error={err("email")} required>
                      <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={field} {...register("email")} />
                    </Field>
                    <Field id="phone" label="Phone" error={err("phone")} required>
                      <input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} className={field} {...register("phone")} />
                    </Field>
                    <Field id="propertyAddress" label="Property address (optional)">
                      <input id="propertyAddress" type="text" autoComplete="street-address" placeholder="Street or neighborhood" className={field} {...register("propertyAddress")} />
                    </Field>
                    <Field id="serviceRequired" label="Service" required>
                      <select id="serviceRequired" className={cn(field, "cursor-pointer")} {...register("serviceRequired")}>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="preferredContactMethod" label="Best way to reach you" required>
                      <select id="preferredContactMethod" className={cn(field, "cursor-pointer")} {...register("preferredContactMethod")}>
                        {CONTACT_METHODS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field id="projectDescription" label="What’s going on with your roof?" error={err("projectDescription")} required>
                    <textarea
                      id="projectDescription"
                      rows={4}
                      placeholder="Roof age, active leaks, storm damage, or the material you’re considering."
                      aria-invalid={!!errors.projectDescription}
                      aria-describedby={errors.projectDescription ? "projectDescription-err" : undefined}
                      className={cn(field, "h-auto py-3")}
                      {...register("projectDescription")}
                    />
                  </Field>

                  {serverError && (
                    <p role="alert" className="flex items-start gap-2 text-[0.9375rem] font-medium text-alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {serverError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        "Send estimate request"
                      )}
                    </Button>
                    <p className="t-meta text-lead">We’ll only use your details to arrange your inspection.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium">
        {label}
        {required && <span className="text-patina" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] font-medium text-alert">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
