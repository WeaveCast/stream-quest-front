import { type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-body font-semibold rounded-md transition-colors disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent-gold text-bg-base hover:bg-accent-gold/85",
        secondary:
          "bg-transparent text-text-primary border border-border-default hover:border-accent-gold",
        danger: "bg-danger-base text-text-primary hover:bg-danger-emphasis",
        ghost: "bg-transparent text-text-secondary hover:text-text-primary",
      },
      size: {
        small: "text-body-sm px-md py-xs",
        medium: "text-body px-lg py-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
