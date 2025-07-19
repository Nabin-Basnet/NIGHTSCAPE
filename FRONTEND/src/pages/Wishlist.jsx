"use client"

import { useEffect, useState } from "react"
import AxiosInstance from "../Components/Axios"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Trash2, Loader2, ArrowRight } from "lucide-react"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingToCartId, setAddingToCartId] = useState(null)

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const res = await AxiosInstance.get("/wishlist/")
      setWishlist(res.data)
    } catch (err) {
      console.error("Error fetching wishlist:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const handleRemove = async (itemId) => {
    try {
      await AxiosInstance.delete(`/wishlist/${itemId}/`)
      setWishlist((prev) => prev.filter((item) => item.id !== itemId))
    } catch (err) {
      console.error("Error removing from wishlist:", err)
    }
  }

  const handleAddToCart = async (productId, wishlistItemId) => {
    try {
      setAddingToCartId(wishlistItemId)
      await AxiosInstance.post("/cart/", { product: productId, quantity: 1 })
      // Optionally remove from wishlist after adding to cart
      await AxiosInstance.delete(`/wishlist/${wishlistItemId}/`)
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId))
    } catch (err) {
      console.error("Error adding to cart:", err)
    } finally {
      setAddingToCartId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200 text-center">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h2>
          <p className="text-xl text-gray-600">All the products you love, saved in one place.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-56 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-200">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-600 text-2xl font-semibold mb-4">Your wishlist is empty!</p>
            <p className="text-gray-500 text-lg mb-8">Start adding products you love to save them for later.</p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Products <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 group transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={`/products/${item.product.id}`} className="block relative">
                  <img
                    src={item.product.image || "/placeholder.svg?height=300&width=300"}
                    alt={item.product.name}
                    className="w-full h-56 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <Link to={`/products/${item.product.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {item.product.description || "No description available."}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ${item.product.price}
                      {item.product.original_price && (
                        <span className="text-lg text-gray-500 line-through ml-2">${item.product.original_price}</span>
                      )}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 font-medium shadow-md"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5 mr-2" />
                      Remove
                    </button>
                    <button
                      onClick={() => handleAddToCart(item.product.id, item.id)}
                      disabled={addingToCartId === item.id}
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {addingToCartId === item.id ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
