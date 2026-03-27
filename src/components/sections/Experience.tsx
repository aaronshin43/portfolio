import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { experience, leadership, training } from "@/data/experience";
import type { ExperienceItem, TrainingItem } from "@/data/types";

function TimelineEntry({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="relative pl-8">
        {/* Timeline dot */}
        <span
          className="absolute left-0 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-lavender-400 bg-background"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lavender-400" />
        </span>

        <div
          className={cn(
            "rounded-xl border border-border bg-card p-5",
            "transition-all duration-300 hover:border-lavender-500/40"
          )}
        >
          <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">
              {item.role}
            </h3>
            <span className="shrink-0 rounded-full border border-lavender-500/20 bg-lavender-500/10 px-2.5 py-0.5 text-xs font-medium text-lavender-300">
              {item.period}
            </span>
          </div>
          <p className="mb-3 text-sm text-muted">
            {item.organization}
            {item.location ? ` — ${item.location}` : ""}
          </p>

          {item.bullets.length > 0 && (
            <ul className="mb-3 space-y-1.5 text-sm text-muted" role="list">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lavender-400" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

function TrainingEntry({ item, index }: { item: TrainingItem; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className={cn(
          "rounded-xl border border-border bg-card p-5",
          "transition-all duration-300 hover:border-lavender-500/40"
        )}
      >
        <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
          <span className="shrink-0 rounded-full border border-lavender-500/20 bg-lavender-500/10 px-2.5 py-0.5 text-xs font-medium text-lavender-300">
            {item.period}
          </span>
        </div>
        <p className="text-sm text-muted">{item.description}</p>
      </div>
    </ScrollReveal>
  );
}

export function Experience() {
  return (
    <section className="border-t border-lavender-500/20 bg-background-alt py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="Work, leadership, and structured training."
        />

        {/* Work experience timeline */}
        <div className="mb-16">
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted">
            Work Experience
          </h2>
          <div className="relative border-l-2 border-lavender-500/30 pl-4 space-y-6">
            {experience.map((item, index) => (
              <TimelineEntry key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Leadership & Training */}
        <div>
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted">
            Leadership &amp; Training
          </h2>

          {/* Leadership entries as smaller timeline cards */}
          {leadership.length > 0 && (
            <div className="relative mb-8 border-l-2 border-lavender-500/30 pl-4 space-y-6">
              {leadership.map((item, index) => (
                <TimelineEntry key={item.id} item={item} index={index} />
              ))}
            </div>
          )}

          {/* Training entries */}
          {training.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {training.map((item, index) => (
                <TrainingEntry key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
