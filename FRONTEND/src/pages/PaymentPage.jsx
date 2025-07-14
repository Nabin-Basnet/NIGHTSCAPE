// src/pages/PaymentPage.jsx
import React, { useEffect } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  let config = {
    publicKey: "test_public_key_1234567890", // Replace with your real public key
    productIdentity: "1234567890",
    productName: "Hamro Store Payment",
    productUrl: "http://localhost:5173",
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment Successful:", payload);
        // 🔄 Send payload.token and amount to your backend for verification
        alert("Payment Successful!");
        navigate("/success"); // redirect to success page
      },
      onError(error) {
        console.log("Payment Failed:", error);
        alert("Payment failed. Please try again.");
      },
      onClose() {
        console.log("Payment popup closed.");
      },
    },
    paymentPreference: ["KHALTI"],
  };

  const checkout = new KhaltiCheckout(config);

  const handlePayment = () => {
    const totalAmount = 2000 * 100; // Amount in paisa
    checkout.show({ amount: totalAmount });
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Proceed with Khalti Payment</h1>
      <p className="mb-4">Click the button below to pay using Khalti.</p>
      <button
        onClick={handlePayment}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Pay with Khalti
      </button>
    </div>
  );
};

export default PaymentPage;
