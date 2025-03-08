// components/ScrollControlledContent.js
"use client"; // Mark as a client component
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollControlledContent = ({ children }) => {
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);

  useEffect(() => {
    const unsubscribe = () => {};

    return unsubscribe;
  }, []); // Empty dependency array means it runs only after mount

  // Calculate transformations based on scrollYValue
  const typingOpacity = useTransform(scrollY, [0, 200], [1, 0]); // Typewriter fades out
  const modelOpacity = useTransform(scrollY, [100, 300], [0, 1]); // Model fades in
  const modelScale = useTransform(scrollY, [100, 300], [1, 1]);
  const navOpacity = useTransform(scrollY, [150, 350], [0, 1]); // Navigation fades in

  const style = {
    typingOpacity,
    modelOpacity,
    modelScale,
    navOpacity,
  };

  return children(style);
};

export default ScrollControlledContent;