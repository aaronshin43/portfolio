import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <div className="inline-block pb-3">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {/* Lavender underline accent — explicit element for reliable Tailwind v4 rendering */}
        <span
          className="mt-2 block h-0.75 w-full rounded-full bg-lavender-400"
          aria-hidden="true"
        />
      </div>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
