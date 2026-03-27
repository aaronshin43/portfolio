import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills"
          subtitle="Languages, frameworks, and tools I work with regularly."
        />

        <div className="space-y-10">
          {skills.map((group, index) => (
            <ScrollReveal key={group.category} delay={index * 0.08}>
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.category} skills`}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      role="listitem"
                      className={cn(
                        "rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground",
                        "transition-colors duration-200",
                        "hover:border-lavender-400/50 hover:text-lavender-400"
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
