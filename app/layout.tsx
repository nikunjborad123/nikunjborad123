import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import LenisProvider from "@/components/portfolio/lenis-provider";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./portfolio.css";

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

/*
 * Font budget. Only faces that the stylesheet actually references are
 * requested — every extra weight/style is a separate woff2 over the wire.
 *   - sans:  400/500/600, upright only (no 700 and no italic in portfolio.css)
 *   - serif: 400 upright + italic (every <em> on the page resolves to serif)
 *   - mono:  400/500, and not preloaded — it never paints above the fold
 */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-mono",
});

const TITLE = SITE_TITLE;
const DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = {
  // metadataBase turns every relative URL below (and the file-convention OG
  // image) into an absolute one — crawlers and social scrapers reject relative.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Nikunj Borad",
  },
  description: DESCRIPTION,
  applicationName: "Nikunj Borad",
  authors: [{ name: "Nikunj Borad", url: SITE_URL }],
  creator: "Nikunj Borad",
  publisher: "Nikunj Borad",
  keywords: [
    "Nikunj Borad",
    "senior frontend engineer",
    "React developer",
    "Next.js developer",
    "TypeScript engineer",
    "frontend architecture",
    "Core Web Vitals",
    "remote frontend engineer",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "profile",
    url: SITE_URL,
    siteName: "Nikunj Borad",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  category: "technology",
};

/**
 * Next 14 wants viewport/theme-color split out of `metadata`. themeColor also
 * paints the browser chrome before first paint, so the page never flashes white
 * against its own near-black background.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0f0e",
  colorScheme: "dark",
};

/**
 * Person schema. This is what earns the knowledge-panel style treatment for a
 * name query and is the one structured-data type that genuinely applies to a
 * personal portfolio — no fabricated ratings or job postings.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikunj Borad",
  url: SITE_URL,
  image: `${SITE_URL}/icon-512.png`,
  jobTitle: "Senior Frontend Engineer",
  description: DESCRIPTION,
  email: "mailto:boradnikunj2001@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/nikunjborad123",
    "https://linkedin.com/in/nikunj-borad-7027b4180",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend architecture",
    "Server-side rendering",
    "Core Web Vitals",
    "Node.js",
    "PostgreSQL",
  ],
  knowsLanguage: ["English", "Hindi", "Gujarati"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
        {/*
          Rendered by the server into static HTML, so crawlers see it without
          executing anything. type="application/ld+json" is inert to the parser.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
