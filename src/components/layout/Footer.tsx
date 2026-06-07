import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { profileData, socialLinks } from "@/data/mock";
import type { SocialIconName } from "@/data/mock";

const iconMap: Record<SocialIconName, typeof Github> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p className="text-sm text-[var(--color-text-muted)]">
          &copy; {year} {profileData.name}.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => {
            const IconComponent = iconMap[social.icon];
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-foreground)]"
                aria-label={social.name}
              >
                <IconComponent size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
