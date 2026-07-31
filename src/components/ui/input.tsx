import { type InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  showIcon?: boolean;
}

export function Input({ className, showIcon = true, ...props }: InputProps) {
  return (
    <div className="relative inline-flex items-center w-full">
      {showIcon && (
        <Search
          size={16}
          className="absolute left-md text-text-secondary pointer-events-none"
        />
      )}
      <input
        className={cn(
          "w-full rounded-md border border-border-default bg-bg-surface text-body text-text-muted placeholder:text-text-muted py-sm transition-colors",
          "focus:outline-none focus:border-accent-gold focus:text-text-primary",
          "disabled:opacity-40 disabled:pointer-events-none",
          showIcon ? "pl-2xl pr-md" : "px-md",
          className,
        )}
        {...props}
      />
    </div>
  );
}
