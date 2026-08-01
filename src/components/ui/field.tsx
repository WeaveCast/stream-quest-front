import { Text } from "./typography";
import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-xs w-full", className)}>
      <Text as="label" size="label" color="secondary">
        {label}
      </Text>
      {children}
    </div>
  );
}
