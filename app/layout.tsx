import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./portfolio.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nikunj Borad — Senior Frontend Engineer",
  description:
    "Senior frontend engineer, 4+ years shipping production React and Next.js. Frontend architecture, SSR and Core Web Vitals. Open to remote, worldwide.",
  authors: {
    name: "Nikunj Borad",
    url: "https://nikunjborad.tech",
  },
  openGraph: {
    title: "Nikunj Borad — Senior Frontend Engineer",
    description:
      "Senior frontend engineer, 4+ years shipping production React and Next.js. Frontend architecture, SSR and Core Web Vitals. Open to remote, worldwide.",
    type: "website",
    url: "https://nikunjborad.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikunj Borad — Senior Frontend Engineer",
    description:
      "Senior frontend engineer, 4+ years shipping production React and Next.js. Frontend architecture, SSR and Core Web Vitals. Open to remote, worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
