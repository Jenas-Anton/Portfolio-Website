"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const Typewriter = () => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[clamp(5rem,6vw,5rem)] font-extrabold bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 text-transparent bg-clip-text drop-shadow-lg tracking-wide leading-none"
      >
        Jenas Anton
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, scale: 1}}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[clamp(1.5rem,4vw,4rem)] font-semibold text-gray-300"
      >
        <TypeAnimation
          sequence={[
            "AI/ML Developer", 100,
            "Tech Enthusiast", 100,
            "Problem Solver", 100
          ]}
          wrapper="span"
          speed={1}
          repeat={Infinity}
        />
      </motion.p>
    </section>
  );
};

export default Typewriter;
