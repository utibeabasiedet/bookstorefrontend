"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import useCartState from "@/services/stateManager";

const ProductPage = () => {
  const [book, setBook] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("NGN");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Manage loading state
  const cartState = useCartState();
  const navigation = useRouter();
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    const country = localStorage.getItem("selectedCountry") || "NGN";
    setSelectedCountry(country);
    console.log(id)

    if (id) {
      const fetchBook = async () => {
        try {
          setIsLoading(true); // Set loading before fetching
          const response = await axios.get(
            `https://bookstore-1-ooja.onrender.com/api/books/books/${id}`
          );
          setBook(response.data);
        } catch (error) {
          console.error("Failed to fetch book details:", error);
        } finally {
          setIsLoading(false); // Stop loading after fetch
        }
      };

      fetchBook();
    }
  }, [id]);

  const proceedToCart = async () => {
    if (!book) return;

    try {
      const cartItem = {
        _id: book._id,
        title: book.title,
        price: book.prices[selectedCountry],
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
        cartState.cart.set((prevCart: any) => [...prevCart, response.data]);
        navigation.push("/cart"); // Automatically navigate to the cart
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading indicator while fetching data
  }

  if (!book) {
    return <div>Book not found.</div>; // Fallback in case book is not fetched
  }

  // Calculate price based on selected country
  const price =
    selectedCountry === "NGN"
      ? book.prices.NGN
      : selectedCountry === "EU"
      ? book.prices.EU
      : selectedCountry === "UK"
      ? book.prices.UK
      : book.prices.US;

  return (
    <div className="container mx-auto px-4 sm:px-16 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Book Image */}
        <div className="w-full lg:w-1/2">
          {book.imageUrl && (
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          )}
        </div>

        {/* Book Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <p className="mt-4 text-lg text-gray-700">{book.description}</p>

          <div className="mt-4">
            <span className="text-orange-600 font-bold text-2xl">
              {selectedCountry === "NGN" && `₦${book.prices.NGN}`}
              {selectedCountry === "EU" && `€${book.prices.EU}`}
              {selectedCountry === "UK" && `£${book.prices.UK}`}
              {selectedCountry === "US" && `$${book.prices.US}`}
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex mt-4 space-x-1 text-orange-600">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < book.rating ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          </div>

          {/* Proceed to Cart Button (No Add to Cart Button) */}
          <Link
           href='/cart'
           
            className="mt-6 w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all"
          >
            Proceed to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
