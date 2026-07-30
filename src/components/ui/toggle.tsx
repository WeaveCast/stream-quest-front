"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group relative inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-bg-surface border border-border-default transition-colors",
        "data-[state=checked]:bg-accent-gold data-[state=checked]:border-accent-gold",
        "disabled:opacity-40 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block size-3.5 rounded-full bg-text-secondary transition-transform duration-300 ease-out translate-x-0.5",
          "group-data-[state=checked]:translate-x-4 group-data-[state=checked]:bg-bg-base",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
