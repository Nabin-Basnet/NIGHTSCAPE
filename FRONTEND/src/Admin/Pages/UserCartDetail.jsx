import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../Components/Axios'; // your auth-configured axios

const UserCartDetail = () => {
  const { userId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get(`admin/carts/${userId}/`)
      .then(res => {
        setCartItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user cart:', err);
        setLoading(false);
      });
  }, [userId]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Cart Details for User ID: {userId}
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>No items found in this user's cart.</p>
      ) : (
        <>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Product</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="py-2 px-4">{item.product.name}</td>
                  <td className="py-2 px-4">Rs. {item.product.price}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">
                    Rs. {item.product.price * item.quantity}
                  </td>
                </tr>
              ))}
              <tr className="font-bold border-t">
                <td className="py-2 px-4" colSpan="3">Total</td>
                <td className="py-2 px-4">Rs. {total}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserCartDetail;
