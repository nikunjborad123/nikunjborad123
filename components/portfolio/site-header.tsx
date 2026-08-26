import { contactData } from "@/lib/data";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a href="#hero" className="site-header__brand">
        <span className="site-header__dot" aria-hidden="true" />
        <span className="site-header__wordmark">Nikunj&nbsp;Borad</span>
      </a>
      <div className="site-header__actions">
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
