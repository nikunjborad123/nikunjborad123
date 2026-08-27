import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Generated at build time, so `lastModified` tracks the deploy instead of the
 * hardcoded 2024 date the old static sitemap.xml carried. Only indexable
 * routes belong here — /logo-lab is deliberately absent.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
