import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.order) {
    return (
      <div className="text-center mt-20">
        <h2>No order data found.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { id, total_amount, order_date, status } = state.order;

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
      <p><strong>Order ID:</strong> {id}</p>
      <p><strong>Total Amount:</strong> Rs. {total_amount}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Order Date:</strong> {order_date}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSummary;
