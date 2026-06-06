"use client";

import { useState, useCallback } from "react";
import IntroAnimation from "@/components/animations/IntroAnimation";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import type { PortfolioRepo } from "@/lib/github";

type Props = {
  repos: PortfolioRepo[];
  githubUsername: string;
};

export default function PageContent({ repos, githubUsername }: Props) {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <>
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}
      <div
        className={`min-h-screen bg-[var(--color-bg-primary)] ${introDone ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection repos={repos} githubUsername={githubUsername} />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
