"use client";

import { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { techStack } from "@/data/mock";
import SectionReveal from "@/components/animations/SectionReveal";

export default function SkillsSection() {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    const m1 = marquee1Ref.current;
    const m2 = marquee2Ref.current;
    if (!m1 || !m2) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(m1, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
      gsap.fromTo(
        m2,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 30,
          ease: "none",
          repeat: -1,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    ...techStack.map((tech, i) => ({ ...tech, key: `${uid}-a-${i}` })),
    ...techStack.map((tech, i) => ({ ...tech, key: `${uid}-b-${i}` })),
  ];

  return (
    <section id="skills" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-6">
        <SectionReveal>
          <div className="mx-auto max-w-3xl">
            <span className="mb-4 block text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
              Skills
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl">
              Technologies I <span className="text-gradient">Use</span>
            </h2>
          </div>
        </SectionReveal>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--color-background)] to-transparent" />

        <div className="space-y-8 overflow-hidden">
          <div ref={marquee1Ref} className="flex w-max gap-8 px-4">
            {marqueeItems.map((tech) => (
              <div
                key={tech.key}
                className="flex shrink-0 items-center gap-3 rounded-full border border-[var(--color-border)] px-6 py-3"
              >
                <img
                  src={tech.logoSrc}
                  alt={tech.alt}
                  width={24}
                  height={24}
                  className="size-6 shrink-0 object-contain"
                />
                <span className="whitespace-nowrap text-sm text-[var(--color-text-secondary)]">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          <div ref={marquee2Ref} className="flex w-max gap-8 px-4">
            {marqueeItems.map((tech) => (
              <div
                key={`${tech.key}-row2`}
                className="flex shrink-0 items-center gap-3 rounded-full border border-[var(--color-border)] px-6 py-3"
              >
                <img
                  src={tech.logoSrc}
                  alt={tech.alt}
                  width={24}
                  height={24}
                  className="size-6 shrink-0 object-contain"
                />
                <span className="whitespace-nowrap text-sm text-[var(--color-text-secondary)]">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
