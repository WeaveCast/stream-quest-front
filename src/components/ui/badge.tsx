// src/components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { StatusDot } from "./status-dot";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-body font-semibold whitespace-nowrap",
  {
    variants: {
      color: {
        neutral: "bg-bg-surface text-text-secondary",
        gold: "bg-accent-gold/15 text-accent-gold",
        success: "bg-status-ok/15 text-status-ok",
        danger: "bg-danger-emphasis/15 text-danger-emphasis",
        warning: "bg-status-hurt/15 text-status-hurt",
        ok: "bg-status-ok/15 text-status-ok",
        hurt: "bg-status-hurt/15 text-status-hurt",
        critical: "bg-status-critical/15 text-status-critical",
        unconscious: "bg-status-unconscious/15 text-status-unconscious",
      },
      size: {
        small: "text-body-sm px-sm py-2xs",
        medium: "text-label px-md py-xs",
      },
    },
    defaultVariants: {
      color: "neutral",
      size: "medium",
    },
  },
);

export interface BadgeProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {
  statusDot?:
    | "ok"
    | "hurt"
    | "critical"
    | "unconscious"
    | "inspired"
    | "poisoned"
    | "asleep";
}

export function Badge({
  className,
  color,
  size,
  statusDot,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ color, size, className }))} {...props}>
      {statusDot && <StatusDot color={statusDot} className="mr-xs" />}
      {children}
    </div>
  );
}
