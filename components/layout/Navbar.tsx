"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks, profileData } from "@/data/mock";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 3.2 },
    );
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
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
          onClick={() => scrollTo("#home")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-base font-bold text-white transition-transform duration-300 group-hover:scale-110">
            N
          </div>
          <span className="hidden text-lg font-semibold sm:block text-[var(--color-foreground)]">
            {profileData.username}
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:text-[var(--color-foreground)]"
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
            onClick={() => scrollTo("#contact")}
            className="hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 md:block"
          >
            Get in Touch
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-[var(--color-text-secondary)] md:hidden"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 md:hidden acrylic-strong ${
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-6 py-4">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="group relative block w-full rounded-lg px-4 py-3 text-left text-sm text-[var(--color-text-secondary)] transition-all duration-300 hover:text-[var(--color-foreground)]"
            >
              {link.name}
              <span className="absolute bottom-2 left-4 h-[2px] w-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="mt-4 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
}
