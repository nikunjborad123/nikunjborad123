"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import photo from "../public/nikunj.png";
// import { gsap } from 'gsap';
// import { useGSAP } from '@gsap/react';
// import SplitType from 'split-type';

// gsap.registerPlugin(useGSAP);
export default function Intro() {
  // const introRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // const tl = useRef<GSAPTimeline>();
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  // useGSAP(
  //   () => {
  //     if (introRef.current) {
  //       const text = SplitType.create(introRef.current, { types: 'chars' });

  //       tl.current = gsap
  //         .timeline()
  //         .from('.userAvatar', {
  //           opacity: 1,
  //           y: 200,
  //           duration: 0.5,
  //           ease: 'back.out(1.7)',
  //         })
  //         .from('.hand', {
  //           opacity: 0,
  //           y: 200,
  //           duration: 0.3,
  //           ease: 'back.out(1.7)',
  //         })
  //         .from(text.chars, {
  //           y: -50,
  //           scaleY: 0,
  //           opacity: 0,
  //           stagger: 0.01,
  //           duration: 0.5,
  //           ease: 'circ.in',
  //         })
  //         .from('.buttonsGroup', {
  //           opacity: 0,
  //           duration: 0.3,
  //           ease: 'power4.in',
  //         });
  //     }
  //   },
  //   { scope: containerRef }
  // );

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div ref={containerRef} className="min-h-[calc(100vh_-_200px)] grid">
        <div className="flex items-center justify-center">
          <div className="relative">
            <Image
              src={"/emojy-with-leptop-2.jpg"}
              alt="Nikunj Borad"
              width="240"
              height="240"
              quality="95"
              priority={true}
              className="userAvatar h-28 w-28 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />

            <span className="hand absolute bottom-0 right-0 text-4xl">👋</span>
          </div>
        </div>

        <h1 className="introText mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-3xl">
          <span>
            Hello, I'm <b>Nikunj</b>. I'm a <b>Frontend developer</b> with{" "}
            <b> 3+ years </b> of experience. I enjoy building sites & apps. My
            focus is <b> React (Next.js)</b>. I'm passionate about creating
            seamless user experiences and continually learning new technologies.
          </span>
        </h1>

        <div className="buttonsGroup flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium">
          <Link
            href="#contact"
            className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 hover:text-green-400 active:scale-105 transition"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            Contact me here{" "}
            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            href={"/Nikunj-borad.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            locale={false}
            download
          >
            <span
              className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
              onClick={() => window.open("/Nikunj-borad.pdf", "_blank")}
            >
              Download CV{" "}
              <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
