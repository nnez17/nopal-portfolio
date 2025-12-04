import React from 'react';
import { Code2, Palette, BookOpen, Coffee } from 'lucide-react';
import { profileData, techStack } from '../../data/mock';

const AboutSection = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Development',
      description: 'Passionate about building clean, efficient code'
    },
    {
      icon: Palette,
      title: 'Creative',
      description: 'Love combining art and technology'
    },
    {
      icon: BookOpen,
      title: 'Learning',
      description: 'Always eager to learn new things'
    },
    {
      icon: Coffee,
      title: 'Dedicated',
      description: 'Improving myself every day'
    }
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 acrylic-light rounded-full text-sm text-cyan-400 font-medium mb-4">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get to Know <span className="text-gradient">Me Better</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A passionate student exploring the intersection of creativity and technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Bio Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
            <div className="relative acrylic-strong rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-semibold text-white mb-6">My Story</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  {profileData.bio}
                </p>
                <p>
                  I'm currently learning HTML, CSS, and JavaScript, focusing on front-end development 
                  and how to make web designs more interactive and meaningful.
                </p>
                <p>
                  I believe inspiration can come from anywhere, even from the quietest places 
                  and the simplest moments.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 acrylic rounded-2xl border-l-4 border-blue-500">
                <p className="text-slate-300 italic">
                  "Let's keep growing and creating together."
                </p>
                <span className="text-sm text-slate-500 mt-2 block">- {profileData.name}</span>
              </div>
            </div>
          </div>

          {/* Right - Highlights & Skills */}
          <div className="space-y-8">
            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="acrylic p-6 rounded-2xl group hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="acrylic rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 acrylic-light rounded-full text-sm text-slate-300 hover:text-white hover:bg-blue-500/20 transition-all duration-300 cursor-default"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
