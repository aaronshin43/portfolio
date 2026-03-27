import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
}

export function Badge({ children, className, role }: BadgeProps) {
  return (
    <span
      role={role}
      className={cn(
        "inline-flex items-center rounded-full border border-lavender-500/30 bg-lavender-500/10 px-2.5 py-0.5 text-xs font-medium text-lavender-300",
        className
      )}
    >
      {children}
    </span>
  );
}
