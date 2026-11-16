"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/data/site";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Replace with your error reporting (Sentry, etc.). Never log form data.
    console.error("[app error]", error.digest ?? error.message);
  }, [error]);

  return (
    <main id="main" className="wrap grid min-h-[70vh] content-center py-24">
      <p className="t-label text-alert">Something went wrong</p>
      <h1 className="t-h2 mt-3 max-w-[20ch]">We hit a snag loading this page.</h1>
      <p className="t-body mt-4 text-lead">It’s on our side. Try again, or reach us directly and we’ll sort it out.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset} size="lg">Try again</Button>
        <Button href={SITE_CONFIG.contact.phoneHref} variant="outline" size="lg">Call {SITE_CONFIG.contact.phoneDisplay}</Button>
      </div>
    </main>
  );
}
