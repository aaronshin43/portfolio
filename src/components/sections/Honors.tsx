import { Star, Trophy } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { academicHonors, hackathonAwards } from "@/data/honors";

export function Honors() {
  return (
    <section className="border-t border-lavender-500/20 bg-background-alt py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Honors &amp; Awards"
          subtitle="Academic recognition and hackathon achievements."
        />

        <div className="grid gap-12 md:grid-cols-2">
          {/* Academic honors */}
          <ScrollReveal delay={0}>
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
                Academic Honors
              </h3>
              <ul className="space-y-4" role="list">
                {academicHonors.map((honor) => (
                  <li
                    key={honor.id}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border border-border bg-card p-4",
                      "transition-colors duration-200 hover:border-lavender-500/40"
                    )}
                  >
                    <Star
                      className="mt-0.5 h-4 w-4 shrink-0 text-lavender-400"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {honor.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{honor.period}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Hackathon awards */}
          <ScrollReveal delay={0.15}>
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
                Hackathon Awards
              </h3>
              <ul className="space-y-4" role="list">
                {hackathonAwards.map((award) => (
                  <li key={award.id}>
                    <a
                      href="#projects"
                      className={cn(
                        "flex items-start gap-3 rounded-xl border border-border bg-card p-4",
                        "transition-all duration-200 hover:border-lavender-500/40 hover:shadow-[0_0_16px_rgba(124,90,224,0.12)]",
                        "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
                      )}
                      aria-label={`${award.award} at ${award.hackathon} — view project`}
                    >
                      <Trophy
                        className="mt-0.5 h-4 w-4 shrink-0 text-lavender-400"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {award.award}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {award.hackathon} &middot; {award.date}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
