import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { research } from "@/data/research";

export function Research() {
  const allTags = Array.from(
    new Set(research.items.flatMap((item) => item.tags))
  );

  return (
    <section className="border-t border-lavender-500/20 bg-background-alt py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Research"
          subtitle="Investigating how small Transformers learn to generalize."
        />

        {/* Position card */}
        <ScrollReveal delay={0}>
          <div className="mb-10 rounded-xl border border-border border-l-4 border-l-lavender-400 bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {research.role}
                  </h3>
                  <Badge>Current</Badge>
                </div>
                <p className="text-sm text-muted">
                  {research.institution} &mdash; {research.location}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-lavender-500/20 bg-lavender-500/10 px-3 py-1 text-xs font-medium text-lavender-300">
                {research.period}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Research item cards */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {research.items.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <article className="flex h-full flex-col rounded-xl border border-border border-l-4 border-l-lavender-400/60 bg-card p-6 transition-all duration-300 hover:border-lavender-500/50 hover:shadow-[0_0_20px_rgba(124,90,224,0.15)]">
                <h3 className="mb-3 text-base font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Research tags">
                  {item.tags.map((tag) => (
                    <Badge key={tag} role="listitem">{tag}</Badge>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Tag cloud */}
        <ScrollReveal delay={0.3}>
          <div className="mb-10 rounded-xl border border-border bg-card p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Keywords
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Research keywords"
            >
              {allTags.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted transition-colors duration-200 hover:border-lavender-400/50 hover:text-lavender-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <p className="text-center text-sm text-muted">
            Interested in research collaboration?{" "}
            <a
              href="#contact"
              className="rounded-sm font-medium text-lavender-400 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
            >
              Let&apos;s talk
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
