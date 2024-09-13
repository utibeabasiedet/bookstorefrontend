import Image from "next/image";
import Link from "next/link";
import Hero from "./(home)/components/Hero";
import Testimoni from "./(home)/components/testimonal";
import FeatureCard from "@/components/FeatureCard";
import TopCategories from "./(home)/components/TopCategories";

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

      {/* About Us Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg mb-6">
            At Book Store, we are passionate about bringing you the best books
            from all genres. Our team of book enthusiasts carefully curates a
            selection of titles to ensure you have access to the most
            captivating reads.
          </p>
          <Link
            href="/about"
            className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition">
            Learn More
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-6">
            Have any questions or need assistance? Feel free to reach out to us
            through the contact form on our website or via email at
            support@bookstore.com.
          </p>
          <Link
            href="/contact"
            className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition">
            Get in Touch
          </Link>
        </div>
      </section>
      <Testimoni />
    </div>
  );
};

export default Home;
