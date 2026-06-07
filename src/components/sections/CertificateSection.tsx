"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import SectionReveal from "@/components/animations/SectionReveal";

type CertificateItem = {
  id: string;
  title: string;
  pdfUrl: string;
};

export default function CertificateSection() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certificates")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: CertificateItem[]) => {
        setCertificates(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="certificates" className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-border) border-t-blue-500" />
          </div>
        </div>
      </section>
    );
  }

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs tracking-widest uppercase text-(--color-text-muted)">
              Certificates
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-(--color-foreground) sm:text-5xl">
              My <span className="text-gradient">Achievements</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {certificates.map((cert, i) => (
            <SectionReveal key={cert.id} animation="fadeUp" delay={0.04 * i}>
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-(--color-border) px-5 py-2.5 text-sm text-(--color-text-secondary) transition-all duration-300 hover:border-blue-500/40 hover:text-(--color-foreground) hover:shadow-sm hover:shadow-blue-500/10"
              >
                <span className="size-1.5 rounded-full bg-blue-500/60 transition-colors group-hover:bg-blue-500" />
                <span>{cert.title}</span>
                <ExternalLink
                  size={12}
                  className="shrink-0 text-(--color-text-muted) transition-colors group-hover:text-blue-400"
                />
              </a>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
