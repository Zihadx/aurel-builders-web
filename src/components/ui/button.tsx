"use client";

import Link from "next/link";
import { cn, scrollToSection } from "@/lib/utils";

type Variant = "primary" | "outline" | "outline-deep" | "text";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  /** In-page hash (#contact), tel:, mailto: or URL. Omit for a <button>. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  size?: "md" | "lg";
}

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary: "bg-patina text-chalk hover:bg-patina-deep rounded-[2px]",
  outline: "border border-ink text-ink hover:bg-ink hover:text-chalk rounded-[2px]",
  "outline-deep":
    "border border-chalk/60 text-chalk hover:bg-chalk hover:text-deep rounded-[2px]",
  text: "text-patina underline decoration-1 underline-offset-4 hover:text-patina-deep",
};

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled,
  className,
  size = "md",
}: ButtonProps) {
  const cls = cn(base, variants[variant], variant !== "text" && sizes[size], className);

  if (href && href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    const isHash = href.startsWith("#");
    return (
      <a
        href={href}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cls}
        onClick={(e) => {
          onClick?.();
          if (isHash) {
            e.preventDefault();
            // wait a beat if the click also closes an overlay that locks scroll
            if (onClick) window.setTimeout(() => scrollToSection(href), 80);
            else scrollToSection(href);
          }
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
