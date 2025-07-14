// src/Components/CartApi.jsx
import AxiosInstance from "./Axios";

export const getCart = async () => {
  try {
    const res = await AxiosInstance.get("carts/");
    return res.data;
  } catch (err) {
    console.error("Error fetching cart:", err);
    return [];
  }
};

export const removeCartItem = async (id) => {
  try {
    await AxiosInstance.delete(`carts/${id}/`);
  } catch (err) {
    console.error("Error removing cart item:", err);
  }
};

// ✅ FIXED: include product_id in the PUT request
export const updateCartItem = async (id, quantity, productId) => {
  try {
    await AxiosInstance.put(`carts/${id}/`, {
      quantity,
      product_id: productId, // ✅ Required by backend
    });
  } catch (err) {
    console.error("Error updating cart item:", err);
  }
};
