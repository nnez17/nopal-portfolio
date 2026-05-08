import AboutSection from "@/components/sections/AboutSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HeroSection from "@/components/sections/HeroSection";
import { certificates } from "@/data/certificates";
import { profileData } from "@/data/mock";
import { fetchPublicRepos } from "@/lib/github";

export default async function Home() {
  const repos = await fetchPublicRepos(profileData.username);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050a14] text-white">
      <Navbar />
      <main>
        <HeroSection projectCount={repos.length} />
        <AboutSection />
        <ProjectsSection repos={repos} githubUsername={profileData.username} />
        <CertificatesSection certificates={certificates} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
