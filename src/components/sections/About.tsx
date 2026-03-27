import Image from "next/image";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="The intersection of code, math, and curiosity."
        />

        <div className="md:grid md:grid-cols-2 md:gap-12">
          {/* Left: bio + resume */}
          <ScrollReveal delay={0}>
            <div className="flex flex-col gap-6 text-base leading-relaxed text-muted">
              <p>
                I&apos;m Aaron Shin (신정철), a Computer Science and Mathematics
                student at Dickinson College. I&apos;m drawn to the place where
                rigorous theory meets working systems — which for me means
                building AI-powered tools by day and reading about Transformer
                internals by night.
              </p>
              <p>
                Before college I completed mandatory service in the Republic of
                Korea Army as an IT Specialist, maintaining Linux-based tactical
                systems for a 3,000-person brigade. That experience taught me
                how much real infrastructure depends on people who care about
                the details — a lesson I carry into every project.
              </p>
              <p>
                At hackathons I get to move fast and be creative: my teams have
                won awards at PennApps, Technica, NexHacks, and DevFest by
                combining computer vision, generative AI, and a healthy
                disregard for &quot;that&apos;s probably too ambitious.&quot;
              </p>
              <p>
                Outside of code I&apos;m proud of my Korean heritage and serve
                as Vice President of the Korean Student Association at
                Dickinson. Long-term, I&apos;m looking toward graduate research
                in machine learning — ideally somewhere that lets me keep
                breaking things on purpose.
              </p>

              <div className="pt-2">
                <a
                  href="/Resume_Jeongcheol_Shin.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-lavender-500 px-5 py-2.5 text-sm font-semibold text-lavender-400 transition-all duration-200 hover:bg-lavender-500/10 focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2"
                >
                  Download Resume
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: profile photo */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex justify-center md:mt-0">
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-lavender-500/30">
                {/* Decorative corner accents */}
                <span
                  className="absolute left-3 top-3 z-10 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-lavender-400"
                  aria-hidden="true"
                />
                <span
                  className="absolute right-3 bottom-3 z-10 h-6 w-6 rounded-br-lg border-r-2 border-b-2 border-lavender-400"
                  aria-hidden="true"
                />
                <Image
                  src="/images/profile.jpg"
                  alt="Aaron Shin"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 320px, 80vw"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
