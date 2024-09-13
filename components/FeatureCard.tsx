import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const FeatureCard = () => {
  return (
    <section className="px-4 bg-[#fff]  sm:px-20 py-14">
      <div className="px-4 bg-[#D0E1E7] py-10 flex flex-col lg:flex-row  justify-between rounded-2xl items-center sm:px-8">
        <div className="bg-[#D0E1E7] flex gap-4 p-4 rounded-lg">
          {/* Icon */}
          <div className="mt-4">
            <div className="text-[#055160] w-[60px] relative">
              <FontAwesomeIcon icon={faBook} className="text-xl" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#052c65]">
              Storybooks
              </h3>
              <p className="text-md text-gray-600">
              Explore Akwa Ibom Stories.


              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#D0E1E7] flex gap-4 p-4 rounded-lg">
          {/* Icon */}
          <div className="mt-4">
            <div className="text-[#055160] w-[60px] relative">
              <FontAwesomeIcon icon={faBook} className="text-xl" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#052c65]">
              Flashcards
              </h3>
              <p className="text-md text-gray-600">
              Interactive Learning Cards
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#D0E1E7] flex gap-4 p-4 rounded-lg">
          {/* Icon */}
          <div className="mt-4">
            <div className="text-[#055160] w-[60px] relative">
              <FontAwesomeIcon icon={faBook} className="text-xl" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#052c65]">
              Online Classes
              </h3>
              <p className="text-md text-gray-600">
              Always online 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
