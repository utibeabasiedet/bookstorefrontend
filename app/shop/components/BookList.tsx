"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useCartState from "@/services/stateManager";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const BookList = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("NGN");
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());
  const cartState = useCartState();

  useEffect(() => {
    const country = localStorage.getItem("selectedCountry") || "NGN";
    setSelectedCountry(country);

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-1-ooja.onrender.com/api/users/profile",
          { withCredentials: true }
        );
        setUserId(response.data._id);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-1-ooja.onrender.com/api/books"
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchUserProfile();
    fetchBooks();
  }, []);

  const addToCart = async (book: any) => {
    if (!userId) {
      alert("User ID not found. Cannot add to cart.");
      return;
    }

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
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCountry", country); // Store selected country in localStorage
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <label htmlFor="country" className="mr-2 font-semibold">
          Select Country:
        </label>
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

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          const price =
            selectedCountry === "NGN"
              ? book.prices.NGN
              : selectedCountry === "EU"
              ? book.prices.EU
              : selectedCountry === "UK"
              ? book.prices.UK
              : book.prices.US;

          return (
            <li
              key={book._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              {book.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">
                  {selectedCountry === "NGN" && `₦${book.prices.NGN}`}
                  {selectedCountry === "EU" && `€${book.prices.EU}`}
                  {selectedCountry === "UK" && `£${book.prices.UK}`}
                  {selectedCountry === "US" && `$${book.prices.US}`}
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < book.rating ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-gray-400" />
                      )}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      _id: book._id,
                      title: book.title,
                      price: price,
                      description: book.description,
                      imageUrl: book.imageUrl,
                    })
                  }
                  className={`mt-2 px-4 py-2 text-white font-semibold rounded-md transition-colors ${
                    addedBooks.has(book._id)
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {addedBooks.has(book._id) ? "View Cart" : "Add to Cart"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookList;
