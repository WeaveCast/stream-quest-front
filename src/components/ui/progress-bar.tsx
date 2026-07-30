"use client";

import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, VariantProps } from "class-variance-authority";

const progressBarVariants = cva("block rounded-full overflow-hidden", {
  variants: {
    color: {
      gold: "bg-accent-gold/30",
      success: "bg-status-ok/30",
      danger: "bg-status-critical/30",
      ok: "bg-status-ok/30",
      hurt: "bg-status-hut/30",
      critical: "bg-status-critical/30",
      unconscious: "bg-status-unconscious/30",
    },
    size: {
      sm: "h-1.5 w-full",
      md: "h-2.5 w-full",
    },
  },
  defaultVariants: {
    color: "gold",
    size: "md",
  },
});

const indicatorColorMap = {
  gold: "bg-accent-gold",
  success: "bg-status-ok",
  danger: "bg-status-critical",
  ok: "bg-status-ok",
  hurt: "bg-status-hurt",
  critical: "bg-status-critical",
  unconscious: "bg-status-unconscious",
} as const;

export interface ProgressBarProps
  extends
    Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "color">,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  labels?: "none" | "floating" | "inline";
}

export function ProgressBar({
  className,
  color,
  size,
  value,
  max = 100,
  labels = "none",
  ...props
}: ProgressBarProps) {
  const percent = (value / max) * 100;

  return (
    <div className="w-full">
      {labels === "inline" && (
        <div className="flex justify-between text-body-sm text-text-secondary mb-xs">
          <span>0</span>
          <span>{max}</span>
        </div>
      )}

      <div className="relative w-full">
        <ProgressPrimitive.Root
          value={value}
          max={max}
          className={cn(progressBarVariants({ color, size, className }))}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full rounded-full transition-transform",
              indicatorColorMap[color ?? "gold"],
            )}
            style={{ transform: `translateX(-${100 - percent}%)` }}
          />
        </ProgressPrimitive.Root>

        {labels === "floating" && (
          <span
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-body-sm font-mono text-text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none z-10 whitespace-nowrap"
            style={{ left: `${percent}%` }}
          >
            {value}
          </span>
        )}

        {labels === "inline" && (
          <span
            className="absolute top-full mt-xs -translate-x-1/2 text-body-sm font-mono text-text-primary whitespace-nowrap"
            style={{ left: `${percent}%` }}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
}
