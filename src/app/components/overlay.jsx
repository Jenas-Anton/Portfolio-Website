"use client"
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import Navigation from "./navigation";
import Typewriter from "./Typewriter";
import RenderModel from "./RenderModel";
import Image from "next/image";
import Wizard from "./models/Wizard";
const bg = "/background/robot.png"; 


export default function Overlay({ showModel, navBarVisible, handleNavBarClick }) {
  return (
    <>
     <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 cursor-pointer">
        <Image 
          src={bg} 
          alt="Navigation Toggle" 
          width={50}  // Adjust width as needed
          height={50} // Adjust height as needed
          className="rounded-full hover:opacity-80 transition-opacity duration-300" 
          onClick={handleNavBarClick} 
        />
      </div>

      

      {/* Navigation */}
      <AnimatePresence>
        {navBarVisible && (
          <motion.div
            key="navigation"
            className="fixed top-0 left-4 w-full z-30"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Model */}
      <AnimatePresence>
        {showModel && (
          <motion.div
            key="model"
            className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-3xl h-[500px]">
              <RenderModel>
                <Wizard />
              </RenderModel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
