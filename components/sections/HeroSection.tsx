"use client";

import Image from "next/image";
import {
  ArrowDown,
  Github,
  Instagram,
  MapPin,
  Music2,
  Sparkles,
  Youtube,
} from "lucide-react";
import { profileData, socialLinks, techStack } from "@/data/mock";
import type { SocialIconName } from "@/data/mock";

const iconMap: Record<SocialIconName, typeof Github> = {
  Github,
  Youtube,
  Instagram,
  Music2,
};

type HeroSectionProps = {
  projectCount: number;
};

export default function HeroSection({ projectCount }: HeroSectionProps) {
  const skillCount = techStack.length;

  return (
    <section
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
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm text-slate-300">
                Available for opportunities
              </span>
            </div>

            <h1 className="hero-reveal mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              <span className="text-white">Hi, I'm </span>
              <span className="text-gradient">{profileData.name}</span>
            </h1>

            <h2 className="hero-reveal mb-6 text-2xl font-medium text-slate-300 md:text-3xl">
              {profileData.title}
            </h2>

            <p className="hero-reveal mx-auto mb-8 max-w-xl text-lg leading-relaxed text-slate-400 lg:mx-0">
              {profileData.tagline}
            </p>

            <div className="hero-reveal mb-8 flex items-center justify-center gap-2 text-slate-500 lg:justify-start">
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
                className="rounded-full acrylic px-8 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
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
                    className="rounded-xl acrylic-light p-3 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500/20 hover:text-white"
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
                    className="relative h-full w-full rounded-full border-4 border-slate-800 object-cover"
                    priority
                  />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-semibold text-white">
                    {profileData.name}
                  </h3>
                  <p className="mono text-sm text-slate-400">
                    @{profileData.username}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8 border-t border-slate-700/50 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">
                      {Math.max(projectCount, 0)}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      Repos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">
                      {skillCount}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
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
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-600 p-2">
          <div className="h-3 w-1.5 animate-pulse rounded-full bg-blue-500" />
        </div>
      </div>
    </section>
  );
}
