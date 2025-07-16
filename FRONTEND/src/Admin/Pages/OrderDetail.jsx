import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../Components/Axios";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const fetchOrderDetail = async () => {
    try {
      const res = await AxiosInstance.get(`/orders/${id}/`);
      setOrder(res.data);
    } catch (err) {
      console.error("Failed to load order:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading order...</div>;
  if (!order) return <div className="text-center mt-10 text-red-600">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">📦 Order #{order.id} Details</h1>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <p className="font-semibold">👤 Customer:</p>
          <p>{order.user?.name}</p>
          <p className="text-sm text-gray-500">{order.user?.email}</p>
        </div>

        <div>
          <p className="font-semibold">📍 Shipping Address:</p>
          {order.address ? (
            <p>
              {order.address.street}, {order.address.city}, {order.address.state} -{" "}
              {order.address.zip_code}, {order.address.country}
            </p>
          ) : (
            <p className="text-sm text-gray-500">No address available</p>
          )}
        </div>

        <div>
          <p className="font-semibold">🗓️ Order Date:</p>
          <p>{new Date(order.order_date).toLocaleString()}</p>
        </div>

        {order.delivery_date && (
          <div>
            <p className="font-semibold">🚚 Delivery Date:</p>
            <p>{new Date(order.delivery_date).toLocaleString()}</p>
          </div>
        )}

        <div>
          <p className="font-semibold">💬 Notes:</p>
          <p>{order.notes || "No additional notes"}</p>
        </div>

        <div>
          <p className="font-semibold mb-2">🛒 Order Items:</p>
          <ul className="list-disc ml-6 space-y-1">
            {order.items?.map((item, index) => (
              <li key={index}>
                {item.quantity} x {item.product.name} (Rs. {item.product.price} each)
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold">💰 Total Amount:</p>
          <p>Rs. {order.total_amount}</p>
        </div>

        <div>
          <p className="font-semibold">📌 Status:</p>
          <p className="capitalize">{order.status}</p>
        </div>
      </div>
    </div>
  );
}
