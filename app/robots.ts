import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * File-convention robots (Next generates /robots.txt at build time, so this
 * still works under `output: export`). Kept in TS so the origin can never
 * drift from the one in layout.tsx the way a hand-edited robots.txt does.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal design scratchpad — not content, must not be indexed.
      disallow: ["/logo-lab"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
