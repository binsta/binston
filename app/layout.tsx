import type { Metadata } from "next";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import "./globals.css";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Binston Cardoza — Protocol Engineer",
    template: "%s | Binston Cardoza",
  },
  description:
    "Protocol engineer working on Rust-based ZK cryptography, EVM bytecode analysis, and smart contract security.",
  metadataBase: new URL("https://binston.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://binston.in",
    siteName: "Binston Cardoza",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    types: { "application/rss+xml": "https://binston.in/rss.xml" },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sourceSerif4.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg text-text antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:no-underline"
          >
            Skip to content
          </a>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
