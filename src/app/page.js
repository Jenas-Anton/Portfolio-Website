"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import Overlay from "./components/overlay";
import Page from "./main/Skills";
import Typewriter from "./components/Typewriter";
import ProjectSlider from "./main/ImageSlider";
import EmailSection from "./main/ContactForm";
import ChatComponent from "./main/SpeedDialButton";
import CircularGallery from "./components/CircularGallery/CircularGallery";

export default function Home() {
  const [showModel, setShowModel] = useState(false);
  const [navBarVisible, setNavBarVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavBarClick = () => {
    setShowModel((prev) => !prev);
    setNavBarVisible((prev) => !prev);
  };

  return (
    <main className="flex flex-col min-h-screen scroll-smooth relative overflow-x-hidden w-screen">
      {/* 🔹 Background (Applies to all sections) */}
      <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden">
        <Image 
          src="/background/home-background.png" 
          alt="Background" 
          fill 
          style={{ objectFit: "cover" }} 
          priority 
          className="w-screen h-screen"
        />
      </div>

      {/* 🔹 Home Section */}
      <section id="home" className="h-screen flex flex-col items-center justify-center relative z-10 w-full">
        <Typewriter /> 
        <Overlay showModel={showModel} navBarVisible={navBarVisible} handleNavBarClick={handleNavBarClick} />
      </section>

      {/* 🔹 Skills Section */}
      <section id="skills" className="h-screen flex items-center justify-center relative z-0 w-full">
        <Page />
      </section>

      {/* 🔹 Projects Section */}
      <section id="Projects" className="h-screen flex items-center justify-center relative z-0 w-full">
        <CircularGallery />
      </section>

      {/* 🔹 Contact Section */}
      <section id="Contact" className="h-screen flex items-center justify-center relative z-0 w-full">
        <EmailSection />
      </section>

      {/* 🔹 Chatbot Speed Dial Button */}
      <ChatComponent />
    </main>
  );
}
