import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const iconButtonVariants = cva(
  "inline-flex rounded-sm items-center justify-center size-8 transition-colors disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        ghost: "bg-transparent hover:bg-bg-surface active:bg-bg-surface/70",
        filled: "bg-bg-surface hover:bg-bg-surface/70 active:bg-bg-surface/50",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  },
);

export interface IconButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {}

export function IconButton({
  className,
  variant,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(iconButtonVariants({ className, variant }))}
      {...props}
    >
      {children}
    </button>
  );
}
