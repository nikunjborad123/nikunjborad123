type Bar = {
  name: string;
  range: string;
  left: number;
  width: number;
  variant?: "warn" | "accent";
};

const BEFORE_BARS: Bar[] = [
  { name: "document", range: "0,0.42", left: 0, width: 7.8 },
  { name: "vendor.js", range: "0.42,1.36", left: 7.8, width: 17.4 },
  { name: "app.js", range: "0.55,1.74", left: 10.2, width: 22 },
  { name: "GET /holdings", range: "1.8,2.71", left: 33.3, width: 16.9, variant: "warn" },
  { name: "GET /ratings", range: "2.75,3.79", left: 50.9, width: 19.3, variant: "warn" },
  { name: "GET /portfolio", range: "3.83,5.02", left: 70.9, width: 22, variant: "warn" },
];

const AFTER_BARS: Bar[] = [
  { name: "document (RSC)", range: "0,0.58", left: 0, width: 10.7, variant: "accent" },
  { name: "/dashboard (cached)", range: "0.18,0.74", left: 3.3, width: 10.4, variant: "accent" },
  { name: "island chunk", range: "0.6,1.02", left: 11.1, width: 7.8, variant: "accent" },
  { name: "hydrate charts", range: "1.04,1.46", left: 19.3, width: 7.8, variant: "accent" },
];

function BarRow({ bar }: { bar: Bar }) {
  return (
    <div className="lab__bar-row">
      <span className="lab__bar-name">{bar.name}</span>
      <span className="lab__bar-track">
        <span
          data-bar={bar.range}
          className={`lab__bar-fill${bar.variant ? ` lab__bar-fill--${bar.variant}` : ""}`}
          style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
        />
      </span>
    </div>
  );
}

function MiniFrame({ accent }: { accent?: boolean }) {
  return (
    <div data-lab-frame={accent ? "after" : "before"} aria-hidden="true" className={`lab__frame${accent ? " lab__frame--accent" : ""}`}>
      <div data-state="blank" className="lab__frame-state lab__frame-state--blank" />
      <div data-state="skeleton" className="lab__frame-state lab__frame-state--skeleton">
        <span className="lab__skeleton-title" />
        <span className="lab__skeleton-line" />
        <span className="lab__skeleton-block" />
      </div>
      <div data-state="painted" className="lab__frame-state lab__frame-state--painted">
        <span className="lab__painted-title" />
        <span className="lab__painted-row">
          <span className={accent ? "lab__painted-accent" : "lab__painted-warn"} />
          <span className="lab__painted-block" />
        </span>
      </div>
    </div>
  );
}

export default function PerformanceLab() {
  return (
    <section id="speed" className="section section--alt">
      <div className="section-inner">
        <p className="section-eyebrow">03 — Performance</p>
        <div className="section-head">
          <h2 data-anim="riseIn" data-reveal="entry 4% cover 26%">
            Five seconds to <span style={{ color: "var(--acc)" }}>1.5</span>
          </h2>
          <p>
            The flagship dashboard was waterfalling six sequential requests before it painted anything. Restructuring data
            fetching around TanStack Query caching, request deduplication and query-level optimisation cut it by roughly
            70%. Drag the playhead.
          </p>
        </div>

        <div data-lab className="lab">
          <div className="lab__head">
            <span className="lab__head-label">Dashboard load · network waterfall</span>
            <span className="lab__playhead">
              <span className="lab__playhead-label">Playhead</span>
              <span data-lab-time className="lab__playhead-value">
                0.00s
              </span>
            </span>
          </div>

          <div
            data-lab-track
            role="slider"
            tabIndex={0}
            aria-label="Load timeline playhead in seconds"
            aria-valuemin={0}
            aria-valuemax={5.4}
            aria-valuenow={0}
            aria-valuetext="0 seconds"
            className="lab__track"
          >
            <div data-lab-head aria-hidden="true" className="lab__head-bar" />

            <p className="lab__row-label">
              Before <span className="lab__row-label-line" /> 5.02s
            </p>
            <div className="lab__lane">
              {BEFORE_BARS.map((bar) => (
                <BarRow key={bar.name} bar={bar} />
              ))}
            </div>

            <p className="lab__row-label lab__row-label--accent">
              After <span className="lab__row-label-line" /> 1.46s
            </p>
            <div className="lab__lane">
              {AFTER_BARS.map((bar) => (
                <BarRow key={bar.name} bar={bar} />
              ))}
            </div>
          </div>

          <div className="lab__grid">
            <div className="lab__grid-col">
              <p className="lab__frame-label">Before · at playhead</p>
              <MiniFrame />
            </div>
            <div className="lab__grid-col">
              <p className="lab__frame-label lab__frame-label--accent">After · at playhead</p>
              <MiniFrame accent />
            </div>
            <div className="lab__grid-col lab__stat-col">
              <div>
                <p className="lab__stat-label">Requests to first paint</p>
                <p className="lab__stat-value">6 → 3</p>
              </div>
              <div>
                <p className="lab__stat-label">Lighthouse SEO</p>
                <p className="lab__stat-value lab__stat-value--accent">100 / 100</p>
              </div>
              <div>
                <p className="lab__stat-label">Levers</p>
                <p className="lab__stat-note">Server Components, query-level dedup, Redis cache, code splitting, image optimisation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
