"use client";

import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "flex items-center justify-center rounded-full border overflow-hidden shrink-0 font-heading relative",
  {
    variants: {
      status: {
        ok: "border-status-ok",
        hurt: "border-status-hurt",
        critical: "border-status-critical",
        unconscious: "border-status-unconscious",
      },
      size: {
        xsm: "size-6 text-body-sm",
        sm: "size-8 text-body-sm",
        md: "size-10 text-body",
        lg: "size-12 text-body-lg",
      },
    },
  },
);

export interface AvatarProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof avatarVariants> {
  avatarName: string;
  avatarUrl?: string | null;
  initials?: string;
}

export function Avatar({
  className,
  status,
  size,
  avatarName,
  avatarUrl,
  initials,
  ...props
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasAvatar = Boolean(avatarUrl) && !imageFailed;

  return (
    <div className={cn(avatarVariants({ className, status, size }))} {...props}>
      {hasAvatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl!}
          alt={avatarName}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      )}
      {!hasAvatar && (
        <span>{initials ?? avatarName.charAt(0) + avatarName.charAt(1)}</span>
      )}
    </div>
  );
}
