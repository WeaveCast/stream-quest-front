import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { createElement, forwardRef, type HTMLAttributes } from "react";

const headingVariants = cva("text-text-primary", {
  variants: {
    size: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
    },
  },
  defaultVariants: {
    size: "h3",
  },
});

export interface HeadingProps
  extends
    HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as = "h2", ...props }, ref) => {
    return createElement(as, {
      ref,
      className: cn(headingVariants({ size, className })),
      ...props,
    });
  },
);

Heading.displayName = "Heading";

const textVariants = cva("", {
  variants: {
    size: {
      body: "text-body",
      "body-sm": "text-body-sm",
      "body-lg": "text-body-lg",
      label: "text-label",
      mono: "text-mono",
    },
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
    },
  },
  defaultVariants: {
    size: "body",
    color: "secondary",
  },
});

export interface TextProps
  extends
    Omit<HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, color, as = "p", ...props }, ref) => {
    return createElement(as, {
      ref,
      className: cn(textVariants({ size, color, className })),
      ...props,
    });
  },
);

Text.displayName = "Text";
