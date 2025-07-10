import AxiosInstance from '../Components/Axios';

export const addToWishlist = async (productId) => {
  try {
    const response = await AxiosInstance.post('wishlist/', {
      product_id: productId,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error.response || error);
    throw error;
  }
};

export const getWishlist = async () => {
  try {
    const response = await AxiosInstance.get('wishlist/');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error.response || error);
    throw error;
  }
};

export const removeWishlistItem = async (itemId) => {
  try {
    const response = await AxiosInstance.delete(`wishlist/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error('Error removing wishlist item:', error.response || error);
    throw error;
  }
};
