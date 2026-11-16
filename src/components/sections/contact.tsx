"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { EstimateFormValues } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const estimateSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  propertyAddress: z.string().optional(),
  serviceRequired: z.enum([
    "Roof Replacement",
    "Roof Repair",
    "Roof Inspection",
    "Storm Damage",
    "Gutter Installation",
    "Siding & Exterior",
    "Other",
  ]),
  preferredContactMethod: z.enum(["Phone Call", "Email", "Text Message"]),
  projectDescription: z
    .string()
    .min(
      12,
      "Please share a brief note about your roofing needs (at least 12 characters)."
    ),
});

interface ContactSectionProps {
  preselectedService?: string;
  prefilledScopeDescription?: string;
}

async function submitEstimateDemonstration(
  data: EstimateFormValues
): Promise<{ ok: boolean; referenceCode: string }> {
  await new Promise((resolve) => setTimeout(resolve, 650));
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return {
    ok: true,
    referenceCode: `AUR-${randomDigits}`,
  };
}

export function ContactSection({
  preselectedService,
  prefilledScopeDescription,
}: ContactSectionProps) {
  const [submittedData, setSubmittedData] = useState<{
    values: EstimateFormValues;
    referenceCode: string;
  } | null>(null);

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
    },
  });

  useEffect(() => {
    if (!preselectedService) return;
    const validServices: EstimateFormValues["serviceRequired"][] = [
      "Roof Replacement",
      "Roof Repair",
      "Roof Inspection",
      "Storm Damage",
      "Gutter Installation",
      "Siding & Exterior",
      "Other",
    ];
    const matched = validServices.find((s) =>
      preselectedService.toLowerCase().includes(s.toLowerCase())
    );
    if (matched) {
      setValue("serviceRequired", matched);
    } else if (preselectedService.toLowerCase().includes("storm")) {
      setValue("serviceRequired", "Storm Damage");
    }
  }, [preselectedService, setValue]);

  useEffect(() => {
    if (prefilledScopeDescription) {
      setValue("serviceRequired", "Roof Replacement");
      setValue("projectDescription", prefilledScopeDescription);
    }
  }, [prefilledScopeDescription, setValue]);

  const onSubmit = async (values: EstimateFormValues) => {
    const response = await submitEstimateDemonstration(values);
    if (response.ok) {
      setSubmittedData({
        values,
        referenceCode: response.referenceCode,
      });
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 dark-mesh-surface text-ivory">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Concierge Details */}
          <Reveal className="lg:col-span-5 space-y-8">
            <SectionHeading
              label="Complimentary Consultation"
              heading="Start With an Honest"
              serifAccent="Roof Assessment."
              description="Tell us about your home and roofing goals. Whether you need a targeted leak repair, storm damage documentation, or a full architectural roof replacement, we provide clear, itemized guidance."
              theme="dark"
              className="mb-0"
            />

            <div className="space-y-4">
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="block p-6 rounded-2xl bg-graphite/80 border border-white/10 hover:border-copper/60 transition-colors"
              >
                <span className="text-xs font-medium text-copperLight block">
                  Direct Architectural Desk (Sample)
                </span>
                <span className="font-display text-2xl font-semibold text-ivory mt-1 block">
                  {SITE_CONFIG.contact.phoneDisplay}
                </span>
                <span className="text-xs text-ivory/60 mt-1 block">
                  Priority storm tarping &amp; inspection dispatch
                </span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="block p-6 rounded-2xl bg-graphite/80 border border-white/10 hover:border-copper/60 transition-colors"
              >
                <span className="text-xs font-medium text-copperLight block">
                  Project Concierge Email
                </span>
                <span className="font-display text-base font-semibold text-ivory mt-1 block">
                  {SITE_CONFIG.contact.email}
                </span>
                <span className="text-xs text-ivory/60 mt-1 block">
                  Share architectural drawings, photos, or scope inquiries
                </span>
              </a>

              <div className="p-6 rounded-2xl bg-graphite/40 border border-white/10">
                <span className="text-xs font-medium text-sage block">
                  Inspection Hours &amp; Studio
                </span>
                <span className="font-display text-base font-semibold text-ivory mt-1 block">
                  {SITE_CONFIG.contact.officeHours}
                </span>
                <span className="text-xs text-ivory/60 mt-1 block">
                  {SITE_CONFIG.contact.headquartersSample}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: Elevated Tactile Form Surface */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl bg-ivory text-obsidian p-7 sm:p-11 border border-stone shadow-2xl">
              {submittedData ? (
                <div className="py-8 space-y-6" role="status" aria-live="polite">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/20 text-obsidian text-xs font-semibold">
                    ✓ Demonstration Inquiry Recorded
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-obsidian">
                    Thank You, {submittedData.values.fullName}.
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed">
                    This is an interactive{" "}
                    <strong>frontend demonstration state</strong>. In a live
                    deployment connected to your CRM or email endpoint, your{" "}
                    <strong>{submittedData.values.serviceRequired}</strong>{" "}
                    request would now be routed to the estimating desk for
                    follow-up via{" "}
                    <strong>
                      {submittedData.values.preferredContactMethod}
                    </strong>
                    .
                  </p>
                  <div className="p-6 rounded-2xl bg-white border border-stone space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">
                        Demonstration Reference:
                      </span>
                      <span className="font-bold text-copper">
                        {submittedData.referenceCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">
                        Requested Service Scope:
                      </span>
                      <span className="font-semibold text-obsidian">
                        {submittedData.values.serviceRequired}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">
                        Preferred Follow-Up:
                      </span>
                      <span className="font-semibold text-obsidian">
                        {submittedData.values.preferredContactMethod} (
                        {submittedData.values.phone})
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedData(null);
                      reset();
                    }}
                    className="px-6 py-3 rounded-full bg-obsidian text-ivory text-xs font-semibold tracking-wide cursor-pointer"
                  >
                    Submit Another Sample Request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-6"
                >
                  <div className="pb-5 border-b border-stone flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-obsidian">
                        Request Your Free Estimate
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                        Complimentary 45-point inspection &amp; itemized written
                        scope.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-obsidian text-ivory text-[11px] font-medium">
                      Zero Obligation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-obsidian mb-2"
                      >
                        Full Name <span className="text-copper">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Arthur Pendelton"
                        {...register("fullName")}
                        className="w-full h-12 px-4 rounded-xl bg-white border border-stone text-sm text-obsidian focus:outline-none focus:border-copper"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-obsidian mb-2"
                      >
                        Email Address <span className="text-copper">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@domain.com"
                        {...register("email")}
                        className="w-full h-12 px-4 rounded-xl bg-white border border-stone text-sm text-obsidian focus:outline-none focus:border-copper"
                      />
                      {errors.email && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-obsidian mb-2"
                      >
                        Phone Number <span className="text-copper">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(555) 234-5678"
                        {...register("phone")}
                        className="w-full h-12 px-4 rounded-xl bg-white border border-stone text-sm text-obsidian focus:outline-none focus:border-copper"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="propertyAddress"
                        className="block text-xs font-semibold text-obsidian mb-2"
                      >
                        Property Address{" "}
                        <span className="text-charcoal/50 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="propertyAddress"
                        type="text"
                        placeholder="Street address or neighborhood"
                        {...register("propertyAddress")}
                        className="w-full h-12 px-4 rounded-xl bg-white border border-stone text-sm text-obsidian focus:outline-none focus:border-copper"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="serviceRequired"
                        className="block text-xs font-semibold text-obsidian mb-2"
                      >
                        Service Required <span className="text-copper">*</span>
                      </label>
                      <select
                        id="serviceRequired"
                        {...register("serviceRequired")}
                        className="w-full h-12 px-4 rounded-xl bg-white border border-stone text-sm text-obsidian focus:outline-none focus:border-copper"
                      >
                        <option value="Roof Replacement">
                          Roof Replacement
                        </option>
                        <option value="Roof Repair">Roof Repair</option>
                        <option value="Roof Inspection">Roof Inspection</option>
                        <option value="Storm Damage">Storm Damage</option>
                        <option value="Gutter Installation">
                          Gutter Installation
                        </option>
                        <option value="Siding & Exterior">
                          Siding &amp; Exterior
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="preferredContactMethod"
                        className="block text-xs font-semibold text-obsidian mb-2"
                      >
                        Preferred Contact Method{" "}
                        <span className="text-copper">*</span>
                      </label>
                      <select
                        id="preferredContactMethod"
                        {...register("preferredContactMethod")}
                        className="w-full h-12 px-4 rounded-xl bg-white border border-stone text-sm text-obsidian focus:outline-none focus:border-copper"
                      >
                        <option value="Phone Call">Phone Call</option>
                        <option value="Email">Email</option>
                        <option value="Text Message">Text Message</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="block text-xs font-semibold text-obsidian mb-2"
                    >
                      Project Description <span className="text-copper">*</span>
                    </label>
                    <textarea
                      id="projectDescription"
                      rows={4}
                      placeholder="Tell us about your roof's approximate age, any active leaks or storm damage, or the architectural materials you are considering..."
                      {...register("projectDescription")}
                      className="w-full p-4 rounded-xl bg-white border border-stone text-sm text-obsidian focus:outline-none focus:border-copper"
                    />
                    {errors.projectDescription && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.projectDescription.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-charcoal/65 max-w-xs">
                      Interactive frontend demonstration state — ready to
                      connect to your CRM endpoint.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-beveled-primary inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-white font-semibold text-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Preparing Your Scope...
                        </span>
                      ) : (
                        <span>Submit Estimate Request ↗</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
