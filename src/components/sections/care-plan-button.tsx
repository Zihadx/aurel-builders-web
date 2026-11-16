"use client";

import { Button } from "@/components/ui/button";
import { useEstimate } from "@/lib/estimate-context";

/** Sends the chosen plan into the booking form as a note. */
export function CarePlanButton({ planName, featured }: { planName: string; featured?: boolean }) {
  const { setService, setScope } = useEstimate();
  return (
    <Button
      href="/book"
      size="lg"
      variant={featured ? "primary" : "outline"}
      className="w-full"
      onClick={() => {
        setService("Roof Inspection");
        setScope(`I'm interested in the AUREL Care "${planName}" plan. Please include it in my inspection visit.`);
      }}
    >
      Choose {planName}
    </Button>
  );
}
