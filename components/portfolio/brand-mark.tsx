export type BrandMarkVariant = "orbit" | "pulse" | "draw" | "matrix";

type BrandMarkProps = {
  variant?: BrandMarkVariant;
  className?: string;
};

/**
 * Animated NB monogram for the site header.
 *
 * Every variant is a 40x40 viewBox so they are drop-in swappable, and all motion
 * lives in portfolio.css (`.brand-mark*`) so the global prefers-reduced-motion
 * rule can neutralise it. The mark is decorative — the adjacent wordmark carries
 * the accessible name — hence aria-hidden.
 */
export default function BrandMark({ variant = "orbit", className = "" }: BrandMarkProps) {
  const classes = `brand-mark brand-mark--${variant} ${className}`.trim();

  return (
    <svg
      viewBox="0 0 40 40"
      className={classes}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {variant === "orbit" ? <OrbitMark /> : null}
      {variant === "pulse" ? <PulseMark /> : null}
      {variant === "draw" ? <DrawMark /> : null}
      {variant === "matrix" ? <MatrixMark /> : null}
    </svg>
  );
}

/* ---------- orbit: monogram inside a dashed ring with a satellite ---------- */

function OrbitMark() {
  return (
    <g>
      <circle className="brand-mark__ring" cx="20" cy="20" r="17" />
      <path className="brand-mark__glyph" d="M13 27V13l14 14V13" />
      <g className="brand-mark__satellite">
        <circle cx="20" cy="3" r="2.6" />
      </g>
    </g>
  );
}

/* ---------- pulse: latency bars rising into an N silhouette ---------- */

function PulseMark() {
  const bars = [
    { x: 6, h: 10 },
    { x: 13, h: 18 },
    { x: 20, h: 13 },
    { x: 27, h: 22 },
    { x: 34, h: 16 },
  ];

  return (
    <g className="brand-mark__bars">
      {bars.map((bar, i) => (
        <rect
          key={bar.x}
          className="brand-mark__bar"
          x={bar.x - 2}
          y={32 - bar.h}
          width="4"
          height={bar.h}
          rx="2"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      <line className="brand-mark__baseline" x1="3" y1="35" x2="37" y2="35" />
    </g>
  );
}

/* ---------- draw: NB monogram that keeps redrawing itself ---------- */

function DrawMark() {
  return (
    <g className="brand-mark__strokes">
      <path
        className="brand-mark__stroke brand-mark__stroke--n"
        pathLength={100}
        d="M6 30V10l11 15V10"
      />
      <path
        className="brand-mark__stroke brand-mark__stroke--b"
        pathLength={100}
        d="M24 10v20M24 10h6a5 5 0 0 1 0 10h-6M24 20h7a5 5 0 0 1 0 10h-7"
      />
      <circle className="brand-mark__spark" cx="34" cy="8" r="2.4" />
    </g>
  );
}

/* ---------- matrix: dot grid tracing an N, one node at a time ---------- */

function MatrixMark() {
  // Grid coordinates, ordered along the stroke path of an "N" so the trace reads
  // as a single pen movement: up the left stem, down the diagonal, up the right.
  const trace = [
    [8, 32],
    [8, 20],
    [8, 8],
    [20, 20],
    [32, 32],
    [32, 20],
    [32, 8],
  ];
  const idle = [
    [20, 8],
    [20, 32],
  ];

  return (
    <g>
      {idle.map(([cx, cy]) => (
        <circle key={`idle-${cx}-${cy}`} className="brand-mark__node" cx={cx} cy={cy} r="2.2" />
      ))}
      {trace.map(([cx, cy], i) => (
        <circle
          key={`on-${cx}-${cy}`}
          className="brand-mark__node brand-mark__node--live"
          cx={cx}
          cy={cy}
          r="2.6"
          style={{ animationDelay: `${i * 0.14}s` }}
        />
      ))}
    </g>
  );
}
