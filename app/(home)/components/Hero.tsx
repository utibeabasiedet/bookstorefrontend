"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/img/custom/realbg.png";
import { gsap } from "gsap";

const Hero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // Continuous y-axis animation for the book image (infinite loop)
    gsap.to(imageRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="sm:pt-[68px] pt-[10px] px-8 lg:px-12 overflow-hidden bg-[#052c65] border-[#055160] border-y-[1px] text-white relative">
      <div className="flex flex-col-reverse mx-auto lg:flex-row justify-between items-center">
        {/* Left Content */}
        <div className="relative top-[-50px]">
          <div className="md:max-w-[600px] mt-[40px] max-w-full leading-[1] mb-[24px] text-white md:text-[4rem] text-[32px] tracking-tight font-bold">
            Akwa Ibom's Language & Culture 
          </div>
          <div className="md:max-w-[623px] max-w-full mt-0 text-[#cfe2ff] text-[1.25rem]">
            Diọk mme Anie udia ikono Akwa Ibom!
          </div>
          <div className="sm:-translate-x-2 mx-auto w-[100%] mt-6">
            {/* Explore Button */}
            <Link href="#" passHref>
              <button className="bg-[#fd7e14] hover:bg-[#f76707] text-white font-semibold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg">
                Explore Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative">
          <div className="relative z-20 ">
            <div className="-rotate-90 lg:-rotate-90">
              <Image
                priority={true}
                src={heroImage}
                alt="hero"
                className="object-contain"
                ref={imageRef}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
