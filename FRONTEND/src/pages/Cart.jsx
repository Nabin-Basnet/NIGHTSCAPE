"use client"

import { useEffect, useState } from "react"
import { getCart, removeCartItem, updateCartItem } from "../Components/CartApi"
import { Link, useNavigate } from "react-router-dom"
import { PAYMENT_ROUTE } from "../constants/navMenu"
import { ShoppingCart, Minus, Plus, Trash2, Loader2, ArrowRight } from "lucide-react"

const CartPage = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingItemId, setUpdatingItemId] = useState(null) // To show loading state for individual item quantity updates
  const navigate = useNavigate()

  const fetchCart = async () => {
    try {
      setLoading(true)
      const cartData = await getCart()
      setCart(cartData || [])
    } catch (error) {
      console.error("Failed to fetch cart:", error)
      setCart([])
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (id) => {
    setUpdatingItemId(id) // Indicate that this item is being processed
    try {
      await removeCartItem(id)
      fetchCart() // Re-fetch cart to update UI
    } catch (err) {
      console.error("Error removing from cart:", err)
    } finally {
      setUpdatingItemId(null)
    }
  }

  const handleUpdateQuantity = async (id, quantity, productId) => {
    if (quantity >= 1) {
      setUpdatingItemId(id) // Indicate that this item is being processed
      try {
        await updateCartItem(id, quantity, productId)
        fetchCart() // Re-fetch cart to update UI
      } catch (err) {
        console.error("Error updating cart item quantity:", err)
      } finally {
        setUpdatingItemId(null)
      }
    }
  }

  const handleProceedToPayment = () => {
    navigate(PAYMENT_ROUTE)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0), 0)
    : 0

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200 text-center">
          <ShoppingCart className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Shopping Cart</h1>
          <p className="text-xl text-gray-600">Review your items before checkout.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 animate-pulse flex items-center">
                <div className="w-28 h-28 bg-gray-200 rounded-xl flex-shrink-0 mr-5"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded-full ml-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-200">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-600 text-2xl font-semibold mb-4">Your cart is empty!</p>
            <p className="text-gray-500 text-lg mb-8">Add some amazing products to your cart to get started.</p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-lg flex items-center p-5 border border-gray-200 transition-all duration-300 ${
                    updatingItemId === item.id ? "opacity-70" : "hover:shadow-xl hover:-translate-y-0.5"
                  }`}
                >
                  <Link to={`/products/${item.product?.id}`} className="flex-shrink-0">
                    <img
                      src={item.product?.image || "/placeholder.svg?height=100&width=100"}
                      alt={item.product?.name || "Product"}
                      className="w-28 h-28 rounded-xl object-cover border border-gray-100 shadow-sm flex-shrink-0 mr-5"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <Link to={`/products/${item.product?.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate hover:text-orange-500 transition-colors">
                        {item.product?.name || "Unnamed Product"}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-md font-medium mb-1">
                      Unit Price:{" "}
                      <span className="text-orange-500 font-bold">${item.product?.price?.toFixed(2) || "0.00"}</span>
                    </p>
                    <div className="flex items-center gap-3 my-2">
                      <div className="flex items-center rounded-full bg-gray-100 p-0.5 shadow-inner">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.product?.id)}
                          className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 text-gray-700 text-xl font-bold active:scale-95"
                          aria-label="Decrease quantity"
                          disabled={updatingItemId === item.id}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-gray-900 font-semibold px-3 text-lg min-w-[25px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.product?.id)}
                          className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 text-gray-700 text-xl font-bold active:scale-95"
                          aria-label="Increase quantity"
                          disabled={updatingItemId === item.id}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-600 font-semibold text-sm transition-colors duration-200 underline-offset-2 hover:underline ml-auto flex items-center"
                        aria-label="Remove item"
                        disabled={updatingItemId === item.id}
                      >
                        {updatingItemId === item.id ? (
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-1" />
                        )}
                        Remove
                      </button>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                      Subtotal:{" "}
                      <span className="text-orange-500">
                        ${(item.product?.price * item.quantity).toFixed(2) || "0.00"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="text-4xl font-bold text-gray-900 tracking-wide">
                Grand Total: <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xl font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 tracking-wide uppercase flex items-center justify-center"
              >
                Proceed to Payment
                <ArrowRight className="inline-block ml-3 w-6 h-6" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartPage
