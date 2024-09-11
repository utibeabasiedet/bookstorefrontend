// services/stateManager.ts
import { hookstate, useHookstate } from "@hookstate/core";
import React from "react";

// Define the interface for your state
interface CartItem {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

interface StateManager {
  cart: CartItem[];
  loginState: boolean; // Add login state to track if the user is logged in
}

// Initialize state with default values
const initialState: StateManager = {
  cart: [], // Default to empty cart
  loginState: false, // Default to logged out
};

// Create the global state using hookstate
const state = hookstate<StateManager>(initialState);

// Define and export the hook to access and update cart and login state
export default function useCartState() {
  const cartState = useHookstate(state);

  // Return the state manager to allow getting and updating the cart and login state
  return cartState;
}
