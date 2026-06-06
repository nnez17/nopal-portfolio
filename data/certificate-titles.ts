const titleMap: Record<string, string> = {
  BelajarDasarAI: "Belajar Dasar AI",
  BelajarDasarJS: "Belajar Dasar JavaScript",
  "BelajarFE-Web": "Belajar Front-End Web",
  BelajarReactWeb: "Belajar React Web",
  "BelajarBE-WithJS": "Belajar Back-End dengan JavaScript",
  BelajarDasarCloud: "Belajar Dasar Cloud",
  DasarPemrograman: "Dasar Pemrograman",
  DasarPemrogramanWeb: "Dasar Pemrograman Web",
  IntroductionFinancialLiteracy: "Introduction to Financial Literacy",
  PengenalanLogic: "Pengenalan Logika",
  "[Coding Camp 2026] Certificate - CFS251D6Y311": "Coding Camp 2026",
};

/** Files to exclude (e.g. graduation letters, duplicates) */
const excludeFiles = new Set([
  "[Coding Camp 2026] Graduation Letter - CFS251D6Y311.pdf",
]);

export function getCertificateTitle(filename: string): string | null {
  if (excludeFiles.has(filename)) return null;

  const key = filename.replace(/\.pdf$/i, "");
  return titleMap[key] ?? key;
}
