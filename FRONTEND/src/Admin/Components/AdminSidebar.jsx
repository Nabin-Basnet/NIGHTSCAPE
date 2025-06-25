// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaThList, FaTags } from 'react-icons/fa';

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path ? 'bg-[#2e3a59]' : '';

  return (
    <aside className="w-64 min-h-screen bg-[#202942] text-white">
      <div className="text-2xl font-bold p-6 border-b border-gray-700 text-center">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          <span className="text-green-500">NIGHT</span><span className="text-blue-500">SCAPE</span>
        </div>
      </div>

      <nav className="flex flex-col p-4 gap-1">

        <Link to="/admin/main" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/main')}`}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/shares" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/shares')}`}>
          <FaBoxOpen />
          <span>Products</span>
        </Link>

        <Link to="/admin/history" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/history')}`}>
          <FaThList />
          <span>Category</span>
        </Link>

        <Link to="/admin/portfolio" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/portfolio')}`}>
          <FaTags />
          <span>Brand</span>
        </Link>

      </nav>
    </aside>
  );
}
