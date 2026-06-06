"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Mail,
  Send,
  CheckCircle,
  Loader2,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
} from "lucide-react";
import { profileData, socialLinks } from "@/data/mock";
import type { SocialIconName } from "@/data/mock";
import SectionReveal from "@/components/animations/SectionReveal";

const iconMap: Record<SocialIconName, typeof Github> = {
  Github,
  Linkedin,
  Youtube,
  Instagram,
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSubmitError("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
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
      setSubmitError(err instanceof Error ? err.message : "Failed to send.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-16">
            <span className="mb-4 text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
              Contact
            </span>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-[var(--color-foreground)] md:text-5xl">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
            <p className="max-w-2xl text-[var(--color-text-secondary)]">
              Questions or collaborations? Reach out to{" "}
              <a
                href={`mailto:${profileData.email}`}
                className="border-b border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-accent-blue)]"
              >
                {profileData.email}
              </a>
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-16 lg:grid-cols-2">
          <SectionReveal animation="fadeLeft" delay={0.1}>
            <div>
              <h3 className="mb-8 text-xl font-semibold text-[var(--color-foreground)]">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <Mail className="h-5 w-5 text-[var(--color-accent-cyan)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Email
                    </p>
                    <p className="text-[var(--color-foreground)]">
                      {profileData.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <MapPin className="h-5 w-5 text-[var(--color-accent-cyan)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Location
                    </p>
                    <p className="text-[var(--color-foreground)]">
                      {profileData.location}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-8 border-[var(--color-border)]" />

              <div>
                <h4 className="mb-4 text-lg font-medium text-[var(--color-foreground)]">
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
                        className="rounded-xl border border-[var(--color-border)] p-3 text-[var(--color-text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)]"
                        aria-label={social.name}
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative mt-10 border-l-2 border-[var(--color-accent-cyan)] pl-6">
              <p className="italic text-[var(--color-text-secondary)]">
                {
                  "“I'm always open to learning from others, collaborating on small but inspiring projects, and sharing ideas that combine both creativity and technology.”"
                }
              </p>
            </div>
          </SectionReveal>

          <SectionReveal animation="fadeRight" delay={0.2}>
            <div>
              <h3 className="mb-8 text-xl font-semibold text-[var(--color-foreground)]">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full border-b border-[var(--color-border)] rounded-xl bg-transparent px-0 py-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-accent-blue)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full border-b border-[var(--color-border)] rounded-xl bg-transparent px-0 py-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-accent-blue)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project or just say hi..."
                    className="w-full resize-none border-b border-[var(--color-border)] rounded-xl bg-transparent px-0 py-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-accent-blue)]"
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-400">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3.5 text-sm font-medium text-[var(--color-foreground)] transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4" /> Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
