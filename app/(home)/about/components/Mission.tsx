import Image from "next/image";
// import phoneGroup from "../../../../public/assets/images/home/contactframe.png";

const Mission = () => {
  return (
    <section className="flex  bg-white flex-col lg:flex-row  ">
      <div className="lg:w-[50%] w-[100%]  pt-[50px] lg:pt-[86px] px-4 lg:pl-[90px] lg:pr-[80px] ">
        <div className="mb-10 w-full ">
          <h2 className="text-primary text-[24px] font-medium mb-6">
            Our Mission
          </h2>
          <p className="text-[#808184] text-[16px]">
            Our mission is to empower individuals, one person at time to foster
            a deep deeper understanding and appreciation for our language and
            heritage, thus contributing to the global pursuit of cultural
            diversity, linguistic sustainability, and inclusive education.
          </p>
        </div>
        <div className="mb-10 w-full">
          <h2 className="text-primary text-[24px] mb-6 font-medium">
            Our Vision
          </h2>
          <p className="text-[#808184] text-[16px]">
            We envision a world where our language, our customs, our food and
            our people are celebrated globally. That starts with us and with the
            most foundational aspect of culture - language.
          </p>
        </div>
       
      </div>
      <div className="bg-primary lg:w-[50%] pt-12 md:pt-[82px] px-[25px] sm:px-[40px] 2xl:px-[80px]   flex justify-center items-center">
      <div className="mb-[52px]  lg:mb-[79px] w-full">
          <h2 className="text-primary text-[24px] mb-6 font-medium">Values</h2>
          <p className="text-[#808184] text-[16px]">
            Empowerment: We value the empowerment of individuals, recognizing
            that every person has the potential to contribute to the
            preservation and promotion of the Akwa Ibom culture. Cultural
            Appreciation: We prioritize fostering a deeper understanding and
            appreciation for our language and heritage, promoting pride and
            respect for Akwa Ibom's rich cultural traditions. Diversity: We
            celebrate cultural diversity and recognize its importance in
            enriching communities. Through our efforts, we aim to promote
            inclusivity and respect for all cultural backgrounds. Education for
            Sustainability: We believe in the transformative power of education
            to sustain languages, cultures, and traditions. By advocating for
            inclusive education, we contribute to the global pursuit of
            linguistic sustainability and cultural preservation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
