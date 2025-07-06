import AxiosInstance from './Axios';

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await AxiosInstance.post('carts/', {
      product_id: productId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await AxiosInstance.get('carts/');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await AxiosInstance.delete(`carts/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await AxiosInstance.patch(`carts/${itemId}/`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};
