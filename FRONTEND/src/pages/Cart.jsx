// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { getCart, removeCartItem, updateCartItem } from "../Components/CartApi";

const CartPage = () => {
  const [cart, setCart] = useState([]);

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

  const handleUpdateQuantity = async (id, quantity) => {
    if (quantity >= 1) {
      await updateCartItem(id, quantity);
      fetchCart();
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) =>
          acc +
          (item.product?.price || 0) * (item.quantity || 0),
        0
      )
    : 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-white">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-lg text-center mt-12">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-gray-900 p-6 rounded-xl mb-6 shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300"
            >
              <img
                src={item.product?.image || ""}
                alt={item.product?.name || "No name"}
                className="w-28 h-28 object-cover rounded-lg border border-gray-700"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">{item.product?.name || "Unnamed product"}</h3>
                <p className="text-gray-400 text-sm mb-3">${item.product?.price?.toFixed(2) || "0.00"} each</p>
                <div className="inline-flex items-center gap-4 rounded-md bg-gray-800 px-3 py-1">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 hover:bg-red-600 transition-colors text-white text-2xl font-bold select-none"
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="text-lg font-medium text-white">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 hover:bg-green-600 transition-colors text-white text-2xl font-bold select-none"
                    aria-label="Increase quantity"
                  >
                    &#43;
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400 mb-3">
                  ${(item.product?.price * item.quantity).toFixed(2) || "0.00"}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-600 hover:underline text-sm font-semibold transition-colors"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-3xl font-extrabold text-white mt-8">
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
