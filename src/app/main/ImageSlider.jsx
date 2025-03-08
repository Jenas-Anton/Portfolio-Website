import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "../data";
import { Github } from "lucide-react";
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const ImageSlider = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4, 5]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex + 1) % projectsData.length)
    );
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length)
    );
  };

  const positions = ["center", "left1", "left", "right", "right1", "offscreen"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5, opacity: 1 },
    left1: { x: "-50%", scale: 0.8, zIndex: 3, opacity: 0.3 },
    left: { x: "-100%", scale: 0.6, zIndex: 2, opacity: 0.3 },
    right: { x: "100%", scale: 0.6, zIndex: 2, opacity: 0.3 },
    right1: { x: "50%", scale: 0.8, zIndex: 3, opacity: 0.3 },
    offscreen: { x: "150%", scale: 0.5, zIndex: 0, opacity: 0 }, // Keeps 6th image hidden
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[80%] mx-auto relative">
      
      {/* 🔹 Title Section */}
      <div className="absolute top-0 text-center z-20">
        <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 text-[60px]">
          My Projects
        </h1>
      </div>

      {/* 🔹 Image Slider Section */}
      <div className="relative top-16 flex items-center justify-center w-full gap-4">
        {projectsData.slice(0, 6).map((project, index) => (
          <motion.div
            key={project.id}
            initial="offscreen"
            animate={positions[positionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center"
          >
            {/* 🔹 Project Image */}
            <img
              src={project.src}
              alt={project.name}
              className="rounded-[12px] w-[80%] max-h-[450px]"
            />

            {/* 🔹 Project Name */}
            <p className=" from-gray-100 via-gray-400 to-gray-600 text-center mt-2 mb-2 z-20 rounded-md text-[25px]">
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
        ))}
      </div>

      {/* 🔹 Navigation Buttons */}
      <div className="flex gap-3 absolute top-1/2 left-10 z-20">
        <button className=" rounded-md py-2 px-4" onClick={handleBack}>
        < ChevronLeft size = {44} />
        </button>
      </div>
      <div className="flex gap-3 absolute top-1/2 right-10 z-20">
        <button className=" rounded-md py-2 px-4" onClick={handleNext}>
        <ChevronRight size = {44} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
