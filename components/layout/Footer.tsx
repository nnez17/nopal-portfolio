import { Github, Heart, Instagram, Music2, Youtube } from "lucide-react";
import { profileData, socialLinks } from "@/data/mock";
import type { SocialIconName } from "@/data/mock";

const iconMap: Record<SocialIconName, typeof Github> = {
  Github,
  Youtube,
  Instagram,
  Music2,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
                N
              </div>
              <span className="font-semibold text-white">
                {profileData.name}
              </span>
            </div>
            <p className="text-sm text-slate-500">
              © {currentYear} {profileData.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg acrylic-light p-2.5 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-blue-500/20 hover:text-white"
                  aria-label={social.name}
                >
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Made with</span>
            <Heart
              size={14}
              className="animate-pulse fill-red-500 text-red-500"
            />
            <span>in Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
