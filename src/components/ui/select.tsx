"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group flex w-full items-center justify-between rounded-md border border-border-default bg-bg-surface px-md py-sm text-body text-text-muted transition-colors",
        "data-[state=open]:border-accent-gold data-[state=open]:text-text-primary",
        "disabled:opacity-40 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          size={16}
          className="text-text-muted group-data-[state=open]:text-accent-gold transition-colors"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={cn(
          "z-50 overflow-hidden rounded-md border border-border-default bg-bg-surface shadow-elevation-md",
          position === "popper" && "w-[var(--radix-select-trigger-width)]",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-xs">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex items-center rounded-sm py-xs pl-2xl pr-md text-body text-text-primary cursor-pointer select-none",
        "data-[highlighted]:bg-accent-gold/15 data-[highlighted]:outline-none",
        className,
      )}
      {...props}
    >
      <span className="absolute left-sm flex items-center">
        <SelectPrimitive.ItemIndicator>
          <Check size={14} className="text-accent-gold" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
