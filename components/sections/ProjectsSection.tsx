"use client";

import { ExternalLink, Github } from "lucide-react";
import type { PortfolioRepo } from "@/lib/github";
import SectionReveal from "@/components/animations/SectionReveal";

type Props = {
  repos: PortfolioRepo[];
  githubUsername: string;
};

export default function ProjectsSection({ repos, githubUsername }: Props) {
  return (
    <section id="projects" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-20">
            <span className="mb-4 block text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
              Projects
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl">
              Featured <span className="text-gradient">Work</span>
            </h2>
          </div>
        </SectionReveal>

        {repos.length > 0 && (
          <div className="space-y-16">
            {repos.map((project, idx) => (
              <SectionReveal key={project.id} delay={idx * 0.1}>
                <div className="group relative border-t border-[var(--color-border)] pt-8">
                  <div className="grid gap-6 md:grid-cols-3 md:gap-12">
                    <div className="md:col-span-1">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent-blue)]">
                        {project.name}
                      </h3>
                    </div>
                    <div className="md:col-span-2">
                      <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]">
                        {project.description}
                      </p>
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          href={project.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-foreground)]"
                        >
                          <Github size={16} />
                          Source
                        </a>
                        {project.homepage && (
                          <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-foreground)]"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        )}

        {repos.length === 0 && (
          <SectionReveal>
            <div className="border-t border-[var(--color-border)] pt-16 text-center">
              <p className="text-[var(--color-text-muted)]">
                Could not load repositories right now.
              </p>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-accent-blue)] hover:underline"
              >
                <Github size={16} />
                Visit GitHub Profile
              </a>
            </div>
          </SectionReveal>
        )}

        <SectionReveal delay={0.3}>
          <div className="mt-20 text-center">
            <a
              href={`https://github.com/${githubUsername}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]"
            >
              View All Projects
              <ExternalLink
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
