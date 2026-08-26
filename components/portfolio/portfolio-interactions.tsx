"use client";

import { useRef } from "react";
import { usePortfolioInteractions } from "./use-portfolio-interactions";

export default function PortfolioInteractions({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  usePortfolioInteractions(rootRef);

  return (
    <div ref={rootRef} className="portfolio">
      <a href="#work" className="skip-link">
        Skip to work
      </a>

      <div data-js="grain" className="grain" aria-hidden="true" />

      <div className="progress-track" aria-hidden="true">
        <div data-js="progress-bar" className="progress-bar" />
      </div>

      <div data-js="cursor-ring" className="cursor-ring" aria-hidden="true" />
      <div data-js="cursor-dot" className="cursor-dot" aria-hidden="true" />

      {children}
    </div>
  );
}
