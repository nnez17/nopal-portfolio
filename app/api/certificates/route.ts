import { readdirSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export type CertificateItem = {
  id: string;
  title: string;
  pdfUrl: string;
};

export async function GET() {
  try {
    const dir = join(process.cwd(), "public", "certificate");
    const files = readdirSync(dir);
    const certificates: CertificateItem[] = files
      .filter((f) => f.endsWith(".pdf"))
      .map((f) => ({
        id: f.replace(/\.pdf$/i, ""),
        title: f.replace(/\.pdf$/i, ""),
        pdfUrl: `/certificate/${encodeURIComponent(f)}`,
      }));
    return NextResponse.json(certificates);
  } catch {
    return NextResponse.json([]);
  }
}
