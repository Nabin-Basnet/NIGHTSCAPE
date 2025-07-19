"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaThList,
  FaTags,
  FaShoppingCart,
  FaStar,
  FaUsers,
  FaHeart,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa"
import {
  ADMIN_PRODUCT,
  ADMIN_CATEGORY,
  ADMIN_BRAND,
  ADMIN_ORDERS,
  ADMIN_ORDER_ITEMS,
  ADMIN_CART,
  ADMIN_FEATURED_PRODUCTS,
  ADMIN_USERS,
  ADMIN_WISHLIST,
} from "../Constants/AdminMenu"

export default function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isActive = (path) =>
    pathname === `/admin/${path}` || (path === "" && pathname === "/admin")
      ? "bg-[#ff5c00] text-white" // Active background color
      : "text-gray-300 hover:bg-[#313b55]" // Inactive and hover colors

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/")
  }

  return (
    <aside className="w-64 min-h-screen bg-[#1e1e1e] text-white flex flex-col justify-between shadow-lg">
      <div>
        <div className="text-3xl font-extrabold p-6 border-b border-gray-700 text-center bg-[#121212]">
          <span className="text-[#ff5c00]">BRIGHT</span>
          <span className="text-[#ed1c24]">SHOP</span>
        </div>
        <nav className="flex flex-col p-4 gap-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive("")}`}
          >
            <FaTachometerAlt className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_PRODUCT}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_PRODUCT)}`}
          >
            <FaBoxOpen className="w-5 h-5" />
            <span>Products</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_CATEGORY}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_CATEGORY)}`}
          >
            <FaThList className="w-5 h-5" />
            <span>Category</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_BRAND}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_BRAND)}`}
          >
            <FaTags className="w-5 h-5" />
            <span>Brand</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_ORDERS}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_ORDERS)}`}
          >
            <FaClipboardList className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_ORDER_ITEMS}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_ORDER_ITEMS)}`}
          >
            <FaBoxOpen className="w-5 h-5" />
            <span>Order Items</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_CART}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_CART)}`}
          >
            <FaShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_FEATURED_PRODUCTS}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_FEATURED_PRODUCTS)}`}
          >
            <FaStar className="w-5 h-5" />
            <span>Featured Product</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_USERS}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_USERS)}`}
          >
            <FaUsers className="w-5 h-5" />
            <span>Users</span>
          </Link>
          <Link
            to={`/admin/${ADMIN_WISHLIST}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(ADMIN_WISHLIST)}`}
          >
            <FaHeart className="w-5 h-5" />
            <span>Wishlists</span>
          </Link>
          {/* Add other admin links here if needed */}
        </nav>
      </div>
      {/* Logout button at bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#313b55] w-full text-left text-gray-300 transition-colors duration-200"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
