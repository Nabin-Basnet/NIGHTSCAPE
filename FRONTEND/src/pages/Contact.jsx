import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-700 shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-600 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border border-gray-600 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                rows="4"
                className="w-full mt-1 p-2 border border-gray-600 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-700 rounded-2xl p-6 space-y-4 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-white">Our Contact Info</h2>
          <p className="text-gray-300">
            Feel free to reach out to us about our lighting products, custom neon boards, or business inquiries.
          </p>
          <div className="text-gray-400 space-y-2">
            <p><strong>Address:</strong> Kathmandu, Nepal</p>
            <p><strong>Phone:</strong> +977 9812345678</p>
            <p><strong>Email:</strong> support@lightshop.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
