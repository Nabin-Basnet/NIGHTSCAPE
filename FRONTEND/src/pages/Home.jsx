import React from "react";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">


      {/* Hero Section */}
      <section
        className="bg-[url('/images/hero_img.jpeg')] h-[600px] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-r from-blue-100 to-blue-300 py-20 text-center h-500px"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Light Up Your World</h2>
        <p className="text-lg md:text-xl mb-6 text-white">High-quality bulbs & neon boards for every occasion</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Shop Now</button>
      </section>
      {/* Categories */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h3 className="text-2xl font-semibold text-center mb-10">Shop by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Daily Use", "Decorative", "Neon Boards"].map((cat) => (
            <div key={cat} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
              <h4 className="text-lg font-medium">{cat}</h4>
              <p className="text-gray-500 mt-2">Explore {cat} lighting options</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-16 px-4">
        <h3 className="text-2xl font-semibold text-center mb-10">Featured Products</h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 mb-4 rounded"></div>
              <h4 className="font-semibold mb-2">Product {item}</h4>
              <p className="text-gray-600 mb-2">Short description here.</p>
              <span className="text-blue-600 font-bold">$9.99</span>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
