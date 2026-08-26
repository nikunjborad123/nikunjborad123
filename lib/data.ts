export const railLinks = [
  { id: "work", label: "Work" },
  { id: "speed", label: "Speed" },
  { id: "path", label: "Path" },
  { id: "stack", label: "Stack" },
  { id: "ai", label: "AI" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const experiencesData = [
  {
    date: "April 2026 — August 2026",
    title: "Senior NextJs Developer",
    company: "eLaunch Solution Private Limited · Surat, India",
    bullets: [
      "Led a small frontend team producing pixel-perfect, mobile-responsive templates for online casino platforms — from Figma handoff to production, with a focus on speed, consistency and reusable components.",
    ],
  },
  {
    date: "January 2024 — April 2026",
    title: "Lead Software Engineer",
    company: "HVG Infotech Private Limited · Surat, India",
    bullets: [
      "Own frontend architecture for enterprise SaaS products, defining technical standards, review gates and delivery practices.",
      "Cut flagship dashboard load time from ~5s to under 1.5s (≈70% faster) by restructuring data fetching around TanStack Query caching, request deduplication and query-level optimisation.",
      "Architected Next.js App Router + React Server Components implementations optimised for SEO and time-to-interactive, achieving 100/100 Lighthouse SEO with structured data powering rich search and social previews.",
      "Introduced an AI-augmented development workflow (Claude Code, GitHub Copilot) built on spec-first prompting and mandatory human review, increasing feature throughput ~40% without relaxing code-review or QA standards.",
      "Mentor engineers through code review, pairing and architecture walkthroughs; authored the team's frontend conventions and pull-request checklist.",
    ],
  },
  {
    date: "December 2022 — December 2023",
    title: "Software Engineer",
    company: "HVG Infotech Private Limited · Surat, India",
    bullets: [
      "Delivered client-facing web applications in React, Next.js and TypeScript, from requirements through production release and maintenance.",
      "Built complex UI surfaces including data-visualisation charts, interactive filterable data tables and multi-step form wizards with validation.",
      "Standardised server state on TanStack Query and client state on Zustand / Redux Toolkit, eliminating duplicated fetch logic and redundant network calls across the codebase.",
      "Integrated REST APIs and WebSocket channels to power real-time data updates and in-app notifications.",
    ],
  },
  {
    date: "June 2022 — November 2022",
    title: "Frontend Developer",
    company: "Invints Infotech LLP · Surat, India",
    bullets: [
      "Built e-commerce web applications and Shopify storefronts with a focus on conversion and page-speed.",
      "Translated Photoshop mockups into pixel-accurate, mobile-first interfaces (HTML5, CSS3, JavaScript, jQuery, Bootstrap) and tuned load performance and cross-browser compatibility.",
    ],
  },
] as const;

export const projectsData = [
  {
    slotId: "work-investment",
    placeholder: "Drop a dashboard screenshot",
    eyebrow: "01 — Fintech SaaS",
    title: "Investment Analytics SaaS Platform",
    role: "Lead Frontend & Architecture Engineer",
    description:
      "Self-serve platform giving retail investors automated stock ratings, portfolio analysis and backtesting.",
    bullets: [
      "Architected the frontend on Next.js Server Components for SEO and first-load performance; delivered 100% Lighthouse SEO and a 70% reduction in dashboard load time.",
      "Built the CAGR Ratings Engine UI, surfacing 300+ metrics per stock through a visual star-rating system that made dense quantitative data scannable.",
      "Developed interactive backtesting tools with historical simulations, performance graphs and multi-portfolio comparison charts.",
      "Shipped Pro-tier features — watchlists, real-time alerts, screeners, downloadable reports — on WebSockets and Redis caching for near real-time updates.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    slotId: "work-specs",
    placeholder: "Drop a data-table screenshot",
    eyebrow: "02 — Enterprise tooling",
    title: "Enterprise Product Specification Management System",
    role: "Full-Stack Developer",
    description:
      "Collaborative system for managing complex hardware product specifications across sales, delivery and customer teams.",
    bullets: [
      "Built the full stack — React frontend and Node.js/MongoDB backend — for specification authoring, categorisation and export.",
      "Implemented role-based access control across 5 user tiers (Super Admin, Admin, Project Manager, Sales, Customer) with tier-specific views and permissions.",
      "Engineered advanced data tables with multi-dimensional filtering, sorting, saved filter presets and export, cutting the time to retrieve a specification set.",
      "Paired TanStack Query with Zustand for server-state caching and optimistic updates, keeping large spec tables responsive under frequent edits.",
    ],
    tags: ["React", "TypeScript", "TanStack Query", "Zustand", "Tailwind", "Express", "MongoDB"],
  },
] as const;

export const stackData = [
  {
    id: "core",
    label: "Core",
    items: [
      "React.js",
      "Next.js (App Router)",
      "Server Components",
      "ISR / SSR / SSG",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: "state",
    label: "State & Data",
    items: [
      "TanStack Query",
      "TanStack Router",
      "TanStack Start",
      "Zustand",
      "Redux Toolkit",
      "React Context",
      "REST APIs",
      "WebSockets",
      "Axios",
    ],
  },
  {
    id: "ui",
    label: "UI & Styling",
    items: [
      "Tailwind CSS",
      "shadcn/ui",
      "Material UI",
      "Styled Components",
      "Bootstrap",
      "Responsive design",
      "Cross-browser",
    ],
  },
  {
    id: "perf",
    label: "Performance & SEO",
    items: [
      "Core Web Vitals",
      "Lighthouse auditing",
      "Caching",
      "Code splitting",
      "Lazy loading",
      "Image optimisation",
      "JSON-LD",
      "Open Graph",
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis", "API design"],
  },
  {
    id: "tooling",
    label: "Tooling & Cloud",
    items: ["Git", "GitHub Actions", "AWS", "Vercel", "Vite", "Webpack", "npm / yarn / pnpm"],
  },
  {
    id: "practice",
    label: "Practices",
    items: [
      "Frontend architecture",
      "Technical standards",
      "Code review",
      "Mentoring",
      "Agile delivery",
      "Cross-functional collaboration",
    ],
  },
] as const;

export const aiPipelineData = [
  {
    title: "Spec first",
    body: "Every task starts as a written specification and an implementation plan. Nothing gets generated against a vague prompt — the constraints, edge cases and file boundaries are decided before any code exists.",
  },
  {
    title: "Repo-level context",
    body: "I design repo-level context and reusable prompt templates so AI output matches existing team conventions and architecture, rather than inventing a second style in the same codebase.",
  },
  {
    title: "Heavy lifting, delegated",
    body: "Claude Code and GitHub Copilot handle large-scale refactors, framework migrations, edge-case discovery, type and schema generation, and first-pass code review.",
  },
  {
    title: "Mandatory human review",
    body: "Nothing merges without human review and tests. Throughput rose ~40% precisely because the review and QA gates stayed exactly where they were.",
  },
  {
    title: "Past the frontend boundary",
    body: "I build and modify Node.js/Express endpoints, adjust schemas and write integration glue to keep feature delivery unblocked — the frontend never waits on someone else's queue.",
  },
] as const;

export const timezoneOverlapData = [
  { label: "UK / EU", pct: 100, note: "Full" },
  { label: "US East", pct: 52, note: "4+ hrs" },
  { label: "Singapore", pct: 88, note: "Near-full" },
  { label: "US Pacific", pct: 26, note: "Scheduled" },
] as const;

export const contactData = {
  email: "boradnikunj2001@gmail.com",
  phone: "+91 95749 83660",
  phoneHref: "+919574983660",
  github: "https://github.com/nikunjborad123",
  linkedin: "https://linkedin.com/in/nikunj-borad-7027b4180",
  site: "https://nikunjborad123.vercel.app",
  resumeHref: "/Nikunj-Borad-Resume.pdf",
} as const;
