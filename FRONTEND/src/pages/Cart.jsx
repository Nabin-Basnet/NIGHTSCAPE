// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { getCart, removeCartItem, updateCartItem } from "../Components/CartApi";
import { useNavigate } from "react-router-dom";
import { PAYMENT_ROUTE } from "../constants/navMenu";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart([]);
    }
  };

  const handleRemove = async (id) => {
    await removeCartItem(id);
    fetchCart();
  };

  const handleUpdateQuantity = async (id, quantity, productId) => {
    if (quantity >= 1) {
      await updateCartItem(id, quantity, productId);
      fetchCart();
    }
  };

  const handleProceedToPayment = () => {
    navigate(PAYMENT_ROUTE);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) =>
          acc + (item.product?.price || 0) * (item.quantity || 0),
        0
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-12 text-white text-center tracking-tight leading-tight drop-shadow-xl">
          Your Shopping <span className="text-green-400">Cart</span>
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80">
            <svg
              className="w-20 h-20 text-gray-600 mb-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <p className="text-gray-500 text-xl text-center italic font-medium select-none">
              Looks like your cart is empty.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 px-6 py-3 bg-green-600 text-white text-md font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-xl shadow-xl flex items-center p-5 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border border-gray-700"
                >
                  <img
                    src={item.product?.image || "https://via.placeholder.com/100"}
                    alt={item.product?.name || "Product"}
                    className="w-28 h-28 rounded-md object-cover border-2 border-green-500 shadow-md flex-shrink-0 mr-5"
                    loading="lazy"
                  />

                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">
                      {item.product?.name || "Unnamed Product"}
                    </h3>

                    <p className="text-gray-400 text-md font-medium mb-1">
                      Unit Price:{" "}
                      <span className="text-green-400 font-bold">
                        ${item.product?.price?.toFixed(2) || "0.00"}
                      </span>
                    </p>

                    <div className="flex items-center gap-3 my-2">
                      <div className="flex items-center rounded-full bg-gray-700 p-0.5 shadow-inner">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1, item.product?.id)
                          }
                          className="w-8 h-8 flex justify-center items-center rounded-full bg-red-600 hover:bg-red-700 transition-all duration-200 text-white text-2xl font-bold active:scale-95"
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="text-white font-semibold px-3 text-lg min-w-[25px] text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1, item.product?.id)
                          }
                          className="w-8 h-8 flex justify-center items-center rounded-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white text-2xl font-bold active:scale-95"
                          aria-label="Increase quantity"
                        >
                          &#43;
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-400 font-semibold text-sm transition-colors duration-200 underline-offset-2 hover:underline ml-auto"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xl font-extrabold text-green-300 mt-2">
                      Total: ${(item.product?.price * item.quantity).toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
              <div className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
                Grand Total:{" "}
                <span className="text-green-400">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 tracking-wide uppercase"
              >
                Proceed to Payment
                <svg
                  className="inline-block ml-2 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;