import React from "react";
import CartList from "./components/CartList";

const page = () => {
  return (
    <section>
      <div className="bg-[#D0E1E7] flex justify-center items-center h-[50vh]">
        <div>
          {/* <h1 className="text-center">Our Shop</h1> */}
          <h1 className="text-center text-2xl font-bold">Shopping Cart</h1>
        </div>
      </div>
      <div className="px-10"> <CartList/> </div>
    </section>
  );
};

export default page;
