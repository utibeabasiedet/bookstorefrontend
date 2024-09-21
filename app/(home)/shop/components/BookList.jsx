"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import useCartState from "@/services/stateManager";
import { toast } from "react-hot-toast";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loadingItemId, setLoadingItemId] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("NGN");
  const [cartItems, setCartItems] = useState([]); // Store cart items from backend
  const router = useRouter();

  const cartState = useCartState();

  useEffect(() => {
    const country = localStorage.getItem("selectedCountry") || "NGN";
    setSelectedCountry(country);

    // Fetch user profile and cart items from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-1-ooja.onrender.com/api/users/profile",
          { withCredentials: true }
        );
        setUserId(response.data._id);

        // Fetch cart items once userId is available
        fetchCartItems(response.data._id);
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

    const fetchCartItems = async userId => {
      try {
        const response = await axios.get(
          `https://bookstore-1-ooja.onrender.com/api/cart/${userId}`,
          { withCredentials: true }
        );
        setCartItems(response.data); // Store cart items in state
        cartState.cart.set(response.data); // Sync with global cart state
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchUserProfile();
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-1-ooja.onrender.com/api/cart",
          {
            withCredentials: true,
          }
        );
        const items = Array.isArray(response.data) ? response.data : [];
        setCartItems(items);

       

        calculateTotalPrice(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
       
      }
    };

    fetchCartItems();
  }, [cartState.cart]);

  const Loader = () => (
    <div className="flex justify-center items-center h-4">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-8 h-8 rounded-full"></div>
    </div>
  );

  const handleCountryChange = event => {
    const country = event.target.value;
    setSelectedCountry(country);
    localStorage.setItem("selectedCountry", country);
  };

  const handleViewDetails = bookId => {
    router.push(`/shop/${bookId}`);
  };

  const addToCart = async book => {
    setLoadingItemId(book._id);
    if (!userId) {
      toast.error("User ID not found. Cannot add to cart.");
      return;
    }

    const price =
      selectedCountry === "NGN"
        ? book.prices?.NGN || 0
        : selectedCountry === "EU"
        ? book.prices?.EU || 0
        : selectedCountry === "UK"
        ? book.prices?.UK || 0
        : book.prices?.US || 0;

    try {
      const cartItem = {
        _id: book._id,
        title: book.title,
        price: price,
        image: book.imageUrl,
        description: book.description || "",
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
        setCartItems(prevItems => [...prevItems, cartItem]);
        cartState.cart.set(prevCart => [...prevCart, cartItem]);
        toast.success(`${book.title} added to cart!`);
        setLoadingItemId(false); // Clear loading state
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("An error occurred while adding the item to the cart.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <label htmlFor="currency" className="font-bold text-gray-700">
          Select Currency:
        </label>
        <select
          id="currency"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="ml-2 p-2 border border-gray-300 rounded">
          <option value="NGN">NGN</option>
          <option value="EU">EU</option>
          <option value="UK">UK</option>
          <option value="US">US</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => {
          const price =
            selectedCountry === "NGN"
              ? book.prices?.NGN || 0
              : selectedCountry === "EU"
              ? book.prices?.EU || 0
              : selectedCountry === "UK"
              ? book.prices?.UK || 0
              : book.prices?.US || 0;

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
                    {selectedCountry === "NGN" && `₦${price}`}
                    {selectedCountry === "EU" && `€${price}`}
                    {selectedCountry === "UK" && `£${price}`}
                    {selectedCountry === "US" && `$${price}`}
                  </p>
                  <ul className="flex mt-2 space-x-1 text-orange-600">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        {i < book.rating ? <FaStar /> : <FaRegStar />}
                      </li>
                    ))}
                  </ul>

                  {/* <button
                    onClick={() =>
                      cartItems.some((item) => item._id === book._id)
                        ? handleViewDetails(book._id)
                        : addToCart(book)
                    }
                    className={`flex justify-center mt-4 items-center rounded-full font-bold py-4 px-4 w-full transition-all duration-300 ${
                      cartItems.some((item) => item._id === book._id)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-[#d0e1e7] hover:bg-orange-600 hover:text-white"
                    }`}
                  >
                    {cartItems.some((item) => item._id === book._id)
                      ? "View Details"
                      : "Add to Cart"}
                  </button> */}

                  <button
                    onClick={() =>
                      cartItems.some(item => item._id === book._id)
                        ? handleViewDetails(book._id)
                        : addToCart(book)
                    }
                    className={`flex justify-center items-center mt-4 rounded-full font-bold py-4 px-4 w-full transition-all duration-300 ${
                      cartItems.some(item => item._id === book._id)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-[#d0e1e7] hover:bg-orange-600 hover:text-white"
                    }`}
                    disabled={loadingItemId === book._id} // Disable button while loading
                  >
                    {loadingItemId === book._id ? (
                      <Loader /> // Show loader when loading
                    ) : cartItems.some(item => item._id === book._id) ? (
                      "View Details"
                    ) : (
                      "Add to Cart"
                    )}
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
