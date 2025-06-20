// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaFileAlt, FaWallet, FaHistory } from 'react-icons/fa';

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path ? 'bg-[#2e3a59]' : '';

  return (
    <aside className="w-64 min-h-screen bg-[#202942] text-white">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        MERO<span className="text-red-500">SHARE</span>
      </div>

      <nav className="flex flex-col p-4 gap-1">

        <Link to="/admin/main" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin')}`}>
          <FaHome />
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/main" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/details')}`}>
          <FaUser />
          <span>My Details</span>
        </Link>

        <Link to="/admin/shares" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/shares')}`}>
          <FaFileAlt />
          <span>My Shares</span>
        </Link>

        <Link to="/admin/history" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/history')}`}>
          <FaHistory />
          <span>Transaction History</span>
        </Link>

        <Link to="/admin/portfolio" className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-[#313b55] ${isActive('/admin/portfolio')}`}>
          <FaWallet />
          <span>Portfolio</span>
        </Link>

      </nav>
    </aside>
  );
}
