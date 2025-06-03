"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, ChevronDown } from "lucide-react"

const Products = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: "all", name: "All Products", count: 48 },
    { id: "pendant", name: "Pendant Lights", count: 12 },
    { id: "chandelier", name: "Chandeliers", count: 8 },
    { id: "ceiling", name: "Ceiling Lights", count: 15 },
    { id: "wall", name: "Wall Sconces", count: 10 },
    { id: "table", name: "Table Lamps", count: 3 },
  ]

  const brands = [
    { id: "modern-light", name: "Modern Light Co.", count: 15 },
    { id: "bright-designs", name: "Bright Designs", count: 12 },
    { id: "lux-lighting", name: "Lux Lighting", count: 10 },
    { id: "eco-led", name: "Eco LED", count: 8 },
    { id: "classic-fixtures", name: "Classic Fixtures", count: 3 },
  ]

  const products = [
    {
      id: 1,
      name: "Modern LED Pendant Light",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=300",
      category: "pendant",
      brand: "modern-light",
      isNew: true,
      onSale: true,
    },
    {
      id: 2,
      name: "Crystal Chandelier Deluxe",
      price: 899.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=300",
      category: "chandelier",
      brand: "lux-lighting",
      isNew: false,
      onSale: false,
    },
    {
      id: 3,
      name: "Industrial Ceiling Light",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=300",
      category: "ceiling",
      brand: "bright-designs",
      isNew: false,
      onSale: true,
    },
    {
      id: 4,
      name: "Minimalist Wall Sconce",
      price: 89.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
      category: "wall",
      brand: "modern-light",
      isNew: true,
      onSale: false,
    },
    {
      id: 5,
      name: "Smart LED Track Lighting",
      price: 349.99,
      originalPrice: 449.99,
      rating: 4.5,
      reviews: 78,
      image: "/placeholder.svg?height=300&width=300",
      category: "ceiling",
      brand: "eco-led",
      isNew: false,
      onSale: true,
    },
    {
      id: 6,
      name: "Vintage Edison Pendant",
      price: 159.99,
      originalPrice: null,
      rating: 4.4,
      reviews: 92,
      image: "/placeholder.svg?height=300&width=300",
      category: "pendant",
      brand: "classic-fixtures",
      isNew: false,
      onSale: false,
    },
    {
      id: 7,
      name: "Contemporary Floor Lamp",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.6,
      reviews: 67,
      image: "/placeholder.svg?height=300&width=300",
      category: "table",
      brand: "bright-designs",
      isNew: true,
      onSale: true,
    },
    {
      id: 8,
      name: "Luxury Crystal Chandelier",
      price: 1299.99,
      originalPrice: null,
      rating: 5.0,
      reviews: 34,
      image: "/placeholder.svg?height=300&width=300",
      category: "chandelier",
      brand: "lux-lighting",
      isNew: false,
      onSale: false,
    },
  ]

  const toggleBrand = (brandId) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand
  })

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 1000])
    setSelectedBrands([])
  }

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
          />
        ))}
      </div>
    )
  }

  const ProductCard = ({ product }) => (
    <div
      className={`bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group ${
        viewMode === "list" ? "flex gap-4" : ""
      }`}
    >
      <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={`w-full object-cover bg-gray-700 ${viewMode === "list" ? "h-32" : "h-48"}`}
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
            NEW
          </span>
        )}
        {product.onSale && (
          <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
            SALE
          </span>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
        <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">{product.name}</h3>

        <div className="flex items-center mb-2">
          <StarRating rating={product.rating} />
          <span className="ml-2 text-sm text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-400">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {viewMode === "list" && (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-400">Discover our complete collection of premium lighting solutions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-400">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000])}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300">{brand.name}</span>
                      <span className="text-sm text-gray-400">({brand.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearAllFilters}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <p className="text-gray-400">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No products found</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === 1 ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">Next</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
