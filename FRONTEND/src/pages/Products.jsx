"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-react";
import AxiosInstance from "../Components/Axios";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosInstance.get("products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  // Toggle brand selection
  const toggleBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Filter products based on search, category, price and brand
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand?.toLowerCase());

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
  });

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 10000]);
    setSelectedBrands([]);
  };

  // Star rating display component
  const StarRating = ({ rating }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );

  // Add product to cart
  const handleAddToCart = async (productId) => {
    try {
      await AxiosInstance.post("carts/", {
        product_id: productId,
        quantity: 1,
      });
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  // Product card component
  const ProductCard = ({ product }) => (
    <div
      className={`bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group ${
        viewMode === "list" ? "flex gap-4" : ""
      }`}
      onClick={() => navigate(`/products/${product.id}`)} // Navigate to product detail on click
      style={{ cursor: "pointer" }}
    >
      <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover bg-gray-700 ${
            viewMode === "list" ? "h-32" : "h-48"
          }`}
        />
        {product.is_new && (
          <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
            NEW
          </span>
        )}
        {product.on_sale && (
          <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
            SALE
          </span>
        )}
        <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100">
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
        <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <StarRating rating={product.rating} />
          <span className="ml-2 text-sm text-gray-400">
            ({product.reviews_count || 0})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-400">${product.price}</span>
          {product.original_price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.original_price}
            </span>
          )}
        </div>

        {viewMode === "list" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product.id);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-400">
            Discover our complete collection of premium lighting solutions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
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
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg ${
                      selectedCategory === "all" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                  >
                    All Products
                  </button>
                  {/* Add more categories here if needed */}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
              </div>

              {/* Brands (Placeholder for future brand filters) */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Brands</h3>
                {/* Implement brand filter UI here if needed */}
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
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
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 pr-8"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid/list */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No products found</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
