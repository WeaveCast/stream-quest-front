import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { HTMLAttributes } from "react";

const avatarVariants = cva(
  "flex items-center justify-center rounded-full border overflow-hidden shrink-0",
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
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  avatarName: string;
  avatarUrl?: string;
  initials?: string;
}

export function Avatar({
  className,
  status = "ok",
  size,
  avatarName,
  avatarUrl,
  initials,
  ...props
}: AvatarProps) {
  const hasAvatar = Boolean(avatarUrl);

  return (
    <div
      className={cn(avatarVariants({ className, status, size }), "relative")}
      {...props}
    >
      {hasAvatar && (
        <Image
          src={avatarUrl!}
          alt={avatarName}
          fill
          className="object-cover"
        />
      )}

      {!hasAvatar && (
        <span className="font-heading">
          {initials ?? avatarName.charAt(0) + avatarName.charAt(1)}
        </span>
      )}
    </div>
  );
}
