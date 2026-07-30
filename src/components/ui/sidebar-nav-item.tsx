"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const sidebarNavItemVariants = cva(
  "flex items-center gap-sm rounded-md px-lg py-sm text-body transition-colors",
  {
    variants: {
      active: {
        true: "bg-accent-gold/15 text-accent-gold",
        false:
          "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export interface SidebarNavItemProps
  extends
    React.ComponentProps<typeof Link>,
    VariantProps<typeof sidebarNavItemVariants> {
  href: string;
  icon?: React.ReactNode;
}

export function SidebarNavItem({
  className,
  href,
  children,
  icon,
  ...props
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(sidebarNavItemVariants({ className, active }))}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );
}
