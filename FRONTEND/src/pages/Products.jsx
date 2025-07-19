"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Grid3X3, List, Star, Heart, ShoppingCart, ChevronDown, Eye } from "lucide-react"
import AxiosInstance from "../Components/Axios"
import { addToCart } from "../Utils/CartUtils"

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await AxiosInstance.get("products/")
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchWishlist = async () => {
      try {
        const response = await AxiosInstance.get("/wishlist/")
        const wishlistedIds = response.data.map((item) => item.product.id)
        setWishlist(wishlistedIds)
      } catch (error) {
        console.error("Error fetching wishlist", error)
      }
    }

    fetchProducts()
    fetchWishlist()
  }, [])

  const StarRating = ({ rating }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  )

  const handleAddToCart = (productId) => {
    addToCart(productId, navigate)
  }

  const toggleWishlist = async (productId) => {
    if (wishlist.includes(productId)) {
      try {
        await AxiosInstance.delete(`/wishlist/${productId}/`)
        setWishlist(wishlist.filter((id) => id !== productId))
      } catch (error) {
        console.error("Failed to remove from wishlist", error)
      }
    } else {
      try {
        await AxiosInstance.post("/wishlist/", { product_id: productId })
        setWishlist([...wishlist, productId])
        alert("✅ Product added to your wishlist!") // Consider replacing with a toast notification
      } catch (error) {
        console.error("Failed to add to wishlist", error)
      }
    }
  }

  const ProductCard = ({ product }) => {
    const isWishlisted = wishlist.includes(product.id)

    if (viewMode === "list") {
      return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
          <div className="flex">
            <div className="relative w-64 flex-shrink-0">
              <img
                src={product.image || "/placeholder.svg?height=200&width=200"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.is_new && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">NEW</span>
                )}
                {product.on_sale && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">SALE</span>
                )}
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors cursor-pointer">
                  {product.name}
                </h3>
                <div className="flex items-center mb-3">
                  <StarRating rating={product.rating || 4} />
                  <span className="ml-2 text-sm text-gray-500">({product.reviews_count || 0} reviews)</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  {product.original_price && (
                    <span className="text-lg text-gray-500 line-through">${product.original_price}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted
                        ? "bg-red-100 text-red-500 hover:bg-red-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product.id)
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <div className="relative">
          <img
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_new && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">NEW</span>
            )}
            {product.on_sale && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">SALE</span>
            )}
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleWishlist(product.id)
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isWishlisted
                  ? "bg-red-500/90 text-white"
                  : "bg-white/90 text-gray-600 hover:bg-red-500/90 hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart(product.id)
              }}
              className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300"
            >
              Quick Add to Cart
            </button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center mb-3">
            <StarRating rating={product.rating || 4} />
            <span className="ml-2 text-sm text-gray-500">({product.reviews_count || 0})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              {product.original_price && (
                <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart(product.id)
              }}
              className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of premium lighting solutions crafted for every space and occasion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content - Now full width */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{products.length}</span> of{" "}
              <span className="font-semibold">{products.length}</span> products
            </p>

            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex bg-white border border-gray-300 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-8"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && products.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Check back soon for amazing products!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
