"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaRegStar, FaShoppingBasket } from "react-icons/fa";
import axios from "axios";
import useCartState from "@/services/stateManager"; // Assuming you have a Hookstate store for managing cart

const CategoriesCard = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("NGN");
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());
  const cartState = useCartState();

  useEffect(() => {
    const country = localStorage.getItem("selectedCountry") || "NGN";
    setSelectedCountry(country);

    const fetchTopBooks = async () => {
      try {
        const response = await axios.get("https://bookstore-1-ooja.onrender.com/api/books?limit=4");
        setBooks(response.data.slice(0, 4)); // Limit the books to 4
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchTopBooks();
  }, []);

  const addToCart = async (book: any) => {
    try {
      const cartItem = {
        _id: book._id,
        title: book.title,
        price: book.price,
        image: book.imageUrl,
      };

      const response = await axios.post(
        "https://bookstore-1-ooja.onrender.com/api/cart/add",
        { item: cartItem },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setAddedBooks(new Set([...addedBooks, book._id]));
        cartState.cart.set((prevCart: any) => [...prevCart, response.data]);
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCountry", country);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Country Selection */}
      <div className="mb-8 text-center">
        <label htmlFor="country" className="mr-2 font-semibold">Select Country:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="NGN">Nigeria</option>
          <option value="EU">Europe</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.slice(0, 4).map((book) => {  // Use slice to limit to 4 items
          const price = selectedCountry === "NGN"
            ? book.prices.NGN
            : selectedCountry === "EU"
            ? book.prices.EU
            : selectedCountry === "UK"
            ? book.prices.UK
            : book.prices.US;

          return (
            <div key={book._id} className="p-4">
              <div className="rounded-lg overflow-hidden transition-shadow duration-300">
                {/* Book Thumbnail */}
                <div className="relative w-full bg-[#f5f5f5] flex justify-center items-center mx-auto h-64">
                  <a href="shop-details-2.html" className="w-[90%] justify-center items-center flex mx-auto">
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      width={100}
                      height={100}
                      objectFit="cover"
                      className="hover:scale-105 transition-transform w-[70%] h-[200px] duration-300"
                    />
                  </a>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h5 className="text-gray-700 text-sm font-semibold">{book.category}</h5>
                  <h3 className="text-lg font-bold text-gray-900">
                    <a href="shop-details.html">{book.title}</a>
                  </h3>

                  {/* Price */}
                  <ul className="mt-2">
                    <li className="text-orange-600 font-bold">{price}</li>
                  </ul>

                  {/* Rating */}
                  <ul className="flex mt-2 space-x-1 text-orange-600">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        {i < book.rating ? <FaStar /> : <FaRegStar />}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to Cart Button */}
                <div className="bg-gray-50">
                  <button
                    onClick={() =>
                      addToCart({
                        _id: book._id,
                        title: book.title,
                        price: price,
                        imageUrl: book.imageUrl,
                      })
                    }
                    className={`flex justify-center items-center rounded-full bg-[#d0e1e7] font-bold hover:bg-orange-600 hover:text-white text-[#036280] py-4 px-4 w-full transition-all duration-300`}
                  >
                    <FaShoppingBasket className="mr-2 w-[25px]" />
                    {addedBooks.has(book._id) ? "View Cart" : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesCard;
