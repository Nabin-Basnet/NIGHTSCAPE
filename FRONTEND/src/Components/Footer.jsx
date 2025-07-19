import { Link } from "react-router-dom"
import { ABOUT_ROUTE, CONTACT_ROUTE, HOME_ROUTE, PRODUCTS_ROUTE } from "../constants/navMenu"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo & About */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">BrightShop</h2>
          <p className="text-sm leading-relaxed mb-4">
            We provide top-quality lighting products including bulbs, decorative lights, and neon boards. Brighten your
            world with us!
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
          <ul className="space-y-3 text-base">
            <li>
              <Link to={HOME_ROUTE} className="hover:text-orange-400 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to={PRODUCTS_ROUTE} className="hover:text-orange-400 transition-colors duration-200">
                Products
              </Link>
            </li>
            <li>
              <Link to={ABOUT_ROUTE} className="hover:text-orange-400 transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to={CONTACT_ROUTE} className="hover:text-orange-400 transition-colors duration-200">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-orange-400 transition-colors duration-200">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
          <ul className="space-y-3 text-base">
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-orange-400" />
              <span>nabinbasnet@gmail.com</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-orange-400" />
              <span>+977-9815326723</span>
            </li>
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0 mt-1" />
              <span>Belbari, Morang, Nepal</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Stay Updated</h3>
          <p className="text-sm leading-relaxed mb-4">
            Subscribe to our newsletter for exclusive offers, new product announcements, and lighting tips.
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-5 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200"
            />
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} BrightShop. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/privacy-policy" className="hover:underline mx-2">
            Privacy Policy
          </Link>{" "}
          |
          <Link to="/terms-of-service" className="hover:underline mx-2">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  )
}
