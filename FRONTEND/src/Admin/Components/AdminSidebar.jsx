import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaThList,
  FaTags,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaStar,
  FaUndo,
  FaUsers,
  FaComments,
  FaHeart,
  FaClipboardList,
} from 'react-icons/fa';

import {
  ADMIN_PRODUCT,
  ADMIN_CATEGORY,
  ADMIN_BRAND,
  ADMIN_ORDERS,
  ADMIN_ORDER_ITEMS,
  ADMIN_CART,
  ADMIN_ADDRESS,
  ADMIN_FEATURED_PRODUCTS,
  ADMIN_RETURN,
  ADMIN_USERS,
  ADMIN_WISHLIST,
  ADMIN_REVIEW,
} from '../Constants/AdminMenu';

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === `/admin/${path}` || (path === "" && pathname === "/admin")
      ? 'bg-[#2e3a59]'
      : '';

  return (
    <aside className="w-64 min-h-screen bg-[#202942] text-white">
      <div className="text-2xl font-bold p-6 border-b border-gray-700 text-center">
        <span className="text-green-500">NIGHT</span>
        <span className="text-blue-500">SCAPE</span>
      </div>

      <nav className="flex flex-col p-4 gap-1">
        <Link
          to="/admin"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive("")}`}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_PRODUCT}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_PRODUCT)}`}
        >
          <FaBoxOpen />
          <span>Products</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_CATEGORY}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_CATEGORY)}`}
        >
          <FaThList />
          <span>Category</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_BRAND}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_BRAND)}`}
        >
          <FaTags />
          <span>Brand</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_ORDERS}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_ORDERS)}`}
        >
          <FaClipboardList />
          <span>Orders</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_ORDER_ITEMS}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_ORDER_ITEMS)}`}
        >
          <FaBoxOpen />
          <span>Order Items</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_CART}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_CART)}`}
        >
          <FaShoppingCart />
          <span>Cart</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_ADDRESS}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_ADDRESS)}`}
        >
          <FaMapMarkerAlt />
          <span>Address</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_FEATURED_PRODUCTS}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_FEATURED_PRODUCTS)}`}
        >
          <FaStar />
          <span>Featured Product</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_RETURN}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_RETURN)}`}
        >
          <FaUndo />
          <span>Return</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_USERS}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_USERS)}`}
        >
          <FaUsers />
          <span>Users</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_REVIEW}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_REVIEW)}`}
        >
          <FaComments />
          <span>Review</span>
        </Link>

        <Link
          to={`/admin/${ADMIN_WISHLIST}`}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_WISHLIST)}`}
        >
          <FaHeart />
          <span>Wishlists</span>
        </Link>
      </nav>
    </aside>
  );
}
