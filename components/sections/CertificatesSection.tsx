"use client";

import { Award, ExternalLink, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import type { CertificateItem } from "@/app/api/certificates/route";
import AnimatedSection from "@/components/animations/AnimatedSection";

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data: CertificateItem[]) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="relative overflow-hidden py-24">
      <div className="absolute left-0 top-1/3 h-[460px] w-[460px] rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full acrylic-light px-4 py-1.5 text-sm font-medium text-accent-cyan">
              <Award size={16} />
              Certificates
            </span>
            <h2 className="mb-4 text-4xl font-bold text-theme-primary md:text-5xl">
              My <span className="text-gradient">Certificates</span>
            </h2>
            <p className="mx-auto max-w-2xl text-theme-tertiary">
              Sertifikat diambil langsung dari folder public agar mudah ditambah
              kapan saja.
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          </div>
        ) : certificates.length > 0 ? (
          <AnimatedSection
            animation="fadeUp"
            stagger={0.1}
            selector=".certificate-card"
          >
            <div className="certificate-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <article
                  key={cert.id}
                  className="certificate-card group rounded-2xl acrylic-strong p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40"
                >
                  <div
                    className="mb-5 flex items-center justify-center rounded-xl border py-12"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transition-transform duration-300 group-hover:scale-110">
                      <FileText size={40} className="text-accent-cyan" />
                    </div>
                  </div>

                  <h3 className="mb-5 line-clamp-2 text-lg font-semibold text-theme-primary min-h-[3.5rem]">
                    {cert.title}
                  </h3>

                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    View Certificate <ExternalLink size={14} />
                  </a>
                </article>
              ))}
            </div>
          </AnimatedSection>
        ) : (
          <div className="mx-auto max-w-lg rounded-2xl acrylic-strong p-10 text-center text-theme-tertiary">
            Belum ada sertifikat. Tambahkan file .pdf ke folder
            public/certificate.
          </div>
        )}
      </div>
    </section>
  );
}
