import React from 'react';
import { ArrowDown, Github, Youtube, Instagram, Music2, MapPin, Sparkles } from 'lucide-react';
import { profileData, socialLinks } from '../../data/mock';

const iconMap = {
  Github,
  Youtube,
  Instagram,
  Music2
};

const HeroSection = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
      {/* Animated Background Orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 acrylic rounded-full mb-8 animate-fade-in-up">
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm text-slate-300">Available for opportunities</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up stagger-1">
              <span className="text-white">Hi, I'm </span>
              <span className="text-gradient">{profileData.name}</span>
            </h1>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-medium text-slate-300 mb-6 animate-fade-in-up stagger-2">
              {profileData.title}
            </h2>

            {/* Bio */}
            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up stagger-3">
              {profileData.tagline}
            </p>

            {/* Location */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 mb-8 animate-fade-in-up stagger-4">
              <MapPin size={16} />
              <span>{profileData.location}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 animate-fade-in-up stagger-5">
              <button
                onClick={scrollToProjects}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                View My Work
                <ArrowDown size={18} />
              </button>
              <a
                href={socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 acrylic text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                GitHub Profile
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 animate-fade-in-up stagger-5">
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 acrylic-light rounded-xl text-slate-400 hover:text-white hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Content - Avatar Card */}
          <div className="flex-shrink-0 animate-fade-in-up stagger-3">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              
              {/* Main Card */}
              <div className="relative acrylic-strong rounded-3xl p-8 glow-blue">
                {/* Avatar */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse-glow" />
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-slate-800"
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">{profileData.name}</h3>
                  <p className="text-sm text-slate-400 mono">@{profileData.username}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-slate-700/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">3+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">5+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Skills</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
