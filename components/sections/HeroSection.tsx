"use client";

import {
  ArrowDown,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { profileData, socialLinks } from "@/data/mock";
import type { SocialIconName } from "@/data/mock";

const iconMap: Record<SocialIconName, typeof Github> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const uid = useId();

  const nameChars = [...profileData.name].map((char, i) => ({
    char,
    id: `${uid}-nc-${i}`,
  }));
  const titleWords = profileData.title.split(" ").map((word, i) => ({
    word,
    id: `${uid}-tw-${i}`,
  }));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const chars = el.querySelectorAll<HTMLElement>(".hero-char");
    const words = el.querySelectorAll<HTMLElement>(".hero-word");
    const fadeEls = el.querySelectorAll<HTMLElement>(".hero-fade");
    const ctaEls = el.querySelectorAll<HTMLElement>(".hero-cta");
    const avatarEl = el.querySelector<HTMLElement>(".hero-avatar");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.03,
        },
        3.4,
      )
        .fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .fromTo(
          fadeEls,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
          "-=0.3",
        )
        .fromTo(
          avatarEl,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ctaEls,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.2",
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

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-4 overflow-hidden text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="sr-only">{profileData.name}</span>
              <span aria-hidden="true">
                {nameChars.map(({ char, id }) => (
                  <span
                    key={id}
                    className="hero-char inline-block text-[var(--color-foreground)]"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>

            <h2 className="mb-4 overflow-hidden">
              <span className="sr-only">{profileData.title}</span>
              <span aria-hidden="true">
                {titleWords.map(({ word, id }, idx) => (
                  <span
                    key={id}
                    className="hero-word inline-block bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] bg-clip-text text-xl font-medium text-transparent sm:text-2xl md:text-3xl"
                  >
                    {word}
                    {idx < titleWords.length - 1 ? "\u00A0" : ""}
                  </span>
                ))}
              </span>
            </h2>

            <div className="hero-fade mb-4 flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)] lg:justify-start">
              <MapPin size={14} />
              <span>{profileData.location}</span>
            </div>

            <p className="hero-fade mx-auto mb-8 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:mx-0">
              {profileData.tagline}
            </p>

            <div className="hero-cta mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
              >
                View My Work
                <ArrowDown size={18} />
              </button>
              <a
                href={profileData.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full acrylic px-8 py-3.5 text-sm text-[var(--color-foreground)] transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                GitHub Profile
              </a>
            </div>

            <div className="hero-cta flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl acrylic-light p-3 text-[var(--color-text-tertiary)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500/20 hover:text-white"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hero-avatar shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl opacity-30" />
              <div className="relative rounded-full border-4 border-[var(--color-border)] glow-blue">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  width={240}
                  height={240}
                  className="h-48 w-48 rounded-full object-cover md:h-60 md:w-60"
                  priority
                  style={{ height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[var(--color-border)] p-1.5">
          <div className="h-2 w-1 animate-pulse rounded-full bg-[var(--color-text-muted)]" />
        </div>
      </div>
    </section>
  );
}
