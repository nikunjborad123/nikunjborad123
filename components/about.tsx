'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from './section-heading';

export default function About() {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Hey there! 👋 I'm a <b> frontend developer</b> who's all about turning pixels
        into poetry and crafting digital experiences that leave users in awe. My
        journey into coding started with a passion for problem-solving, but it
        was the magic of frontend development that truly stole my heart. <br />
        <br /> I spend my days diving deep into <b> React.js and Next.js</b>,
        sprinkling in a dash of
        <b> HTML, CSS, and JavaScript </b>to breathe life into designs. From
        tweaking stylesheets to fine-tuning animations, I'm all about those
        little details that make a big difference. And you can bet I've got
        TypeScript in my toolkit, adding that extra layer of stability to my
        projects. <br />
        <br /> When I'm not knee-deep in code, you'll often find me battling
        dragons in virtual realms or lost in the captivating plots of the latest
        blockbuster films. And if I'm not glued to a screen, I'll likely be
        strumming away on my guitar, trying to master that elusive chord
        progression. I'm on the lookout for new opportunities to collaborate and
        bring my frontend expertise to the table. Let's team up and create some
        digital magic together! ✨
      </p>
    </motion.section>
  );
}
