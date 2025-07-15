import React, { useState, useEffect } from 'react';
import AxiosInstance from '../Components/Axios';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const GetData = async () => {
    try {
      const response = await AxiosInstance.get('featured/'); // Fetch featured product entries
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="font-sans text-gray-100 bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[url('/images/hero-image.jpg')] h-[600px] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-r from-gray-900/80 to-blue-900/60 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Light Up Your World</h2>
        <p className="text-lg md:text-xl mb-6 text-gray-200">High-quality bulbs & neon boards for every occasion</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300">
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h3 className="text-2xl font-semibold text-center mb-10 text-white">Shop by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Daily Use", "Decorative", "Neon Boards"].map((cat) => (
            <div
              key={cat}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center border border-gray-200"
            >
              <h4 className="text-lg font-medium text-gray-900">{cat}</h4>
              <p className="text-gray-600 mt-2">Explore {cat} lighting options</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-900 py-16 px-4">
        <h3 className="text-3xl font-bold text-center mb-12 text-white">🌟 Featured Products</h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((item) => {
              const product = item.product;
              return (
                <div
                  key={item.id}
                  className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-700"
                >
                  <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || 'https://placehold.co/300x300?text=No+Image'}
                      alt={product.name}
                      className="object-cover h-full w-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/300x300?text=No+Image';
                      }}
                    />
                  </div>

                  <h4 className="text-xl font-semibold text-white mb-1">{product.name}</h4>
                  <p className="text-gray-400 mb-3 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-semibold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-300 text-center col-span-full">No featured products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
