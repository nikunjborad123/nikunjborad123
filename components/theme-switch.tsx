"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        className="fixed bottom-7 right-2 bg-white w-[2.5rem] h-[2.5rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
        onClick={toggleTheme}
      >
        {theme !== "light" ? <BsSun /> : <BsMoon />}
      </button>
      <div className="fixed right-2 top-1/2 -translate-y-1/2 space-y-3">
        <a
          className=" bg-white w-[2.5rem] h-[2.5rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
          href="https://www.upwork.com/freelancers/boradnikunj?mp_source=share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiUpwork />
        </a>
        <a
          className=" bg-white w-[2.5rem] h-[2.5rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
          href="https://github.com/nikunjborad123"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          className=" bg-white w-[2.5rem] h-[2.5rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
          href="https://www.linkedin.com/in/nikunj-borad-7027b4180"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn height={5} />
        </a>
      </div>
    </>
  );
}
