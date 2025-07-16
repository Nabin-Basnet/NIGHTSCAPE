import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/Axios";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await AxiosInstance.get("/orders/");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  if (loading) return <div className="text-center mt-10">Loading orders...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">📦 All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders have been placed yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Order Date</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="py-2 px-4 border-b">#{order.id}</td>
                  <td className="py-2 px-4 border-b">
                    {order.user?.name || "N/A"} <br />
                    <span className="text-sm text-gray-500">{order.user?.email || ""}</span>
                  </td>
                  <td className="py-2 px-4 border-b">Rs. {order.total_amount}</td>
                  <td className="py-2 px-4 border-b capitalize">{order.status}</td>
                  <td className="py-2 px-4 border-b">
                    {order.order_date
                      ? new Date(order.order_date).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleViewDetail(order.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
