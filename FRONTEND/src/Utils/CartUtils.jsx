// src/Components/CartUtils.jsx
import { jwtDecode } from "jwt-decode"; // ✅ Named import
import AxiosInstance from "../Components/Axios";

export const addToCart = async (productId, navigate, quantity = 1) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please log in to add products to your cart.");
    navigate("/login");
    return false;
  }

  try {
    const decoded = jwtDecode(token); // ✅ Use named function
    if (decoded.role !== "customer") {
      alert("Only customers can add products to the cart.");
      return false;
    }
  } catch (error) {
    alert("Invalid token. Please log in again.");
    navigate("/login");
    return false;
  }

  try {
    await AxiosInstance.post("carts/", {
      product_id: productId,
      quantity: quantity,
    });
    alert("Product added to cart!");
    navigate("/cart");
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
    alert("Failed to add to cart");
    return false;
  }
};
