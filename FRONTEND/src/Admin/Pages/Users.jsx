import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Components/Axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No access token found. Please login.");
        return;
      }

      try {
        const response = await AxiosInstance.get('users/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(
          err.response?.status === 401
            ? 'Unauthorized. Please login again.'
            : 'Failed to fetch users.'
        );
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {users.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No users found.</p>
      )}
    </div>
  );
}
