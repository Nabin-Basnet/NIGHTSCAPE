import { useEffect, useState } from "react";
import { getCart, removeCartItem, updateCartItem } from "../Components/CartApi";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data || []);
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
    ? cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    : 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-gray-800 p-4 rounded-lg mb-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-400">
                  ${item.product.price} each
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-lg">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
