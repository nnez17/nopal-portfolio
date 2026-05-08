"use client";

import {
  CheckCircle,
  Github,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Music2,
  Send,
  Youtube,
} from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useState } from "react";
import type { SocialIconName } from "@/data/mock";
import { profileData, socialLinks } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const iconMap: Record<SocialIconName, typeof Github> = {
  Github,
  Youtube,
  Instagram,
  Music2,
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(data.error || "Something went wrong.");
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        window.setTimeout(() => setIsSubmitted(false), 4000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Submit failed.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData],
  );

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full acrylic-light px-4 py-1.5 text-sm font-medium text-cyan-400">
            Contact
          </span>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Questions or collaborations? Messages are forwarded to{" "}
            {profileData.email}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-3xl acrylic-strong p-8">
              <h3 className="mb-6 text-2xl font-semibold text-white">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-white">{profileData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="text-white">{profileData.location}</p>
                  </div>
                </div>
              </div>

              <div className="my-8 h-px bg-slate-700/50" />

              <div>
                <h4 className="mb-4 text-lg font-medium text-white">
                  Follow Me
                </h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon];
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl acrylic p-3 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-blue-500/20 hover:text-white"
                        aria-label={social.name}
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-2xl acrylic border-l-4 border-cyan-500 p-6">
              <p className="italic text-slate-300">
                "I'm always open to learning from others, collaborating on small
                but inspiring projects, and sharing ideas that combine both
                creativity and technology."
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-xl" />
            <div className="relative rounded-3xl acrylic-strong p-8">
              <h3 className="mb-6 text-2xl font-semibold text-white">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
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
                    className="w-full border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus-visible:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
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
                    className="w-full border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus-visible:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
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
                    className="w-full resize-none border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus-visible:ring-blue-500/20"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3.5 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-slate-500">
                Delivery uses your SMTP account (recommended: Gmail app
                password). No database — messages send straight as email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
