import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="Hackathon builds and side projects — moving fast and winning things."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ScrollReveal key={project.id}>
              <article
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card",
                  "transition-all duration-300",
                  "hover:-translate-y-1 hover:border-lavender-500/50 hover:shadow-[0_0_24px_rgba(124,90,224,0.18)]"
                )}
              >
                {/* Image / placeholder */}
                <div className="relative h-44 w-full overflow-hidden bg-background">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-lavender-500/10 to-background">
                      <span className="text-lg font-semibold text-muted">
                        {project.title}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay for readability */}
                  <div
                    className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <Badge>{project.award}</Badge>
                  </div>

                  <p className="mb-1 text-xs text-muted">
                    {project.hackathon} &middot; {project.date}
                  </p>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted",
                        "transition-colors duration-200 hover:border-lavender-400/50 hover:text-lavender-400",
                        "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
                      )}
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      GitHub
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border border-lavender-500/40 px-3 py-1.5 text-xs font-medium text-lavender-400",
                          "transition-colors duration-200 hover:bg-lavender-500/10",
                          "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
                        )}
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
