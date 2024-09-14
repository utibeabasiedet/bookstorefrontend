"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faChevronRight,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"; 
import Image from "next/image";
import { Input } from "@/components/ui/input"; // Ensure you have a ShadCN Input component
import { Textarea } from "@/components/ui/textarea"; // Ensure you have a ShadCN Textarea component

// Define validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long"),
});

const BreadcrumbWrapper = () => {
  // Set up form handling and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // On form submit
  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <section>
      <div className="breadcrumb-wrapper bg-[#D0E1E7] flex justify-center items-center h-[50vh] relative">
        {/* Book1 Image */}
        <div className="book1 absolute  top-0 left-0">
          <Image
            src="/assets/img/hero/book1.png"
            alt="book"
            width={300}
            height={500}
            className="w-[150px] h-[150px] md:w-[200px] sm:h-[250px]"
          />
        </div>

        {/* Book2 Image */}
        <div className="book2 absolute bottom-0 md:top-10 block right-0">
          <Image
            src="/assets/img/hero/book2.png"
            alt="book"
            width={100}
            height={100}
            className="w-[100px] h-[150px] md:w-[200px] sm:h-[250px]"
          />
        </div>

        {/* Container */}
        <div className="container mx-auto px-4 py-8">
          <div className="page-heading text-center">
            <h1 className="text-4xl font-bold">Contact Us</h1>

            {/* Breadcrumb */}
            <div className="page-header mt-4">
              <ul className="breadcrumb-items flex items-center justify-center space-x-2">
                <li>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-gray-500"
                  />
                </li>
                <li className="text-gray-600">Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="md:px-16 px-4 flex lg:flex-row flex-col mx-auto gap-12 py-16">
        <div className="bg-[#036280] flex flex-col justify-around rounded-3xl px-4 py-5 w-100% lg:w-[30%] text-white">
          <div>
            <div className="flex gap-4 border-b border-gray-200 py-4 px-4 sm:py-8 ">
              <div className="border-2 border-dashed min-w-[50px] p-1 flex items-center justify-center h-[50px] rounded-full border-white">
                <FontAwesomeIcon icon={faPhone} className="text-white" />
              </div>
              <div className="flex flex-col">
                <div>Call Us 7/24</div>
                <div className="text-2xl font-bold text-wrap">+234 806 542 3816</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-4 border-b border-gray-200 py-4 px-4 sm:py-8 ">
              <div className="border-2 border-dashed min-w-[50px] p-1 flex items-center justify-center h-[50px] rounded-full border-white">
                <FontAwesomeIcon icon={faEnvelope} className="text-white" />
              </div>
              <div className="flex flex-col text-wrap">
                <div>Make a Quote</div>
                <div className="text-2xl font-bold text-wrap">info@uyaiakwaibom .com</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-4  py-4 px-4 sm:py-8 ">
              <div className="border-2 border-dashed min-w-[50px] p-1 flex items-center justify-center h-[50px] rounded-full border-white">
                <FontAwesomeIcon icon={faLocationDot} className="text-white" />
              </div>
              <div className="flex flex-col">
                <div>Location</div>
                <div className="text-2xl font-bold">4517 Washington ave.</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-100% lg:w-[70%]">
          <h1 className="text-3xl font-bold mb-4">Ready to Get Started?</h1>
          <p className="mb-8">
            We are always available to chat and respond to your questions and consultations. Send us a message!
          </p>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="col-span-2 md:col-span-1">
              <label className=" font-bold text-[#101010]">Your Name *</label>
              <Input
                {...register("name")}
                placeholder="Your Name"
                className={`w-full rounded-2xl border-gray-300 h-14 mt-4 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

            {/* Email Input */}
            <div className="col-span-2 md:col-span-1">
            <label className=" font-bold">Your Email *</label>
              <Input
                {...register("email")}
                placeholder="Your Email"
                className={`w-full mt-4 p-4 rounded-2xl border-gray-300 h-14 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="col-span-2">
            <label className=" font-bold">Write Message *</label>
              <Textarea
                {...register("message")}
                placeholder="Your Message"
                className={`w-full mt-4 h-40 p-4 rounded-2xl border-gray-300 ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-2 text-cente">
              <button
                type="submit"
                className="bg-[#036280] rounded-full text-white px-6 py-4 "
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbWrapper;
