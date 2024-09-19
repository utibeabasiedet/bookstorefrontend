import Image from "next/image";
import React from "react";
import Logo from "../public/img/logo/uyai-logo.png";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from "react-icons/fa";
import { Input } from "@/components/ui/input"; // ShadCN Input component

const Footer = () => {
  return (
    <section className="bg-[#012E4A] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row text-white space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="w-full lg:w-[50%] flex flex-col lg:flex-row gap-y-8 lg:gap-x-8">
          {/* Logo and description */}
          <div className="lg:w-[50%] flex flex-col gap-y-6">
            <Link href="/">
              <Image src={Logo} alt="Logo" width={250} height={70} />
            </Link>
            <p>
              Making Akwa Ibom language and culture accessible and fun for young learners.
            </p>
            {/* Social media icons */}
            <div className="flex space-x-4">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/profile.php?id=100069431191071"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors">
                <FaFacebookF className="text-white" />
              </Link>

              {/* Twitter */}
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors">
                <FaTwitter className="text-white" />
              </Link>

              {/* Instagram */}
              <Link
                href="https://instagram.com/uyai.akwa.ibom?igshid=MjEwN2IyYWYwYw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors">
                <FaInstagram className="text-white" />
              </Link>

              {/* YouTube */}
              <Link
                href="https://youtube.com/@UyaiAkwaIbom-fr6wm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors">
                <FaYoutube className="text-white" />
              </Link>
            </div>
          </div>

          {/* Customer Support Links */}
          <div className="lg:w-[50%]">
            <h1 className="text-xl lg:text-2xl font-bold mb-6">Customer Support</h1>
            {/* Divider line under Customer Support */}
            <div className="w-16 h-[2px] bg-white mb-6"></div>

            <div className="flex flex-col gap-5">
              {/* Shop */}
              <Link href="/shop" className="hover:text-blue-600 transition-colors">
                Shop
              </Link>

              {/* Contact Us */}
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Contact Us
              </Link>

              {/* Return Policy */}
              <Link href="/return-policy" className="hover:text-blue-600 transition-colors">
                Return Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full lg:w-[50%]">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          {/* Divider line under Subscribe */}
          <div className="w-16 h-[2px] bg-white mb-4"></div>

          <p className="mb-8">Stay updated with the latest books and exclusive offers.</p>

          {/* Input field with Send icon */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-4 pr-12 py-2 rounded-md"
            />
            {/* Send Icon */}
            <button className="absolute right-2 top-2 text-blue-500 hover:text-blue-700">
              <FaPaperPlane size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <footer className="font-[0.875rem] text-white bg-[#036280] text-center py-6">
        <span>© All Copyright 2024 by UAIER.</span>
      </footer>
    </section>
  );
};

export default Footer;
