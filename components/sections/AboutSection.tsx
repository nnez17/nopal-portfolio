"use client";

import { BookOpen, Code2, Coffee, Palette } from "lucide-react";
import { profileData, techStack } from "@/data/mock";
import SectionReveal from "@/components/animations/SectionReveal";

const highlights = [
  {
    icon: Code2,
    title: "Development",
    description: "Passionate about building clean, efficient code",
  },
  {
    icon: Palette,
    title: "Creative",
    description: "Love combining art and technology",
  },
  {
    icon: BookOpen,
    title: "Learning",
    description: "Always eager to learn new things",
  },
  {
    icon: Coffee,
    title: "Dedicated",
    description: "Improving myself every day",
  },
] as const;

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

      <SectionReveal className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="mb-4 text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
            About
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[var(--color-foreground)] md:text-5xl">
            Get to Know <span className="text-gradient">Me Better</span>
          </h2>
          <p className="max-w-2xl text-[var(--color-text-secondary)]">
            A passionate student exploring the intersection of creativity and
            technology
          </p>
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          <SectionReveal animation="fadeLeft" delay={0.1}>
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-[var(--color-foreground)]">
                My Story
              </h3>
              <div className="space-y-5 leading-relaxed text-[var(--color-text-secondary)]">
                <p className="text-lg">
                  I&apos;m a frontend developer who loves turning ideas into
                  clean, functional interfaces. Every project is a chance to
                  refine my craft and build something that feels right.
                </p>
                <p>
                  I work with HTML, CSS, Tailwind, JavaScript, TypeScript,
                  React, Next.js, Svelte, Node, and Bun — focusing on smooth
                  interfaces and tooling that stays fun to iterate on.
                </p>
                <p>
                  I also contribute to{" "}
                  <a
                    href="https://github.com/tiga-searah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent-blue)] underline underline-offset-2 transition-colors hover:text-[var(--color-accent-cyan)]"
                  >
                    tiga-searah
                  </a>
                  , a GitHub organization where we explore and build open-source
                  projects together.
                </p>
              </div>

              <div className="relative mt-10 border-l-2 border-[var(--color-accent-blue)] pl-6">
                <p className="text-lg italic text-[var(--color-text-secondary)]">
                  {"“Let's keep growing and creating together.”"}
                </p>
                <span className="mt-2 block text-sm text-[var(--color-text-muted)]">
                  — {profileData.name}
                </span>
              </div>
            </div>
          </SectionReveal>

          <div className="space-y-12">
            <SectionReveal animation="fadeRight" delay={0.2}>
              <div>
                <h3 className="mb-6 text-xl font-semibold text-[var(--color-foreground)]">
                  Highlights
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  {highlights.map((item) => (
                    <div key={item.title} className="group">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center">
                        <item.icon className="h-5 w-5 text-[var(--color-accent-cyan)]" />
                      </div>
                      <h4 className="mb-1 font-semibold text-[var(--color-foreground)]">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
