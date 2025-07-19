// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { FaPhone, FaLock, FaUser, FaSearch } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  PRODUCTS_ROUTE,
  CONTACT_ROUTE,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  ACCOUNT_ROUTE,
  CART_ROUTE,
  ADMIN_ROUTE,
} from "../constants/navMenu";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setRole(decoded.role);
      } catch {
        setIsAuthenticated(false);
        setRole(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/");
  };

  return (
    <div className="bg-[#2c2c2c] text-[#FFF8E1]">
      {/* Header Top */}
      <div className="flex justify-end items-center h-12 bg-[#333333] text-sm font-medium border-b border-[#555555] px-4">
        <div className="ml-auto text-[#FFD54F] hover:text-[#FFCA28]">
          <a href="tel:9708845245" className="flex items-center gap-1">
            <FaPhone /> 9708845245
          </a>
        </div>

        <div className="h-6 border-r-2 border-[#555555] mx-3"></div>

        {!isAuthenticated ? (
          <>
            <div className="text-[#FFD54F] hover:text-[#FFCA28]">
              <Link to={SIGNUP_ROUTE} className="flex items-center gap-1">
                <FaLock /> Sign Up
              </Link>
            </div>

            <div className="h-6 border-r-2 border-[#555555] mx-3"></div>

            <div className="text-[#FFD54F] hover:text-[#FFCA28]">
              <Link to={LOGIN_ROUTE} className="flex items-center gap-1">
                <FaLock /> Log In
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-[#FFD54F] hover:text-[#FFCA28]">
              <button onClick={handleLogout} className="flex items-center gap-1">
                <FaLock /> Log Out
              </button>
            </div>

            <div className="h-6 border-r-2 border-[#555555] mx-3"></div>

            <div className="text-[#FFD54F] hover:text-[#FFCA28]">
              <Link to={role === "admin" ? ADMIN_ROUTE : ACCOUNT_ROUTE} className="flex items-center gap-1">
                <FaUser /> My Account
              </Link>
            </div>
          </>
        )}

        <div className="w-20 h-12 bg-[#444444] ml-8 text-[#FFF8E1] flex items-center justify-center rounded-md font-semibold">
          NEP
        </div>
      </div>

      {/* Header Middle */}
      <div className="flex items-center h-24 bg-[#383838] border-b border-[#555555] px-10">
        <div>
          <Link to={HOME_ROUTE}>
            <img
              className="h-20 w-auto object-contain"
              src="/images/logo.png"
              alt="logo"
            />
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search the store"
          className="h-10 w-96 ml-12 rounded-l-md px-4 bg-[#444444] text-[#FFF8E1] border border-[#666666] placeholder-[#FFD54F] focus:outline-none focus:ring-2 focus:ring-[#FFD54F]"
        />

        <button className="h-10 w-16 ml-0 bg-[#FFD54F] text-[#2c2c2c] rounded-r-md hover:bg-[#FFCA28] flex items-center justify-center transition duration-200">
          <FaSearch />
        </button>

        <div className="ml-8">
          <Link to={CART_ROUTE}>
            <BsCart4 size={35} className="hover:text-[#FFD54F] transition duration-200 text-[#FFF8E1]" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-16 w-full border-b border-[#555555] bg-[#383838]">
        <div className="flex justify-center items-center h-full space-x-6 text-[#FFF8E1] text-sm">
          {[  
            { text: "Home", link: HOME_ROUTE },
            { text: "Products", link: PRODUCTS_ROUTE },
            { text: "About Us", link: ABOUT_ROUTE },
            { text: "Contact", link: CONTACT_ROUTE },
          ].map(({ text, link }, index) => (
            <Link
              to={link}
              key={index}
              className="px-4 py-2 hover:bg-[#FFD54F] hover:text-[#2c2c2c] rounded-md transition duration-200"
            >
              {text}
            </Link>
          ))}

          {isAuthenticated && role === "admin" && (
            <Link
              to={ADMIN_ROUTE}
              className="px-4 py-2 hover:bg-[#FFD54F] hover:text-[#2c2c2c] rounded-md transition duration-200"
            >
              Admin Panel
            </Link>
          )}

          {isAuthenticated && role === "customer" && (
            <>
              <Link
                to={CART_ROUTE}
                className="px-4 py-2 hover:bg-[#FFD54F] hover:text-[#2c2c2c] rounded-md transition duration-200"
              >
                My Cart
              </Link>
              <Link
                to="/wishlist"
                className="px-4 py-2 hover:bg-[#FFD54F] hover:text-[#2c2c2c] rounded-md transition duration-200"
              >
                Wishlist
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
