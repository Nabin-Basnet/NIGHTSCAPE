"use client"

import { Outlet } from "react-router-dom"

export default function MainContent() {
  return (
    <div className="flex-1 flex flex-col bg-[#121212] text-white">
      {/* Admin Header */}
      <div className="bg-[#1e1e1e] p-6 border-b border-gray-700 shadow-md">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your store's products, orders, users, and more.</p>
      </div>

      {/* Content Area for Nested Routes */}
      <div className="p-6 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
