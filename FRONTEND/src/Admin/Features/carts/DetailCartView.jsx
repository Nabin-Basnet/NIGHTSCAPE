import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Components/Axios';
import { useParams, Link } from 'react-router-dom';

const UserCartDetail = () => {
  const { userId } = useParams();  // Get userId from URL
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // NOTE: No leading slash here to avoid URL issues with Axios baseURL
    AxiosInstance.get(`admin/carts/${userId}/`)
      .then(response => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart details:', error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Cart Items for User {userId}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>No items in this user's cart.</p>
      ) : (
        <ul className="list-disc pl-5">
          {cartItems.map(item => (
            <li key={item.id}>
              <strong>{item.product.name}</strong> - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <Link to="/admin/carts" className="text-blue-600 hover:underline mt-4 inline-block">
        Back to Users with Carts
      </Link>
    </div>
  );
};

export default UserCartDetail;
