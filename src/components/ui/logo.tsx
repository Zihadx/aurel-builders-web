import { cn } from "@/lib/utils";

/** AUREL mark: a pitched roofline over a single baseline. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M3 21L16 8L29 21" />
      <path d="M3 27H29" />
    </svg>
  );
}
