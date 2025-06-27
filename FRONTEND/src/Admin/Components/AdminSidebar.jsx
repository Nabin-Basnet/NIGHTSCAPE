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
  FaUserCheck,
} from 'react-icons/fa';

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (path) => (pathname === path ? 'bg-[#2e3a59]' : '');

  return (
    <aside className="w-64 min-h-screen bg-[#202942] text-white">
      <div className="text-2xl font-bold p-6 border-b border-gray-700 text-center">
        <span className="text-green-500">NIGHT</span>
        <span className="text-blue-500">SCAPE</span>
      </div>

      <nav className="flex flex-col p-4 gap-1">
        <Link
          to="/admin/main"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/main')}`}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/admin/shares"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/shares')}`}
        >
          <FaBoxOpen />
          <span>Products</span>
        </Link>

        <Link
          to="/admin/history"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/history')}`}
        >
          <FaThList />
          <span>Category</span>
        </Link>

        <Link
          to="/admin/brand"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/brand')}`}
        >
          <FaTags />
          <span>Brand</span>
        </Link>

        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/orders')}`}
        >
          <FaClipboardList />
          <span>Orders</span>
        </Link>

        <Link
          to="/admin/order-items"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/order-items')}`}
        >
          <FaBoxOpen />
          <span>Order Items</span>
        </Link>

        <Link
          to="/admin/cart"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/cart')}`}
        >
          <FaShoppingCart />
          <span>Cart</span>
        </Link>

        <Link
          to="/admin/address"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/address')}`}
        >
          <FaMapMarkerAlt />
          <span>Address</span>
        </Link>

        <Link
          to="/admin/featured-product"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/featured-product')}`}
        >
          <FaStar />
          <span>Featured Product</span>
        </Link>

        <Link
          to="/admin/return"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/return')}`}
        >
          <FaUndo />
          <span>Return</span>
        </Link>

        <Link
          to="/admin/users"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/users')}`}
        >
          <FaUsers />
          <span>Users</span>
        </Link>

        <Link
          to="/admin/review"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/review')}`}
        >
          <FaComments />
          <span>Review</span>
        </Link>

        <Link
          to="/admin/wishlists"
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/wishlists')}`}
        >
          <FaHeart />
          <span>Wishlists</span>
        </Link>
      </nav>
    </aside>
  );
}
