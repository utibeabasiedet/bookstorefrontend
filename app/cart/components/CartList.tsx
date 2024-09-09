"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import useCartState from "@/services/stateManager";
// import { PaystackButton } from "react-paystack";

const CartList = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0); // State to store total price
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const cartState = useCartState(); // Assuming you're managing state globally

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://bookstore-1-ooja.onrender.com/api/cart", {
          withCredentials: true, // Include cookies for authentication
        });
        const items = Array.isArray(response.data) ? response.data : []; // Ensure array response
        setCartItems(items); // Set the fetched cart items
        calculateTotalPrice(items); // Calculate the total price
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [cartState.cart]); // Re-fetch whenever cart state changes

  const calculateTotalPrice = (items: any[]) => {
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0); // Handle case where item price is missing
    setTotalPrice(total);
  };

  const removeFromCart = async (bookId: string) => {
    try {
      const response = await axios.delete(`https://bookstore-1-ooja.onrender.com/api/cart/delete/${bookId}`, {
        withCredentials: true,
      });
      const updatedCartItems = Array.isArray(response.data) ? response.data : [];
      setCartItems(updatedCartItems); // Update cart items after deletion
      calculateTotalPrice(updatedCartItems); // Recalculate the total price
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  // Paystack configuration (uncomment once PaystackButton is used)
  // const paystackConfig = {
  //   reference: new Date().getTime().toString(),
  //   email: 'utibeabasiedetarget252@gmail.com', // Replace with the customer's email
  //   amount: totalPrice * 100, // Amount in kobo
  //   publicKey: 'pk_test_11f2b33c4435c39bba26d6ba87946a3f26f0d86e', // Your Paystack public key
  // };

  const handleSuccess = (reference: string) => {
    console.log('Payment successful:', reference);
    // Handle successful payment here
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:space-x-8 space-y-4 lg:space-y-0">
      {/* Left Section: Cart Items */}
      <div className="flex-1">
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
                <li key={book._id} className="flex items-center justify-between bg-white p-4 shadow-md rounded-md">
                  <div className="flex items-center space-x-4">
                    {book.image && (
                      <Image src={book.image} alt={book.title} width={80} height={100} className="rounded-md" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.description}</p>
                      <p className="text-md font-bold">${book.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(book._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Right Section: Total Price & Checkout */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total Price:</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        {/* Uncomment for Paystack Integration */}
        {/* <PaystackButton
          {...paystackConfig}
          text="Proceed to Checkout"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
          onSuccess={handleSuccess}
        /> */}
      </div>
    </div>
  );
};

export default CartList;
