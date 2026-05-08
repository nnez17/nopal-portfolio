import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import type { Certificate } from "@/data/certificates";

type CertificatesSectionProps = {
  certificates: Certificate[];
};

export default function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  return (
    <section id="certificates" className="relative overflow-hidden py-24">
      <div className="absolute left-0 top-1/3 h-[460px] w-[460px] rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full acrylic-light px-4 py-1.5 text-sm font-medium text-cyan-400">
            <Award size={16} />
            Certificates
          </span>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            My <span className="text-gradient">Certificates</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Sertifikat diambil langsung dari folder public agar mudah ditambah
            kapan saja.
          </p>
        </div>

        {certificates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                className="group rounded-2xl acrylic-strong p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-slate-700/40">
                  <Image
                    src={certificate.imageSrc}
                    alt={certificate.title}
                    width={1200}
                    height={675}
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <h3 className="mb-5 line-clamp-2 text-lg font-semibold text-white">
                  {certificate.title}
                </h3>

                <a
                  href={certificate.imageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full acrylic px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  Open Image <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-2xl acrylic-strong p-10 text-center text-slate-400">
            Belum ada sertifikat. Tambahkan file .webp ke folder
            public/sertifikat.
          </div>
        )}
      </div>
    </section>
  );
}
