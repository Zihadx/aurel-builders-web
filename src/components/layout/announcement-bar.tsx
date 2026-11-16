"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import Link from "next/link";

export function AnnouncementBar() {
  const { announcement } = SITE_CONFIG;
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <section aria-label="Announcement" className="on-deep bg-deep text-chalk">
      <div className="wrap flex items-center justify-between gap-4 py-2.5 t-meta">
        <p className="min-w-0 text-chalk/90">
          {announcement.text}{" "}
          <Link
            href={announcement.ctaHref}
            className="whitespace-nowrap font-medium text-patina-hi underline underline-offset-4 hover:text-chalk"
          >
            {announcement.ctaLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="-mr-2 grid h-8 w-8 shrink-0 cursor-pointer place-items-center text-mist hover:text-chalk"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
