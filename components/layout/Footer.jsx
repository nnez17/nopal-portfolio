import React from 'react';
import { Github, Youtube, Instagram, Music2, Heart } from 'lucide-react';
import { socialLinks, profileData } from '../../data/mock';

const iconMap = {
  Github,
  Youtube,
  Instagram,
  Music2
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-white">
                N
              </div>
              <span className="font-semibold text-white">{profileData.name}</span>
            </div>
            <p className="text-sm text-slate-500">
              © {currentYear} {profileData.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 acrylic-light rounded-lg text-slate-400 hover:text-white hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>in Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
