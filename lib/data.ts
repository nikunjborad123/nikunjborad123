import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Senior React JS Developer | HVG Infotech Private Limited",
    location: "Surat, Gujarat",
    description:
      "Developed and maintained React-based applications for 2 years, focusing on UI/UX enhancements. Transitioned to full stack development, acquiring skills in backend technologies.",
    icon: React.createElement(FaReact),
    date: "2022 - Present",
  },
  {
    title: "Frontend Web developer | Invints Infotech Private Limited",
    location: "Surat, Gujarat",
    description:
      "Graduated after 6 months of study, secured a front-end developer role. Responsible for building responsive web applications and collaborating with design teams.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2022",
  },
] as const;

export const projectsData = [
  {
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "HTML 5",
  "CSS 3",
  "JavaScript",
  "TypeScript",
  "React",
  "React Hooks",
  "Next.js",
  "Git",
  "Axios",
  "Tailwind",
  "Redux",
  "Redux Toolkit",
  "Framer Motion",
  "Material Ui",
  "Styled Components",
  "Shadcn Ui",
  "React Bootstrap",
  "Antd",
  "Semantic UI",
  "Lodash",
  "Formik",
  "React Hook Form",
] as const;
