import React from 'react'
import BookList from './components/BookList'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faPhone,
  faChevronRight,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"; 

const page = () => {
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
            <h1 className="text-4xl font-bold">Our Shop</h1>

            {/* Breadcrumb */}
            <div className="page-header mt-4">
              <ul className="breadcrumb-items flex items-center justify-center space-x-2">
                <li>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-gray-500"
                  />
                </li>
                <li className="text-gray-600"> Shop Default</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='px-10'>
            <BookList/>
        </div>
    </section>
  )
}

export default page
