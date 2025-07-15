import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../Components/Axios";

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await AxiosInstance.get("/carts/");
        setCartItems(res.data);
      } catch {
        alert("Failed to load cart items.");
      }
    };

    const fetchAddresses = async () => {
      try {
        const res = await AxiosInstance.get("/addresses/");
        setAddresses(res.data);
        if (res.data.length > 0) setSelectedAddress(res.data[0].id);
      } catch {
        alert("Failed to load addresses.");
      }
    };

    Promise.all([fetchCart(), fetchAddresses()]).finally(() => setLoading(false));
  }, []);

  const handleCashPayment = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    try {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const orderItems = cartItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      }));

      const orderData = {
        address_id: selectedAddress,  // Correct key for backend
        notes,
        items: orderItems,
        total_amount: totalAmount,
      };

      const res = await AxiosInstance.post("/orders/", orderData);
      const order = res.data;

      await AxiosInstance.delete("/carts-clear/"); // Ensure this API exists

      navigate("/order-summary", { state: { order } });
    } catch (error) {
      if (error.response && error.response.data) {
        const messages = Object.entries(error.response.data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
          .join("\n");
        alert("Could not place your order:\n" + messages);
      } else {
        alert("Could not place your order. Please try again.");
      }
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded shadow space-y-6">
      <h1 className="text-2xl font-bold">Place Order</h1>

      <div>
        <label className="block mb-2 font-semibold">Select Delivery Address:</label>
        <select
          value={selectedAddress || ""}
          onChange={(e) => setSelectedAddress(parseInt(e.target.value))}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          {addresses.map((addr) => (
            <option key={addr.id} value={addr.id}>
              {addr.address_line_1}, {addr.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold">Additional Notes (optional):</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Any delivery instructions?"
        />
      </div>

      <button
        onClick={handleCashPayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order (Cash on Delivery)
      </button>
    </div>
  );
};

export default PaymentPage;
