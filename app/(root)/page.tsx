import AboutSection from "@/components/sections/AboutSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HeroSection from "@/components/sections/HeroSection";
import WakatimeSection from "@/components/sections/WakatimeSection";
import { profileData } from "@/data/mock";
import { fetchPublicRepos } from "@/lib/github";
import { fetchWakatimeStats } from "@/lib/wakatime";

export default async function Home() {
  const [repos, wakatime] = await Promise.all([
    fetchPublicRepos(profileData.username),
    fetchWakatimeStats(),
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--color-bg-primary)", color: "var(--color-foreground)" }}>
      <Navbar />
      <main>
        <HeroSection projectCount={repos.length} />
        <AboutSection />
        <ProjectsSection
          repos={repos.slice(0, 3)}
          githubUsername={profileData.username}
        />
        <CertificatesSection />
        <WakatimeSection stats={wakatime} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
