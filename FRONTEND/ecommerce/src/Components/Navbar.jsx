import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ABOUT_ROUTE, HOME_ROUTE, PRODUCTS_ROUTE } from "../constants/navMenu";

const links = [
  { path: HOME_ROUTE, name: "Home" },
  { path: ABOUT_ROUTE, name: "About" },
  { path: PRODUCTS_ROUTE, name: "Products" },
  { path: "/contact", name: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-indigo-600">LightShop</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <ul className="flex space-x-6">
              {links.map(({ name, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-700 hover:text-indigo-600 transition"
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button className="relative bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
              Cart
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </button>
          </div>
          <div>
          <button type="submit" className="login-btn bg-amber-400 p-2 rounded-(20)px">Login </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          {links.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-indigo-600 font-semibold"
                  : "block text-gray-700 hover:text-indigo-600 transition"
              }
            >
              {name}
            </NavLink>
          ))}
          <button className="relative bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition w-full text-left">
            Cart
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
          <button type="submit" className="login-btn ">Login</button>
        </div>
      )}
    </nav>
  );
}
