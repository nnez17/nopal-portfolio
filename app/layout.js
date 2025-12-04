import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

/** @type {import("next").Metadata} */
export const metadata = {
  title: "nnez17 | Portfolio",
  description: "Hi, I'm Noval, and here's my portfolio",
  icons: "https://avatars.githubusercontent.com/u/105137360?v=4"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
