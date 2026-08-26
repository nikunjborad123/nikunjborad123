import WebglHero from "./webgl-hero";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__canvas-layer">
        <WebglHero />
      </div>
      <div className="hero__gradient" aria-hidden="true" />

      <div className="hero__inner" data-anim="heroOut" data-reveal="exit 0% exit 90%">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          Surat, India · IST (UTC+5:30)
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line">
            <span className="hero__title-line-inner">Nikunj</span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-line-inner hero__title-line-inner--accent">Borad</span>
          </span>
        </h1>

        <div className="hero__footer">
          <p className="hero__lede">
            Senior frontend engineer building <em>fast, type-safe</em> product surfaces in React and Next.js.
          </p>
          <dl className="hero__stats">
            <div className="hero__stat">
              <dt>Experience</dt>
              <dd>4+ yrs</dd>
            </div>
            <div className="hero__stat">
              <dt>Load time cut</dt>
              <dd className="accent">70%</dd>
            </div>
            <div className="hero__stat">
              <dt>Lighthouse SEO</dt>
              <dd>100</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
