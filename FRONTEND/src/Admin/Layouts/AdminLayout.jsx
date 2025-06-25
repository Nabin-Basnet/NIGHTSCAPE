// src/admin/AdminLayout.jsx
import AdminSidebar from '../Components/AdminSidebar'
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
