import Image from "next/image";
import heroImage from "../../../public/img/about.jpg";
import Link from "next/link";

const AboutHero = () => {
  return (
    <section className="pt-[68px] padding-x aboutBackground overflow-hidden pb-0 sm:pb-10">
      <div className="flex flex-col px-8 max-w-[1150px] mx-auto lg:items-start lg:flex-row justify-between items-center">
        <div className="lg:w-[50%]">
          <div className="mb-10">WHO WE ARE</div>
          <div className="md:max-w-[500px] mb-10 max-w-[273px] leading-[1] text-primary md:text-[38px] text-[36px] tracking-[] font-bold">
          Celebrate Akwa Ibom's Literary Treasures!
          </div>
          <div className="mb-10 max-w-full mt-0 text-primary-2101">
          At our store, we're passionate about sharing the vibrant stories and rich traditions of Akwa Ibom with book lovers around the world. Our mission is to make these unique books accessible globally, fostering a deeper appreciation for Akwa Ibom's diverse cultures and histories. From local folklore to contemporary works, explore our collection and join us in connecting people through literature and cultural exchange.


          </div>
          <div>
            <Link href="/signup" passHref>
              <button className="bg-[#fd7e14] hover:bg-[#f76707] text-white font-semibold py-3 px-8 rounded-[8px] transition-transform duration-300 hover:scale-105 shadow-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        {/* Right hero */}
        <div className="relative lg:w-[50%] mt-12 md:mt-0">
          <div className="relative">
            <div className="absolute -top-[400px] -right-40 -z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={1200}
                height={1246}
                viewBox="0 0 1511 1246"
                fill="none"
              >
                <g opacity={0.8} filter="url(#filter0_f_5346_23209)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M727.119 524.678C812.815 521.709 904.523 484.311 972.115 507.597C1039.03 530.651 1001.99 578.112 989.316 615.007C979.078 644.796 953.309 671.658 907.956 694.289C858.62 718.908 801.752 744.025 727.119 745.845C649.651 747.733 566.613 732.331 524.982 703.627C487.328 677.665 538.548 645.769 537.359 615.007C536.125 583.108 468.709 546.797 518.008 523.33C567.103 499.96 654.875 527.181 727.119 524.678Z"
                    fill="#075DED"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_5346_23209"
                    x={0}
                    y={0}
                    width={1511}
                    height={1246}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation={250}
                      result="effect1_foregroundBlur_5346_23209"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <Image
              priority={true}
              src={heroImage}
              height={617}
              width={563}
              alt="hero"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
