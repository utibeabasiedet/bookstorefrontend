"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import useCartState from "@/services/stateManager"; // Adjust the import path as needed
import Logo from '../public/img/logo/black-logo.svg';
import axios from "axios";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status
  const [cartItemCount, setCartItemCount] = useState<number>(0); // Track cart item count
  const cartState = useCartState();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fetch user login status and cart items
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("https://bookstore-1-ooja.onrender.com/api/users/login-status", {
          withCredentials: true, // Send cookies with the request
        });
        setIsLoggedIn(response.data.isLoggedIn); // Assuming the API returns { isLoggedIn: true/false }
        console.log(response.data.isLoggedIn)
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://bookstore-1-ooja.onrender.com/api/cart", {
          withCredentials: true, // Include cookies for authentication
        });
        setCartItemCount(response.data.length); // Update cart item count with the length of the items array
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    checkLoginStatus();
    fetchCartItems();
  }, [cartState.cart, cartState.loginState]); // Add `cartState.cart` as a dependency to update the cart count when it changes

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://bookstore-1-ooja.onrender.com/api/users/logout", {}, {
        withCredentials: true,  // Ensure that credentials are sent
      });
      console.log(response);
      setIsLoggedIn(false);  // Update login status on successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  return (
    <header className="h-[13vh] w-full px-[7%] flex justify-between z-50 items-center border-b-2">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image src={Logo} alt="Logo" width={150} height={50} />
        </Link>
      </div>

      {/* Menu Links - Hidden on mobile */}
      <nav className="hidden lg:flex space-x-6">
        {navLinks.map((link) => (
          <Link className="hover:text-[#02B68F] font-medium" key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right Section: Login/Logout & Cart */}
      <div className="flex items-center space-x-6">
        <Link href="/cart" className="relative">
          <FaShoppingCart size={24} />
          {/* Cart item count */}
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        </Link>

        {/* Conditionally render Login or Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="font-medium hover:text-[#02B68F]">
            Logout
          </button>
        ) : (
          <Link href="/login" className="font-medium hover:text-[#02B68F]">
            Login
          </Link>
        )}
      </div>

      {/* Hamburger Menu - Visible on mobile */}
      <div className="lg:hidden flex items-center">
        <div className="relative">
          <FaBarsStaggered
            onClick={toggleMenu}
            className={`transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
            style={{ position: "absolute" }}
            size={24}
          />
          <RxCross2
            onClick={toggleMenu}
            className={`transition-opacity duration-300 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ position: "absolute" }}
            size={24}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden z-50 bg-gray-50 text-black flex flex-col left-0 h-[77vh] w-[70vw] absolute top-[13vh] transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link className="py-2 border-b-2 text-center hover:text-[#02B68F]" key={link.label} href={link.href} onClick={toggleMenu}>
            {link.label}
          </Link>
        ))}
        {isLoggedIn ? (
          <button onClick={handleLogout}  className="py-2 border-b-2 text-center hover:text-[#02B68F]">
            Logout
          </button>
        ) : (
          <Link href="/login" className="py-2 border-b-2 text-center hover:text-[#02B68F]" onClick={toggleMenu}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
