// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { FaPhone, FaLock, FaUser, FaSearch } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  PRODUCTS_ROUTE,
  OFFER_ROUTE,
  CONTACT_ROUTE,
  CUSTOM_DESIGN_ROUTE,
  BEST_SELLER,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  ACCOUNT_ROUTE, // define this in constants if not already
} from "../constants/navMenu";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/"); // redirect to homepage
  };

  return (
    <div className="bg-[#121212] text-white">
      {/* Header Part 1 */}
      <div className="flex justify-end items-center h-[50px] bg-[#1e1e1e] text-sm font-medium font-sans border-b border-gray-700">
        <div className="ml-[700px] text-gray-300 hover:text-[#ff5c00]">
          <a href="#"><FaPhone className="inline" /> 9708845245</a>
        </div>

        <div className="h-[25px] border-r-2 border-gray-600 mx-2"></div>

        {!isAuthenticated ? (
          <>
            <div className="text-gray-300 hover:text-[#ff5c00]">
              <Link to={SIGNUP_ROUTE}><FaLock className="inline" /> Sign In</Link>
            </div>

            <div className="h-[25px] border-r-2 border-gray-600 mx-2"></div>

            <div className="text-gray-300 hover:text-[#ff5c00]">
              <Link to={LOGIN_ROUTE}><FaLock className="inline" /> Log in</Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-gray-300 hover:text-[#ff5c00]">
              <button onClick={handleLogout} className="flex items-center gap-1">
                <FaLock className="inline" /> Log out
              </button>
            </div>

            <div className="h-[25px] border-r-2 border-gray-600 mx-2"></div>

            <div className="text-gray-300 hover:text-[#ff5c00]">
              <Link to={ACCOUNT_ROUTE}><FaUser className="inline" /> My Account</Link>
            </div>
          </>
        )}

        <div className="w-[70px] h-[50px] bg-gray-700 ml-8 text-white flex items-center justify-center">
          NEP
        </div>
      </div>

      {/* Header Part 2 */}
      <div className="flex items-center h-[100px] bg-[#181818] border-b border-gray-700">
        <div className="ml-[150px] mt-2">
          <Link to={HOME_ROUTE}>
          <img
            className="h-30 w-auto object-contain"
            src="/images/logo.png"
            alt="logo"
          /></Link>
        </div>

        <input
          type="text"
          placeholder="Search the store"
          className="h-[35px] w-[380px] ml-[170px] mt-7 rounded-l-md px-2 bg-gray-900 text-white border border-gray-600 placeholder-gray-400"
        />

        <button className="h-[41px] w-[60px] mt-7 bg-[#ff5c00] text-white rounded-r-md hover:bg-[#ff784e] flex items-center justify-center">
          <FaSearch />
        </button>

        <div className="mt-[35px] ml-[80px]">
          <BsCart4 size={35} />
        </div>
      </div>

      {/* Navbar Menu */}
      <div className="h-[60px] w-full border-b border-gray-600">
        <div className="flex justify-center items-center h-full space-x-4 text-white text-sm">
          {[
            { text: "Home", link: HOME_ROUTE },
            { text: "Products", link: PRODUCTS_ROUTE },
            { text: "Custom Design", link: CUSTOM_DESIGN_ROUTE },
            { text: "Best Sellers", link: BEST_SELLER },
            { text: "Offers / Sale", link: OFFER_ROUTE },
            { text: "About Us", link: ABOUT_ROUTE },
            { text: "Contact", link: CONTACT_ROUTE },
          ].map(({ text, link }, index) => (
            <Link
              to={link}
              key={index}
              className="px-4 py-2 hover:bg-[#ed1c24] rounded-sm"
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
