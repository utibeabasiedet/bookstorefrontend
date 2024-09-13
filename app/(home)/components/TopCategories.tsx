"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Circle from "../../../public/img/book-categori/circle-shape.png"
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

const TopCategories: React.FC<TopCategoriesProps> = ({
  listTestimoni = [
    {
      name: "Flash Cards",
      image: "/img/book/flashcards-set.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "Story Books",
      image: "/img/book/inems-extraordinary-journey.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "Coloring Books",
      image: "/img/book/flashcards-set.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "Book Sets (3)",
      image: "/img/book/flashcards-set.png",
      city: "Warsaw",
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
    <h1 className="text-center font-bold text-5xl mb-10">Top Categories Book</h1>
      <Slider {...settings} arrows={false} ref={sliderRef} className="flex bg-[#D0E1E7] items-stretch justify-items-stretch">
        {listTestimoni.map((testimonis, index) => (
            <div className="px-3 flex items-stretch relative" key={index}>
            <div className="relative border-2 border-gray-500 bg-white rounded-full hover:border-orange-500 transition-all p-8 flex flex-col items-center">
              <div className="relative w-40 h-52 rounded-full overflow-hidden">
                <Image src={Circle} alt="Background Circle" layout="fill" objectFit="cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src={testimonis.image} alt="Icon People" layout="fill" objectFit="cover" />
                </div>
              </div>
              
            </div>
            <h2 className="mt-4 text-xl text-center font-bold">{testimonis.name}</h2>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <FaArrowLeft className="h-6 w-6" />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-orange-500 border hover:bg-orange-500 hover:text-white-500 transition-all text-orange-500 cursor-pointer"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <FaArrowRight className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCategories;
