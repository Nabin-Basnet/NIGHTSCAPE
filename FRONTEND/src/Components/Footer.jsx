import React from 'react';
import Home from '../pages/Home';
import { Link } from 'react-router-dom';
import Products from '../pages/Products';
import { ABOUT_ROUTE, CONTACT_ROUTE, HOME_ROUTE, PRODUCTS_ROUTE } from '../constants/navMenu';

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white pt-12 pb-6 w-full bottom-0 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-amber-400 mb-2">BrightShop</h2>
          <p className="text-sm text-gray-400">We provide top-quality lighting products including bulbs, decorative lights, and neon boards. Brighten your world with us!</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-amber-400 mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to={HOME_ROUTE} className="hover:underline">Home</Link></li>
            <li><Link to={PRODUCTS_ROUTE} className="hover:underline">Products</Link></li>
            <li><Link to={ABOUT_ROUTE} className="hover:underline">About</Link></li>
            <li><Link to={CONTACT_ROUTE} className="hover:underline">Contact</Link></li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-amber-400 mb-2">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: nabinbasnet@gmail.com</p>
          <p className="text-sm text-gray-300">Phone: +977-9815326723</p>
          <p className="text-sm text-gray-300">Address: Belbari, Morang, Nepal</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-amber-400 mb-2">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-3">Get updates on offers and new arrivals.</p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md text-gray-800"
            />
            <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium px-4 py-2 rounded-md">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BrightShop. All rights reserved.
      </div>
    </div>
  );
}
