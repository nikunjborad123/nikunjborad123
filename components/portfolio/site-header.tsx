import { contactData } from "@/lib/data";
import BrandMark, { type BrandMarkVariant } from "./brand-mark";

/** Swap this to preview a different mark: "orbit" | "pulse" | "draw" | "matrix". */
const BRAND_VARIANT: BrandMarkVariant = "orbit";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a href="#hero" className="site-header__brand hidden sm:flex">
        <BrandMark variant={BRAND_VARIANT} />
        <span className="site-header__wordmark">Nikunj&nbsp;Borad</span>
      </a>
      <div className="site-header__actions  justify-between sm:justify-normal w-full sm:w-auto">
        <span className="badge-remote">
          <span className="badge-remote__dot" aria-hidden="true" />
          Open to remote
        </span>
        <a
          href={contactData.resumeHref}
          download="Nikunj-Borad-Resume.pdf"
          data-magnetic="true"
          className="btn-resume"
        >
          Résumé
        </a>
      </div>
    </header>
  );
}
