"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "../data";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import ResponsiveComponent from "@/app/components/ResponsiveComponent";
import Image from 'next/image';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ResponsiveComponent>
      {({ size }) => {
        // Dynamically adjust the number of visible images based on screen width
        const numVisible = size < 640 ? 3 : size < 1024 ? 4 : 6;
        
        const handleNext = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
        };

        const handleBack = () => {
          setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
        };

        const positions = ["center", "left1", "left", "right", "right1", "offscreen"].slice(
          0,
          numVisible
        );

        const imageVariants = {
          center: { x: "0%", scale: 1, zIndex: 5, opacity: 1 },
          left1: { x: "-50%", scale: 0.8, zIndex: 3, opacity: 0.3 },
          left: { x: "-100%", scale: 0.6, zIndex: 2, opacity: 0.3 },
          right: { x: "100%", scale: 0.6, zIndex: 2, opacity: 0.3 },
          right1: { x: "50%", scale: 0.8, zIndex: 3, opacity: 0.3 },
          offscreen: { x: "150%", scale: 0.5, zIndex: 0, opacity: 0 },
        };

        return (
          <div className="flex flex-col items-center justify-center w-full h-[80%] mx-auto relative">
            {/* 🔹 Title Section */}
            <div className="absolute top-0 text-center z-20">
              <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 text-[40px] sm:text-[60px]">
                My Projects
              </h1>
            </div>

            {/* 🔹 Image Slider Section */}
            <div className="relative top-16 flex items-center justify-center w-full gap-4">
              {/* Render all projects that should be visible */}
              {projectsData.map((project, index) => {
                // Calculate the relative position based on currentIndex
                const relativePosition = (index - currentIndex + projectsData.length) % projectsData.length;
                
                // Only show projects in our visible range
                if (relativePosition >= numVisible) return null;
                
                return (
                  <motion.div
                    key={project.id}
                    initial="offscreen"
                    animate={positions[relativePosition]}
                    variants={imageVariants}
                    transition={{ duration: 0.5 }}
                    className="absolute flex flex-col items-center"
                  >
                    {/* 🔹 Project Image */}
                    <Image
                      src={project.src}
                      alt={project.name}
                      width={500}
                      height={400}
                      className="rounded-[12px] w-[80%] max-h-[450px]"
                    />

                    {/* 🔹 Project Name */}
                    <p className="text-center mt-2 mb-2 z-20 rounded-md text-[20px] sm:text-[25px]">
                      {project.name}
                    </p>

                    {/* 🔹 GitHub Link Button */}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition-all duration-300"
                    >
                      <Github size={24} />
                      <span className="ml-2">View on GitHub</span>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* 🔹 Navigation Buttons */}
            <div className="flex gap-3 absolute top-1/2 left-4 sm:left-10 z-20">
              <button className="rounded-md py-2 px-4" onClick={handleBack}>
                <ChevronLeft size={40} />
              </button>
            </div>
            <div className="flex gap-3 absolute top-1/2 right-4 sm:right-10 z-20">
              <button className="rounded-md py-2 px-4" onClick={handleNext}>
                <ChevronRight size={40} />
              </button>
            </div>
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default ImageSlider;