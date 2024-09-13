"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

import Square from "../../../public/img/team/shape-img.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Testimonial = {
  name: string;
  image: string;
  city: string;
  country: string;
  rating: string;
  testimoni: string;
};

type TopCategoriesProps = {
  listTestimoni?: Testimonial[];
};

const Members: React.FC<TopCategoriesProps> = ({
  listTestimoni = [
    {
      name: "Itoro Akpan",
      image: "/img/ourteam1.jpeg",
      city: "Co-founder/CEO",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "Francis Onuk",
      image: "/img/ourteam2.jpeg",
      city: "Illustrator",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "Eduwem Akpan",
      image: "/img/ourteam3.jpeg",
      city: "Co-founder/COO",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "Aniekeme Umoh",
      image: "/img/ourteam4.jpeg",
      city: "Co-founder/CFO",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
  ],
}) => {
  // Use `typeof Slider` for type inference
  const sliderRef = useRef<typeof Slider | null>(null);

  const settings = {
    dots: true,
    customPaging: function (i: number) {
      return (
        <a>
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute mt-20",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h1 className="text-center font-bold text-4xl mb-4">Our Team</h1>
      <p className="text-center  text-xl mb-10">
        Meet the People Behind Uyai Akwa Ibom
      </p>
      <div className="relative">
      <Slider
        {...settings}
        arrows={false}
        ref={sliderRef}
        className="flex  items-stretch justify-items-stretch">
        {listTestimoni.map((testimonis, index) => (
          <div className="px-3 flex items-stretch relative" key={index}>
            <div className="relative border-2  bg-white rounded-[16px] hover:border-orange-500 transition-all p-8 flex flex-col items-center">
              <div className="relative w-52 h-52 rounded-full overflow-hidden">
                <div className="absolute inset-2 z-50 flex items-center justify-center ">
                  <Image
                    src={Square}
                    alt="Background Circle"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={testimonis.image}
                    alt="Icon People"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="border-dashed border-[#036280]  mt-5 px-5 rounded-xl py-4 border-2 flex flex-col items-center">
                <h2 className="text-lg text-center font-bold">
                  {testimonis.name}
                </h2>
                <p className="text-center">{testimonis.city}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center absolute top-[32%]  justify-between">
        <div className="flex flex-none justify-between w-full mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white transition-all text-orange-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickPrev()}>
            <FaArrowLeft className="h-6 w-6" />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white transition-all text-orange-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickNext()}>
            <FaArrowRight className="h-6 w-6" />
          </div>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Members;
