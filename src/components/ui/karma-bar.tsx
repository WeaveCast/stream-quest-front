"use client";

import { useAnimatedNumber } from "@/hooks/use-animated-number";
import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, VariantProps } from "class-variance-authority";

const karmaBarTrackVariants = cva("block overflow-hidden", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface KarmaBarProps extends VariantProps<
  typeof karmaBarTrackVariants
> {
  karmaValue: number;
  chaosThreshold: number;
  blessingThreshold: number;
  labels?: "none" | "floating" | "inline";
  className?: string;
}

export function KarmaBar({
  className,
  size,
  karmaValue,
  chaosThreshold,
  blessingThreshold,
  labels = "none",
}: KarmaBarProps) {
  const safeKarmaValue = Number.isFinite(karmaValue) ? karmaValue : 0;
  const animatedKarmaValue = useAnimatedNumber(safeKarmaValue, 2000);

  const isPositive = animatedKarmaValue >= 0;
  const chaosValue = !isPositive
    ? Math.min(Math.abs(animatedKarmaValue), chaosThreshold)
    : 0;
  const blessingValue = isPositive
    ? Math.min(animatedKarmaValue, blessingThreshold)
    : 0;

  const overallPercent = isPositive
    ? 50 + (blessingValue / blessingThreshold) * 50
    : 50 - (chaosValue / chaosThreshold) * 50;

  return (
    <div className={cn("w-full", className)}>
      {(labels === "inline" || labels === "floating") && (
        <div className="flex justify-between text-body-sm text-text-secondary mb-xs">
          <span>Chaos {-chaosThreshold}</span>
          <span>{blessingThreshold} Blessing</span>
        </div>
      )}

      <div className="relative w-full">
        <div className="flex w-full">
          <ProgressPrimitive.Root
            value={chaosValue}
            max={chaosThreshold}
            className={cn(
              karmaBarTrackVariants({ size }),
              "flex-1 rounded-l-full bg-status-critical/30",
            )}
          >
            <ProgressPrimitive.Indicator
              className="h-full rounded-l-full bg-status-critical"
              style={{
                transform: `translateX(${100 - (chaosValue / chaosThreshold) * 100}%)`,
              }}
            />
          </ProgressPrimitive.Root>

          <div className="w-px bg-border-default shrink-0" />

          <ProgressPrimitive.Root
            value={blessingValue}
            max={blessingThreshold}
            className={cn(
              karmaBarTrackVariants({ size }),
              "flex-1 rounded-r-full bg-accent-gold/30",
            )}
          >
            <ProgressPrimitive.Indicator
              className="h-full rounded-r-full bg-accent-gold"
              style={{
                transform: `translateX(-${100 - (blessingValue / blessingThreshold) * 100}%)`,
              }}
            />
          </ProgressPrimitive.Root>
        </div>

        {labels === "floating" && (
          <span
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-body-sm font-mono text-text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none z-10 whitespace-nowrap"
            style={{ left: `${overallPercent}%` }}
          >
            {animatedKarmaValue}
          </span>
        )}

        {labels === "inline" && (
          <span
            className="absolute top-full mt-xs -translate-x-1/2 text-body-sm font-mono text-text-primary whitespace-nowrap"
            style={{ left: `${overallPercent}%` }}
          >
            {animatedKarmaValue}
          </span>
        )}
      </div>
    </div>
  );
}
