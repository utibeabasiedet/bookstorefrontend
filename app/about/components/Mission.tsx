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
            Our mission to ease the pressures of electricity users by enhancing
            the process of paying for utilities in today's busy society.
          </p>
        </div>
        <div className="mb-10 w-full">
          <h2 className="text-primary text-[24px] mb-6 font-medium">
            What We DO
          </h2>
          <p className="text-[#808184] text-[16px]">
            We go all out to ensure we deliver good service to our customers who
            depend on our platform for ease of payment. We go the distance to
            minimize service downtime so that our service is minimally
            interrupted thus ensuring your access to the platform is also
            uninterrupted.
          </p>
        </div>
        <div className="mb-[52px]  lg:mb-[79px] w-full">
          <h2 className="text-primary text-[24px] mb-6 font-medium">
            How We DO It
          </h2>
          <p className="text-[#808184] text-[16px]">
            MyRecharge.ng understands the value of time and wants to minimize
            time spent in paying and obtaining recharge token. This we’ve do by
            incorporating tools and features to ensure that your token is
            generated and made available within 60 seconds.
          </p>
        </div>
      </div>
      <div className="bg-primary lg:w-[50%] pt-12 md:pt-[82px] px-[25px] sm:px-[40px] 2xl:px-[80px]   flex justify-center items-center">
        {/* <Image src={phoneGroup} className="bg-blac" alt="phone" /> */}
        image
      </div>
    </section>
  );
};

export default Mission;
