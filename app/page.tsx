import Image from "next/image";
import Link from "next/link";
import Hero from "./(home)/components/Hero";
import Testimoni from "./(home)/components/testimonal";
import FeatureCard from "@/components/FeatureCard";
import TopCategories from "./(home)/components/TopCategories";
import Members from "./(home)/components/Members";

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
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Book Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/path-to-book-cover.jpg"
              alt="Book Title"
              width={300}
              height={400}
              className="object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Book Title</h3>
              <p className="text-gray-700 mb-4">Author Name</p>
              <p className="text-gray-900 font-bold">$19.99</p>
            </div>
          </div>
          {/* Repeat Book Card for other featured books */}
        </div>
      </section>

     

      <Testimoni />
      <div className="bg-[#F5F5F5] px-4 sm:px-8 py-10">
      <Members />
      </div>
      
    </div>
  );
};

export default Home;
