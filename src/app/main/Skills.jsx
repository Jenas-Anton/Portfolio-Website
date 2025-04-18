"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SkillData } from "@/app/data";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import ResponsiveComponent from "@/app/components/ResponsiveComponent";

const Page = () => {
  return (
    <ResponsiveComponent>
      {({ size }) => {
        // Dynamically adjust slides per view
        const slidesPerView = size < 640 ? 2 : size < 1024 ? 3 : 5;

        return (
          <div
            style={{ backgroundImage: "url(/bg-2.jpg)" }}
            className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
          >
            <div className="flex flex-col gap-20 max-w-[80%] text-center items-center">
              <div className="flex flex-col items-center gap-4">
                <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 text-[60px]">
                  Skills{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
                    &{" "}
                  </span>
                  Technologies
                </h1>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 text-[20px]">
                  Using the latest tech this world has to offer
                </p>
              </div>

              {/* First Swiper */}
              <Swiper
                slidesPerView={slidesPerView}
                loop={true}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={5000}
                modules={[Autoplay]}
                className="max-w-[80%]"
              >
                {SkillData.map((skill, index) => (
                  <SwiperSlide key={index} className="flex flex-col items-center">
                    <Image src={skill.src} alt={skill.name} width={skill.width} height={skill.height} />
                    <p className="mt-2 text-white text-sm">{skill.name}</p>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Second Swiper - Reverse direction */}
              <Swiper
                slidesPerView={slidesPerView}
                loop={true}
                autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
                speed={5000}
                modules={[Autoplay]}
                className="max-w-[80%]"
              >
                {SkillData.map((skill, index) => (
                  <SwiperSlide key={index} className="flex flex-col items-center">
                    <Image src={skill.src} alt={skill.name} width={skill.width} height={skill.height} />
                    <p className="mt-2 text-white text-sm">{skill.name}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default Page;
