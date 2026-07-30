import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";
import { Heading, HeadingProps, Text, TextProps } from "./typography";

const cardVariants = cva("block rounded-lg bg-bg-surface border p-lg", {
  variants: {
    elevation: {
      default: "border-border-default",
      hover: "border-accent-gold shadow-gold-glow",
    },
  },
  defaultVariants: {
    elevation: "default",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ elevation, className }))}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export function CardTitle({
  className,
  as = "h3",
  size = "h4",
  ...props
}: HeadingProps) {
  return (
    <Heading
      as={as}
      size={size}
      className={cn("mb-sm", className)}
      {...props}
    />
  );
}

export function CardBody({
  className,
  as = "div",
  size = "label",
  ...props
}: TextProps) {
  return <Text as={as} size={size} className={className} {...props} />;
}
