"use client"
import { Link } from "react-router-dom"
import { Lightbulb, Target, Users, Handshake, Sparkles, ArrowRight } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200 text-center">
          <Lightbulb className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">About BrightShop</h1>
          <p className="text-xl text-gray-600">Illuminating your world with quality and innovation.</p>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200">
          <div className="flex items-center mb-6">
            <Sparkles className="w-8 h-8 mr-3 text-pink-500" />
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                BrightShop was founded with a simple yet powerful vision: to bring high-quality, innovative, and
                beautiful lighting solutions to every home and business. What started as a small passion project has
                grown into a trusted online destination for all things light.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that lighting is more than just illumination; it's about creating ambiance, enhancing mood,
                and transforming spaces. Our journey has been driven by a commitment to sourcing the best products,
                embracing sustainable practices, and providing exceptional customer service.
              </p>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              <img src="/placeholder.svg?height=400&width=600" alt="Our Story" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white text-lg font-semibold">"Bringing light to every corner."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 mr-3 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower individuals and businesses to create their ideal environments through superior
              lighting. We strive to offer a diverse range of products that combine cutting-edge technology with
              timeless design, ensuring both functionality and aesthetic appeal.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 mr-3 text-purple-500" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where every space is perfectly lit, enhancing productivity, comfort, and beauty. We
              aim to be the leading provider of lighting solutions, recognized for our innovation, quality, and
              unwavering commitment to customer satisfaction.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200">
          <div className="flex items-center mb-6">
            <Handshake className="w-8 h-8 mr-3 text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">We commit to excellence in every product we offer.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Constantly seeking new ways to brighten your life.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
              <p className="text-gray-600 text-sm">Your satisfaction is at the heart of everything we do.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">Promoting eco-friendly lighting solutions.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">Operating with honesty and transparency.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Light Up Your Space?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our diverse collection of lighting products and find the perfect fit for your needs.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Our Products <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
