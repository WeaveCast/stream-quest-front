import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const statusDotVariants = cva("inline-block rounded-full size-2", {
  variants: {
    color: {
      ok: "bg-status-ok",
      hurt: "bg-status-hurt",
      critical: "bg-status-critical",
      unconscious: "bg-status-unconscious",
      inspired: "bg-status-inspired",
      poisoned: "bg-status-poisoned",
      asleep: "bg-status-asleep",
    },
  },
  defaultVariants: {
    color: "ok",
  },
});

export interface StatusDotProps
  extends
    Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof statusDotVariants> {}

export function StatusDot({ className, color, ...props }: StatusDotProps) {
  return (
    <span className={cn(statusDotVariants({ color, className }))} {...props} />
  );
}
