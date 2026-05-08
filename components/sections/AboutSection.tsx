"use client";

import Image from "next/image";
import { BookOpen, Code2, Coffee, Palette } from "lucide-react";
import { profileData, techStack } from "@/data/mock";

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

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="about-header mb-16 text-center">
          <span className="mb-4 inline-block rounded-full acrylic-light px-4 py-1.5 text-sm font-medium text-cyan-400">
            About Me
          </span>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Get to Know <span className="text-gradient">Me Better</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            A passionate student exploring the intersection of creativity and
            technology
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="about-pane relative">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 blur-xl" />
            <div className="relative rounded-3xl acrylic-strong p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-semibold text-white">
                My Story
              </h3>
              <div className="space-y-4 leading-relaxed text-slate-300">
                <p>{profileData.bio}</p>
                <p>
                  I work with HTML, CSS, Tailwind, JavaScript, TypeScript,
                  React, Next.js, Svelte, Node, Bun, and C# — focusing on smooth
                  interfaces and tooling that stays fun to iterate on.
                </p>
                <p>
                  I believe inspiration can come from anywhere, even from the
                  quietest places and the simplest moments.
                </p>
              </div>

              <div className="acrylic mt-8 rounded-2xl border-l-4 border-blue-500 p-6">
                <p className="italic text-slate-300">
                  "Let's keep growing and creating together."
                </p>
                <span className="mt-2 block text-sm text-slate-500">
                  — {profileData.name}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="about-highlight group rounded-2xl acrylic p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="mb-1 font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="about-pane rounded-2xl acrylic p-6">
              <h4 className="mb-5 text-lg font-semibold text-white">
                Tech Skills
              </h4>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {techStack.map((tech) => (
                  <li
                    key={tech.name}
                    className="about-tech-chip acrylic-light hover:bg-blue-500/15 flex cursor-default flex-col items-center gap-2 rounded-xl border border-slate-700/40 p-3 text-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Image
                      src={tech.logoSrc}
                      alt={tech.alt}
                      width={36}
                      height={36}
                      className={`h-9 w-9 object-contain ${
                        tech.name === "Next.js"
                          ? "invert"
                          : tech.name === "Bun"
                            ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
                            : ""
                      }`}
                    />
                    <span className="text-xs font-medium text-slate-200">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
