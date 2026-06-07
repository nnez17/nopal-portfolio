const titleMap: Record<string, string> = {
  BelajarDasarAI: "Belajar Dasar AI",
  BelajarDasarJS: "Belajar Dasar Pemrograman JavaScript",
  "BelajarFE-Web": "Belajar Membuat Front-End Web untuk Pemula",
  BelajarReactWeb: "Belajar Membuat Aplikasi Web dengan React",
  "BelajarBE-WithJS": "Belajar Back-End Pemula dengan JavaScript",
  BelajarDasarCloud: "Belajar Dasar Cloud dan Gen AI di AWS",
  DasarPemrograman:
    "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
  DasarPemrogramanWeb: "Belajar Dasar Pemrograman Web",
  IntroductionFinancialLiteracy: "Introduction to Financial Literacy",
  PengenalanLogic: "Pengenalan Logika",
  "[Coding Camp 2026] Certificate - CFS251D6Y311": "Coding Camp 2026",
  EnglishCodingCamp: "English Coding Camp",
};

export function getCertificateTitle(filename: string): string | null {
  const key = filename.replace(/\.pdf$/i, "");
  return titleMap[key] ?? key;
}
