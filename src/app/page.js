"use client";
import Image from "next/image";
import { useState } from "react";
import Overlay from "./components/overlay";
import Page from "./main/Skills";
import Typewriter from "./components/Typewriter";
import ProjectSlider from "./main/ImageSlider";

export default function Home() {
  const [showModel, setShowModel] = useState(false);
  const [navBarVisible, setNavBarVisible] = useState(false);

  const handleNavBarClick = () => {
    setShowModel((prev) => !prev);
    setNavBarVisible((prev) => !prev);
  };

  return (
    <main className="flex flex-col min-h-screen scroll-smooth relative">
      {/* 🔹 Background (Applies to all sections) */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/background/home-background.png" 
          alt="Background" 
          fill 
          style={{ objectFit: "cover" }} 
          priority 
        />
      </div>

      {/* 🔹 Home Section (Jenas Anton) */}
      <section id="home" className="h-screen flex flex-col items-center justify-center relative z-10">
        <Typewriter /> 
        {/* Overlay (Handles Navbar, Typewriter, and Model) */}
        <Overlay showModel={showModel} navBarVisible={navBarVisible} handleNavBarClick={handleNavBarClick} />
      </section>
      {/* 🔹 Skills Section (Next Page) */}
      <section id="skills" className="h-screen flex items-center justify-center relative z-0">
        <Page />
      </section>
      <section id="Projects" className="h-screen flex items-center justify-center relative z-0">
        <ProjectSlider />
      </section>
    </main>
  );
}
