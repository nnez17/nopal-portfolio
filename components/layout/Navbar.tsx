"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks, profileData } from "@/data/mock";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.fromTo(
      el,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? "acrylic-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => scrollToSection("#home")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110">
            N
          </div>
          <span className="hidden text-lg font-semibold sm:block" style={{ color: "var(--color-foreground)" }}>
            {profileData.username}
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-white"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {link.name}
              <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-3/5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 md:block"
          >
            Get in Touch
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 md:hidden"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 md:hidden acrylic-strong ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-6 py-4">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="group relative block w-full rounded-lg px-4 py-3 text-left transition-all duration-300 hover:text-white"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {link.name}
              <span className="absolute bottom-2 left-4 h-[2px] w-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="mt-4 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
}
