"use client";

import Image from "next/image";
import {
  ArrowDown,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  Sparkles,
  Youtube,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profileData, socialLinks, techStack } from "@/data/mock";
import type { SocialIconName } from "@/data/mock";

const iconMap: Record<SocialIconName, typeof Github> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

type HeroSectionProps = {
  projectCount: number;
};

export default function HeroSection({ projectCount }: HeroSectionProps) {
  const skillCount = techStack.length;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.3,
        },
      );
      gsap.fromTo(
        ".hero-card",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="gradient-bg relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="hero-reveal mb-8 inline-flex items-center gap-2 rounded-full acrylic px-4 py-2">
              <Sparkles size={16} className="text-accent-cyan" />
              <span className="text-sm text-theme-tertiary">
                Available for opportunities
              </span>
            </div>

            <h1 className="hero-reveal mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              <span className="text-theme-primary">Hi, I'm </span>
              <span className="text-gradient">{profileData.name}</span>
            </h1>

            <h2 className="hero-reveal mb-6 text-2xl font-medium text-theme-secondary md:text-3xl">
              {profileData.title}
            </h2>

            <p className="hero-reveal mx-auto mb-8 max-w-xl text-lg leading-relaxed text-theme-tertiary lg:mx-0">
              {profileData.tagline}
            </p>

            <div className="hero-reveal mb-8 flex items-center justify-center gap-2 text-theme-muted lg:justify-start">
              <MapPin size={16} />
              <span>{profileData.location}</span>
            </div>

            <div className="hero-reveal mb-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="flex items-center gap-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 px-8 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
              >
                View My Work
                <ArrowDown size={18} />
              </button>
              <a
                href={profileData.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full acrylic px-8 py-3.5 font-medium text-theme-primary transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                GitHub Profile
              </a>
            </div>

            <div className="hero-social flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl acrylic-light p-3 text-theme-tertiary transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500/20 hover:text-white"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hero-card shrink-0 perspective-[1000px]">
            <div className="relative">
              <div className="animate-pulse absolute inset-0 rounded-3xl bg-linear-to-r from-blue-500 to-cyan-500 blur-2xl opacity-30" />
              <div className="relative rounded-3xl acrylic-strong p-8 glow-blue">
                <div className="relative mx-auto mb-6 h-48 w-48 md:h-64 md:w-64">
                  <div className="animate-pulse-glow absolute inset-0 rounded-full bg-linear-to-br from-blue-500 to-cyan-500" />
                  <Image
                    src={profileData.avatar}
                    alt={profileData.name}
                    width={256}
                    height={256}
                    className="relative h-full w-full rounded-full border-4 object-cover"
                    style={{ borderColor: "var(--color-border)" }}
                    priority
                  />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-semibold text-theme-primary">
                    {profileData.name}
                  </h3>
                  <p className="mono text-sm text-theme-tertiary">
                    @{profileData.username}
                  </p>
                </div>

                <div
                  className="mt-6 flex items-center justify-center gap-8 border-t pt-6"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">
                      {Math.max(projectCount, 0)}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-theme-muted">
                      Repos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">
                      {skillCount}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-theme-muted">
                      Skills
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-bounce absolute bottom-10 left-1/2 -translate-x-1/2">
        <div
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 p-2"
          style={{ borderColor: "var(--color-text-muted)" }}
        >
          <div className="h-3 w-1.5 animate-pulse rounded-full bg-blue-500" />
        </div>
      </div>
    </section>
  );
}
