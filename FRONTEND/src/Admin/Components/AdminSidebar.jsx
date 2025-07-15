import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  FaSignOutAlt, // import logout icon
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
  const navigate = useNavigate();

  const isActive = (path) =>
    pathname === `/admin/${path}` || (path === "" && pathname === "/admin")
      ? 'bg-[#2e3a59]'
      : '';

  // Logout handler
  const handleLogout = () => {
    // Clear tokens or any stored auth data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Redirect to login or homepage after logout
    navigate('/'); // change this path if your login page route differs
  };

  return (
    <aside className="w-64 min-h-screen bg-[#202942] text-white flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-6 border-b border-gray-700 text-center">
          <span className="text-green-500">NIGHT</span>
          <span className="text-blue-500">SCAPE</span>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {/* Existing links */}
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
            to={`/admin/${ADMIN_FEATURED_PRODUCTS}`}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_FEATURED_PRODUCTS)}`}
          >
            <FaStar />
            <span>Featured Product</span>
          </Link>

          <Link
            to={`/admin/${ADMIN_USERS}`}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_USERS)}`}
          >
            <FaUsers />
            <span>Users</span>
          </Link>

          <Link
            to={`/admin/${ADMIN_WISHLIST}`}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive(ADMIN_WISHLIST)}`}
          >
            <FaHeart />
            <span>Wishlists</span>
          </Link>
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] w-full text-left"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
