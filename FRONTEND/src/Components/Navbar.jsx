// src/components/Header.jsx
import React from "react";
import { FaPhone, FaLock, FaUser, FaSearch } from "react-icons/fa";
import {BsCart4} from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="bg-[#121212] text-white">
      {/* Header Part 1 */}
      <div className="flex justify-end items-center h-[50px] bg-[#1e1e1e] text-sm font-medium font-sans border-b border-gray-700">

        <div className="ml-[700px] text-gray-300 hover:text-[#ff5c00]">
          <a href="#"><FaPhone className="inline" /> 9708845245</a>
        </div>

        <div className="h-[25px] border-r-2 border-gray-600 mx-2"></div>

        <div className="text-gray-300 hover:text-[#ff5c00]">
          <a href="#"><FaLock className="inline" /> Sign In</a>
        </div>

        <div className="h-[25px] border-r-2 border-gray-600 mx-2"></div>

        <div className="text-gray-300 hover:text-[#ff5c00]">
          <a href="#"><FaUser className="inline" /> My Account</a>
        </div>

        <div className="w-[70px] h-[50px] bg-gray-700 ml-8 text-white flex items-center justify-center">
          NEP
        </div>
      </div>

      {/* Header Part 2 */}
      <div className="flex items-center h-[100px] bg-[#181818] border-b border-gray-700">
        <div className="ml-[150px] mt-2">
          <img
            className="h-30 w-auto object-contain"
            src="/images/logo.png"
            alt="logo"
          />
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

      {/* Navbar */}
      <div className="h-[60px] w-full border-b border-gray-600">
        <div className="flex justify-center items-center h-full space-x-4 text-white text-sm">
          {[
            "Home",
            "Custom Design",
            "Best Sellers",
            "Offers / Sale",
            "About Us",
            "Contact",
          ].map((text, index) => (
            <a
              href="#"
              key={index}
              className="px-4 py-2 hover:bg-[#ed1c24] rounded-sm"
            >
              {text}
            </a>
          ))}
        </div>
      </div>

      {/* Banners */}
      {/* <div className="flex items-center justify-center gap-12 py-4 mt-2 bg-[#121212] text-sm text-gray-300">
        <BannerItem
          src="https://cdn2.bigcommerce.com/server300/3954e/product_images/uploaded_images/truck.png"
          title="FREE DELIVERY*"
          subtitle="with coupon"
        />
        <Divider />
        <BannerItem
          src="https://cdn2.bigcommerce.com/server300/3954e/product_images/uploaded_images/price-match.png"
          title="PRICE MATCH"
          subtitle="Guarantee"
        />
        <Divider />
        <BannerItem
          src="https://cdn2.bigcommerce.com/server300/3954e/product_images/uploaded_images/dispatch.png"
          title="SAME DAY DISPATCH"
          subtitle="before 1pm (Mon-Fri)"
        />
        <Divider />
        <BannerItem
          src="https://cdn2.bigcommerce.com/server300/3954e/product_images/uploaded_images/easy-return.png"
          title="EASY RETURN"
          subtitle="Policy"
        />
      </div>
    </div>
  );
}

function BannerItem({ src, title, subtitle }) {
  return (
    <div className="flex items-center space-x-2">
      <img src={src} alt={title} className="h-6" />
      <div>
        <strong className="text-white">{title}</strong>
        <br />
        <span className="text-gray-400">{subtitle}</span>
      </div> */}
    </div>
  );
}

function Divider() {
  return <div className="h-10 border-l-2 border-gray-600"></div>;
}
