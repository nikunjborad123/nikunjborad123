/**
 * Single source of truth for the deployed origin.
 *
 * It is imported by layout.tsx (canonical + OG + JSON-LD), robots.ts and
 * sitemap.ts. Keeping one constant is the point: when these drift apart, the
 * canonical URL, the sitemap entry and the OG URL start naming different hosts,
 * and search engines split ranking signals between them instead of pooling.
 *
 * This must match whatever host actually serves the site (the CNAME file for
 * GitHub Pages, or the primary domain configured in Vercel).
 */
export const SITE_URL = "https://nikunjborad123.vercel.app";

export const SITE_NAME = "Nikunj Borad";
export const SITE_TITLE = "Nikunj Borad — Senior Frontend Engineer";
export const SITE_DESCRIPTION =
  "Senior frontend engineer, 4+ years shipping production React and Next.js. Frontend architecture, SSR and Core Web Vitals. Open to remote, worldwide.";
