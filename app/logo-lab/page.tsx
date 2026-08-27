import type { Metadata } from "next";
import BrandMark, { type BrandMarkVariant } from "@/components/portfolio/brand-mark";
import "../portfolio.css";

/**
 * Internal brand-mark scratchpad. It ships (it is useful to have deployed) but
 * it is not content: noindex/nofollow here, Disallow in robots.ts, and absent
 * from the sitemap, so it can never dilute the site's SEO signals.
 */
export const metadata: Metadata = {
  title: "Brand mark lab",
  robots: { index: false, follow: false, nocache: true },
};

const variants: { id: BrandMarkVariant; note: string }[] = [
  { id: "orbit", note: "N monogram, dashed ring, orbiting satellite" },
  { id: "pulse", note: "Latency bars — nods to the performance work" },
  { id: "draw", note: "NB monogram that redraws itself, ink + lime" },
  { id: "matrix", note: "Dot grid tracing an N, one node at a time" },
];

export default function LogoLab() {
  return (
    <main className="portfolio" style={{ minHeight: "100vh", padding: "64px 32px" }}>
      <h1
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: 40,
          opacity: 0.6,
        }}
      >
        Brand mark lab — hover each row
      </h1>

      <div style={{ display: "grid", gap: 24, maxWidth: 620 }}>
        {variants.map((v) => (
          <a
            key={v.id}
            href="#"
            className="site-header__brand"
            style={{
              display: "flex",
              gap: 16,
              padding: "20px 24px",
              border: "1px solid rgba(237,231,220,0.12)",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <BrandMark variant={v.id} />
            <span style={{ display: "grid", gap: 4 }}>
              <span className="site-header__wordmark">Nikunj&nbsp;Borad</span>
              <span style={{ fontSize: 13, opacity: 0.55 }}>
                {v.id} — {v.note}
              </span>
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
