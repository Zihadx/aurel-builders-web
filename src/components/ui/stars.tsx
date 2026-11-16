import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Five-star row. The visible stars are decorative; the label carries the meaning. */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-[#e0a526]", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-4 w-4" aria-hidden="true" fill={i <= Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </span>
  );
}
