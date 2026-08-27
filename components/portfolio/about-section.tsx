import Image from "next/image";
import { timezoneOverlapData } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="section section--alt">
      <div className="section-inner">
        <p className="section-eyebrow">07 — About &amp; availability</p>
        <div className="about-grid">
          <div data-anim="wipeIn" data-reveal="entry 6% cover 32%">
            <div className="about-portrait">
              <Image
                src="/about-portrait.webp"
                alt="Nikunj Borad"
                width={920}
                height={1150}
                sizes="(max-width: 900px) 100vw, 460px"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <h2 className="about-heading" data-anim="riseIn" data-reveal="entry 4% cover 26%">
              Frontend architecture, measured in milliseconds
            </h2>
            <p className="about-lede">
              Frontend engineer with 4+ years shipping production React and Next.js applications, currently Lead Software
              Engineer on enterprise SaaS platforms.
            </p>
            <p className="about-text">
              I specialise in frontend architecture, SSR and Core Web Vitals performance, and type-safe TypeScript
              codebases — with enough Node.js and database range to deliver features end to end.
            </p>
            <p className="about-text about-text--last">
              Seeking a fully remote, full-time senior frontend role with an international product team.
            </p>

            <div className="about-card">
              <div className="about-card__head">
                <h3 className="about-card__title">My local time</h3>
                <p data-clock className="about-card__clock">
                  —:—:—
                </p>
              </div>
              <p className="about-card__desc">
                IST (UTC+5:30) — full working-hours overlap with EU and UK, 4+ hours daily overlap with US Eastern;
                flexible for scheduled US Pacific calls.
              </p>
              <ul className="about-card__bars">
                {timezoneOverlapData.map((tz, i) => (
                  <li key={tz.label} className="about-card__bar-row">
                    <span className="about-card__bar-label">{tz.label}</span>
                    <span className="about-card__bar-track">
                      <span
                        className="about-card__bar-fill"
                        style={{ width: `${tz.pct}%` }}
                        data-anim="growX"
                        data-reveal={`entry ${10 + i * 3}% cover ${34 + i * 3}%`}
                      />
                    </span>
                    <span className="about-card__bar-note">{tz.note}</span>
                  </li>
                ))}
              </ul>
              <p className="about-card__footnote">
                Secondary preference: on-site or hybrid in Surat, Gujarat, India. Languages: English (professional working
                proficiency), Hindi, Gujarati. Diploma in Frontend Web Development, Creative Design and Multimedia
                Institute, Surat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
