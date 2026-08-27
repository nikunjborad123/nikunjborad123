import type { MetadataRoute } from "next";

/** Installability + correct icon/theme on Android and PWA-aware crawlers. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nikunj Borad — Senior Frontend Engineer",
    short_name: "Nikunj Borad",
    description:
      "Senior frontend engineer, 4+ years shipping production React and Next.js.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0f0e",
    theme_color: "#0d0f0e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
