"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const UserOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState({});

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await axios.get(
          "https://bookstore-1-ooja.onrender.com/api/myorder",
          { withCredentials: true }
        );
        setOrders(ordersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newStatus,
    }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const newStatus = selectedStatuses[orderId]; // Get the selected status
      if (!newStatus) return;

      console.log("Sending request to update status for order ID:", orderId);
      console.log(`https://bookstore-1-ooja.onrender.com/api/myorder/${orderId}/status`)

      const response = await axios.put(
        `https://bookstore-1-ooja.onrender.com/api/myorder/${orderId}/status`,
        { orderId, status: newStatus }, // Request body
        { withCredentials: true }
      );

      console.log("Response from server:", response.data);

      // Update local state to reflect the status change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      // Optionally, reset selected status for this order after updating
      setSelectedStatuses((prevStatuses) => ({
        ...prevStatuses,
        [orderId]: null, // Clear the selected status
      }));

    } catch (error) {
      console.error("Error updating order status:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>
      <Table>
        <TableCaption>Your recent orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Books</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {order.totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      {item.title} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <select
                  value={selectedStatuses[order._id] || order.status} // Show selected or current status
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => updateOrderStatus(order._id)}
                >
                  Update Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserOrdersTable;
