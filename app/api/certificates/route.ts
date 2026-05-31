import { readdirSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getCertificateTitle } from "@/data/certificate-titles";

export type CertificateItem = {
  id: string;
  title: string;
  pdfUrl: string;
};

export async function GET() {
  try {
    const dir = join(process.cwd(), "public", "certificate");
    const files = readdirSync(dir);
    const certificates: CertificateItem[] = [];

    for (const f of files) {
      if (!f.endsWith(".pdf")) continue;
      const title = getCertificateTitle(f);
      if (title === null) continue;
      certificates.push({
        id: f.replace(/\.pdf$/i, ""),
        title,
        pdfUrl: `/certificate/${encodeURIComponent(f)}`,
      });
    }

    return NextResponse.json(certificates);
  } catch {
    return NextResponse.json([]);
  }
}
