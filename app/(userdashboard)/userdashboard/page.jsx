"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const UserOrdersTable = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile and orders
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await axios.get(
          "https://bookstore-1-ooja.onrender.com/api/users/profile",
          { withCredentials: true } // Enable sending cookies with the request
        );
        const userId = profileResponse.data._id;

        // Fetch user's orders
        const ordersResponse = await axios.get(
          `https://bookstore-1-ooja.onrender.com/api/myorder/${userId}`,
          { withCredentials: true } // Enable sending cookies with the request
        );
        setUser(profileResponse.data);
        setOrders(ordersResponse.data);
        console.log(ordersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Total Price</th>
            <th className="py-2 px-4 border">Book Name</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border">{order._id}</td>
              <td className="py-2 px-4 border">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {order.totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td className="py-2 px-4 border">
                {order.orderItems.map((or) => (
                  <div key={or._id}>{or.title}</div> // Use a valid structure with a unique key
                ))}
              </td>
              <td className="py-2 px-4 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrdersTable;
