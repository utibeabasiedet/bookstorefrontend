"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // import useRouter from Next.js
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const BookList = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("NGN");
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());
  const router = useRouter(); // use the router for navigation

  useEffect(() => {
    // Load the country and added books from localStorage
    const country = localStorage.getItem("selectedCountry") || "NGN";
    setSelectedCountry(country);

    const storedAddedBooks = localStorage.getItem("addedBooks");
    if (storedAddedBooks) {
      setAddedBooks(new Set(JSON.parse(storedAddedBooks)));
    }

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

  const handleViewDetails = (bookId: string) => {
    router.push(`/shop/${bookId}`); // Navigate to the dynamic product details page
  };

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
        const newAddedBooks = new Set([...addedBooks, book._id]);
        setAddedBooks(newAddedBooks);

        // Save the added books to localStorage
        localStorage.setItem("addedBooks", JSON.stringify([...newAddedBooks]));
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
            <li key={book._id} className="p-4">
              <div className="rounded-lg overflow-hidden transition-shadow duration-300">
                {book.imageUrl && (
                  <div className="relative w-full bg-[#f5f5f5] flex justify-center items-center mx-auto h-64">
                    <a
                      href="#"
                      className="w-[90%] justify-center items-center flex mx-auto">
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
                )}
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {book.title}
                  </h3>
                  <p className="mb-2 text-orange-600 font-bold">
                    {selectedCountry === "NGN" && `₦${book.prices.NGN}`}
                    {selectedCountry === "EU" && `€${book.prices.EU}`}
                    {selectedCountry === "UK" && `£${book.prices.UK}`}
                    {selectedCountry === "US" && `$${book.prices.US}`}
                  </p>
                  {/* Rating */}
                  <ul className="flex mt-2 space-x-1 text-orange-600">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        {i < book.rating ? <FaStar /> : <FaRegStar />}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      addedBooks.has(book._id)
                        ? handleViewDetails(book._id) // View details if book is added to cart
                        : addToCart(book) // Add to cart otherwise
                    }
                    className={`flex justify-center mt-4 items-center rounded-full font-bold py-4 px-4 w-full transition-all duration-300 ${
                      addedBooks.has(book._id)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-[#d0e1e7] hover:bg-orange-600 hover:text-white"
                    }`}>
                    {addedBooks.has(book._id) ? "View Details" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookList;
