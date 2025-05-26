export default function Home() {
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
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-700 transition duration-300 text-center border border-gray-700"
            >
              <h4 className="text-lg font-medium text-white">{cat}</h4>
              <p className="text-gray-400 mt-2">Explore {cat} lighting options</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-900 py-16 px-4">
  <h3 className="text-3xl font-bold text-center mb-12 text-white">Featured Products</h3>
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-700"
      >
        <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-white text-lg">Image {item}</span>
        </div>
        <h4 className="text-xl font-semibold text-white mb-1">Premium Product {item}</h4>
        <p className="text-gray-400 mb-3 text-sm">This is a short and compelling description of the product.</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-400 font-semibold text-lg">$9.99</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  )
}
