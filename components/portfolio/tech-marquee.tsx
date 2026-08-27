import { Fragment } from "react";

const ITEMS = [
  "React",
  "Next.js App Router",
  "TypeScript",
  "React Server Components",
  "TanStack Query",
  "Core Web Vitals",
  "Tailwind",
  "shadcn/ui",
  "Node.js",
  "PostgreSQL",
];

function Group() {
  return (
    <span className="marquee-group">
      {ITEMS.map((item, i) => (
        <Fragment key={i}>
          <span>{item}</span>
          <span className="marquee-dot">·</span>
        </Fragment>
      ))}
    </span>
  );
}

export default function TechMarquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
