'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi'; // Import the copy icon

const UserOrdersTable = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null); // Track the copied order ID

  // Fetch user profile and orders
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileResponse = await axios.get(
          'https://bookstore-1-ooja.onrender.com/api/users/profile',
          { withCredentials: true } // Enable sending cookies with the request
        );
        const userId = profileResponse.data._id;

        const ordersResponse = await axios.get(
          `https://bookstore-1-ooja.onrender.com/api/myorder/${userId}`,
          { withCredentials: true } // Enable sending cookies with the request
        );
        setUser(profileResponse.data);
        setOrders(ordersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Function to apply color based on order status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-500';
      case 'cancelled':
        return 'text-red-500';
      case 'delivered':
        return 'text-green-500';
      case 'shipped':
        return 'text-blue-500';
      default:
        return '';
    }
  };

  // Function to handle copying Order ID
  const handleCopy = (orderId) => {
    navigator.clipboard.writeText(orderId);
    setCopied(orderId); // Set the copied ID to show feedback
    setTimeout(() => setCopied(null), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="overflow-x-auto"> {/* Make the table horizontally scrollable */}
        <table className="min-w-full bg-white border">
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
                <td className="py-2 px-4 border flex items-center space-x-2">
                  <span>{order._id.slice(0, 6)}...</span> {/* Display first 6 characters */}
                  <FiCopy
                    className="cursor-pointer text-gray-500"
                    title="Copy Order ID"
                    onClick={() => handleCopy(order._id)} // Copy full Order ID
                  />
                  {copied === order._id && (
                    <span className="text-green-500 text-sm ml-2">Copied!</span>
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  ₦{order.totalPrice.toLocaleString('en-US')} {/* Use Naira sign */}
                </td>
                <td className="py-2 px-4 border">
                  {order.orderItems.map((or) => (
                    <div key={or._id}>{or.title}</div> // Ensure a unique key for each item
                  ))}
                </td>
                <td className={`py-2 px-4 border ${getStatusColor(order.status)}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrdersTable;
