// src/Components/CartApi.jsx
import AxiosInstance from "./Axios";

export const getCart = async () => {
  try {
    const res = await AxiosInstance.get("carts/");
    return res.data;  // Return the array of cart items directly
  } catch (err) {
    console.error("Error fetching cart:", err);
    return []; // Return empty array if error
  }
};

export const removeCartItem = async (id) => {
  try {
    await AxiosInstance.delete(`carts/${id}/`);
  } catch (err) {
    console.error("Error removing cart item:", err);
  }
};

export const updateCartItem = async (id, quantity) => {
  try {
    await AxiosInstance.put(`carts/${id}/`, { quantity });
  } catch (err) {
    console.error("Error updating cart item:", err);
  }
};
