"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D4B] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-full",
  {
    variants: {
      variant: {
        copper:
          "bg-[#C87D4B] text-white hover:bg-[#E29B6A] shadow-[0_16px_36px_-8px_rgba(200,125,75,0.5)]",
        obsidian:
          "bg-[#0A0D12] text-[#F4F1EA] hover:bg-[#131820] border border-[#131820]",
        ivory:
          "bg-[#F4F1EA] text-[#0A0D12] hover:bg-white shadow-sm",
        glass:
          "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/35",
        outlineDark:
          "bg-transparent text-[#0A0D12] border border-[#0A0D12]/25 hover:border-[#0A0D12] hover:bg-[#0A0D12]/5",
        outlineLight:
          "bg-transparent text-[#F4F1EA] border border-[#F4F1EA]/25 hover:border-[#C87D4B] hover:text-[#C87D4B]",
      },
      size: {
        sm: "h-10 px-5 text-xs",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-sm md:text-base",
      },
    },
    defaultVariants: {
      variant: "copper",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  showArrow?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, showArrow = false, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2, scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        <span>{children}</span>
        {showArrow && (
          <span className="inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
