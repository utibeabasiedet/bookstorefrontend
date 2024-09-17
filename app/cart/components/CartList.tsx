'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import useCartState from "@/services/stateManager";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(() => import("react-paystack").then((mod) => mod.PaystackButton), { ssr: false });

interface PaystackReference {
  reference: string;
  amount: number;
  email: string;
}

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

const CartList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("NGN");

  const cartState = useCartState();

  useEffect(() => {
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
        const response = await axios.get("https://bookstore-1-ooja.onrender.com/api/cart", { withCredentials: true });
        const items: CartItem[] = Array.isArray(response.data) ? response.data : [];
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
        const response = await axios.get("https://bookstore-1-ooja.onrender.com/api/users/profile", { withCredentials: true });
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user information.");
      }
    };

    fetchUserProfile();
  }, []);

  const calculateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => {
      const price =
        selectedCurrency === "NGN"
          ? item.price
          : selectedCurrency === "EU"
          ? item.price
          : selectedCurrency === "UK"
          ? item.price
          : item.price;
      return sum + price;
    }, 0);

    setTotalPrice(total);
  };

  const removeFromCart = async (bookId: string) => {
    try {
      const response = await axios.delete(`https://bookstore-1-ooja.onrender.com/api/cart/delete/${bookId}`, { withCredentials: true });
      const updatedCartItems: CartItem[] = Array.isArray(response.data) ? response.data : [];
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);

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
    currency: selectedCurrency,
    onSuccess: async (reference: PaystackReference) => {
      console.log("Payment successful:", reference);
      try {
        await axios.post("https://bookstore-1-ooja.onrender.com/api/mymail/send-receipt", {
          email: userEmail,
          amount: totalPrice * 100,
          reference: reference.reference,
        });
        toast.success("Payment successful! A receipt has been sent to your email.");
      } catch (error) {
        console.error("Error sending receipt email:", error);
        toast.error("Payment was successful, but we couldn't send the receipt.");
      }
    },
    onClose: () => {
      toast("Payment process was canceled.");
    },
  };

  const getBookPrice = (book: CartItem) => {
    return selectedCurrency === "NGN"
      ? book.price
      : selectedCurrency === "EU"
      ? book.price
      : selectedCurrency === "UK"
      ? book.price
      : book.price;
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
                <li key={book._id} className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    {book.image && (
                      <Image src={book.image} alt={book.title} width={80} height={100} className="rounded-md" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-md font-bold">
                        {selectedCurrency === "NGN" && `₦${getBookPrice(book).toFixed(2)}`}
                        {selectedCurrency === "EU" && `€${getBookPrice(book).toFixed(2)}`}
                        {selectedCurrency === "UK" && `£${getBookPrice(book).toFixed(2)}`}
                        {selectedCurrency === "US" && `$${getBookPrice(book).toFixed(2)}`}
                      </p>
                      <p className="text-sm">{book.description}</p>
                    </div>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => removeFromCart(book._id)}
                  >
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <div className="lg:w-1/4">
        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">Total Price:</p>
          <p className="text-2xl font-bold">
            {selectedCurrency === "NGN" && `₦${totalPrice.toFixed(2)}`}
            {selectedCurrency === "EU" && `€${totalPrice.toFixed(2)}`}
            {selectedCurrency === "UK" && `£${totalPrice.toFixed(2)}`}
            {selectedCurrency === "US" && `$${totalPrice.toFixed(2)}`}
          </p>
          <PaystackButton {...paystackConfig} />
        </div>
      </div>
    </div>
  );
};

export default CartList;
