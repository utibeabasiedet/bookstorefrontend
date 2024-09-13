import Image from "next/image";
import Link from "next/link";
import Hero from "./(home)/components/Hero";
import Testimoni from "./(home)/components/testimonal";
import FeatureCard from "@/components/FeatureCard";
import TopCategories from "./(home)/components/TopCategories";
import Members from "./(home)/components/Members";
import CategoriesCard from "./(home)/components/CategoriesCard";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* real hero */}
      <Hero />
      <FeatureCard />
      <div className="bg-[#D0E1E7] px-8 py-16">
        <TopCategories />
      </div>

      {/* Featured Books Section */}
      <section>
      <CategoriesCard />
      </section>

     
      <div className="bg-[#F5F5F5] px-4 sm:px-8 py-10">
      <Testimoni />
      </div>
      <div className="bg-[#F5F5F5] px-4 sm:px-8 py-10">
      <Members />
      </div>
      
    </div>
  );
};

export default Home;
