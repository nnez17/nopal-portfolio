import React, { useState } from 'react';
import { Send, Mail, MapPin, Github, Youtube, Instagram, Music2, CheckCircle, Loader2 } from 'lucide-react';
import { profileData, socialLinks } from '../../data/mock';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const iconMap = {
  Github,
  Youtube,
  Instagram,
  Music2
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission - data saved to localStorage for demo
    setTimeout(() => {
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 acrylic-light rounded-full text-sm text-cyan-400 font-medium mb-4">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            {/* Info Card */}
            <div className="acrylic-strong rounded-3xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-white">{profileData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="text-white">{profileData.location}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-700/50 my-8" />

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon];
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 acrylic rounded-xl text-slate-400 hover:text-white hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
                        aria-label={social.name}
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="acrylic rounded-2xl p-6 border-l-4 border-cyan-500">
              <p className="text-slate-300 italic">
                "I'm always open to learning from others, collaborating on small but inspiring projects, 
                and sharing ideas that combine both creativity and technology."
              </p>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
            <div className="relative acrylic-strong rounded-3xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or just say hi..."
                    className="w-full bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 text-white placeholder:text-slate-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-slate-500 text-center mt-4">
                * This form is currently in demo mode. Messages are saved locally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
