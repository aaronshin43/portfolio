import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted",
        "transition-colors duration-200",
        "focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-500/20",
        className
      )}
      {...props}
    />
  );
}
