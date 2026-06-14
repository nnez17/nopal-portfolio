"use client";

import { useState, useCallback, useEffect } from "react";
import IntroAnimation from "@/components/animations/IntroAnimation";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificateSection from "@/components/sections/CertificateSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WakaTimeSection from "@/components/sections/WakaTimeSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import type { PortfolioRepo } from "@/lib/github";

type Props = {
  repos: PortfolioRepo[];
  githubUsername: string;
};

export default function PageContent({ repos, githubUsername }: Props) {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <>
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}
      <div
        className={`min-h-screen bg(--color-bg-primary) ${introDone ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <CertificateSection />
          <ProjectsSection repos={repos} githubUsername={githubUsername} />
          <WakaTimeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
