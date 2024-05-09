'use client';

import { motion, useScroll } from "framer-motion";
import React from "react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 origin-left h-1 bg-green-500 z-50"
      style={{
        scaleX: scrollYProgress,
      }}
      transition={{
        type: "ease-in-out",
      }}
    />
  );
};

export default ScrollProgress;
