"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import useCartState from "@/services/stateManager";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic"; // Import dynamic to load Paystack on the client side

// Dynamically import PaystackButton to only load it on the client side
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

const CartList = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("NGN");

  const cartState = useCartState();

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      const storedCurrency = localStorage.getItem("selectedCountry") || "NGN";
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);
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
        setError("Failed to load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [cartState.cart]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-1-ooja.onrender.com/api/users/profile",
          {
            withCredentials: true,
          }
        );
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user information.");
      }
    };

    fetchUserProfile();
  }, []);

  const calculateTotalPrice = (items: any[]) => {
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    setTotalPrice(total);
  };

  const removeFromCart = async (bookId: string) => {
    try {
      const response = await axios.delete(
        `https://bookstore-1-ooja.onrender.com/api/cart/delete/${bookId}`,
        {
          withCredentials: true,
        }
      );
      const updatedCartItems = Array.isArray(response.data) ? response.data : [];
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
  
      // Remove the book from the addedBooks set in BookList
      const storedAddedBooks = JSON.parse(localStorage.getItem("addedBooks") || "[]");
      const newAddedBooks = storedAddedBooks.filter((id: string) => id !== bookId);
      localStorage.setItem("addedBooks", JSON.stringify(newAddedBooks));
  
      cartState.cart.set(updatedCartItems);
      toast.success("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item. Please try again.");
      toast.error("Failed to remove item.");
    }
  };
  

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: totalPrice * 100,
    publicKey: "pk_test_11f2b33c4435c39bba26d6ba87946a3f26f0d86e",
    currency: selectedCurrency, // Set currency dynamically
    onSuccess: (reference: any) => {
      console.log("Payment successful:", reference);
      toast.success("Payment successful! Thank you for your purchase.");
    },
    onClose: () => {
      toast("Payment process was canceled.");
    },
  };

  return (
    <div className="flex flex-col lg:flex-row p-2 lg:space-x-8 space-y-4 lg:space-y-0">
      <div className="flex-1">
        <Toaster position="top-right" reverseOrder={false} />
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {loading ? (
          <p>Loading cart items...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((book) => (
                <li
                  key={book._id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl"
                >
                  <div className="flex items-center space-x-4">
                    {book.image && (
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={80}
                        height={100}
                        className="rounded-md"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.description}</p>
                      <p className="text-md font-bold">${book.price.toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(book._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="w-full lg:w-1/3 bg-gray-100 p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total Price:</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>

        {PaystackButton && (
          <PaystackButton
            {...paystackConfig}
            text="Proceed to Checkout"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
          />
        )}
      </div>
    </div>
  );
};

export default CartList;
