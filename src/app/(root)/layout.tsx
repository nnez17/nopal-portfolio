import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const contactEmail = "contact@nnez.my.id";

export const metadata: Metadata = {
  title: "Noval | Portfolio",
  description: "Frontend developer crafting modern digital experiences.",
  icons: {
    icon: [{ url: "https://avatars.githubusercontent.com/u/105137360?v=4" }],
  },
  metadataBase: new URL("https://nnez.my.id"),
  openGraph: {
    emails: [contactEmail],
  },
  other: {
    contact: contactEmail,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Noval",
  email: "contact@nnez.my.id",
  url: "https://nnez.my.id",
  sameAs: [
    "https://github.com/nnez17",
    "https://youtube.com/@avalgaloz",
    "https://instagram.com/avalgaloz",
    "https://www.linkedin.com/in/noval-akbar-5342343a4/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Structured data is static and safe
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
