"use client";

import { ExternalLink, Folder, Github } from "lucide-react";
import type { PortfolioRepo } from "@/lib/github";
import AnimatedSection from "@/components/animations/AnimatedSection";

export type ProjectsSectionProps = {
  repos: PortfolioRepo[];
  githubUsername: string;
};

export default function ProjectsSection({
  repos,
  githubUsername,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="project-grid-header mb-16 text-center">
            <span className="mb-4 inline-block rounded-full acrylic-light px-4 py-1.5 text-sm font-medium text-accent-cyan">
              GitHub
            </span>
            <h2 className="mb-4 text-4xl font-bold text-theme-primary md:text-5xl">
              Latest <span className="text-gradient">Repos</span>
            </h2>
            <p className="mx-auto max-w-2xl text-theme-tertiary">
              Live snapshot from @{githubUsername}: public repos (no forks),
              sorted by recent activity
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeUp"
          stagger={0.12}
          selector=".project-card-animate"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((project) => {
              const displayTags =
                project.tags.length > 0 ? project.tags.slice(0, 6) : ["GitHub"];
              return (
                <div key={project.id} className="group relative">
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  <article className="project-card-animate relative flex h-full flex-col rounded-2xl acrylic-strong p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-blue-500/40">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20">
                        <Folder className="h-6 w-6 text-accent-cyan" />
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-theme-tertiary transition-colors hover:bg-white/5 hover:text-white"
                          aria-label="GitHub repo"
                        >
                          <Github size={18} />
                        </a>
                        {project.homepage &&
                          /^https?:\/\//.test(project.homepage) && (
                            <a
                              href={project.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg p-2 text-theme-tertiary transition-colors hover:bg-white/5 hover:text-white"
                              aria-label="Live site"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                      </div>
                    </div>

                    <h3 className="mb-3 grow-0 text-xl font-semibold text-theme-primary transition-colors group-hover:text-cyan-300">
                      {project.name}
                    </h3>
                    <p className="mb-6 grow text-sm leading-relaxed text-theme-tertiary">
                      {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {displayTags.map((tag) => (
                        <span
                          key={`${project.id}-${tag}`}
                          className="rounded-full acrylic-light px-3 py-1 text-xs font-medium text-accent-cyan"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {(project.stars > 0 || project.forks > 0) && (
                      <div
                        className="mt-4 flex gap-4 border-t pt-3 text-xs text-theme-muted"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        {project.stars > 0 && <span>★ {project.stars}</span>}
                        {project.forks > 0 && (
                          <span>Forks {project.forks}</span>
                        )}
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {repos.length === 0 && (
          <div className="mx-auto mt-10 max-w-lg rounded-2xl acrylic-strong p-10 text-center text-theme-tertiary">
            <p className="mb-6">
              Repositories couldn&apos;t be loaded right now (GitHub rate
              limit), or there&apos;s nothing public yet.
            </p>
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full acrylic px-6 py-3 font-medium text-theme-primary transition-colors hover:bg-white/10"
            >
              <Github size={18} /> Open @{githubUsername} on GitHub
            </a>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href={`https://github.com/${githubUsername}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full acrylic px-8 py-3.5 font-medium text-theme-primary transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            <Github size={20} />
            View All on GitHub
            <ExternalLink
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
