"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun, BsWhatsapp } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a
        className="fixed bottom-20 right-5 text-green-500 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
        href="whatsapp://send?text=Hello How can I help you today?&phone=+919574983660"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsWhatsapp />
      </a>
      <button
        className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
        onClick={toggleTheme}
      >
        {theme !== "light" ? <BsSun /> : <BsMoon />}
      </button>
    </>
  );
}
