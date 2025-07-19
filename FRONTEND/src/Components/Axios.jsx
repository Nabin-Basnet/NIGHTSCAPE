// src/Components/Axios.js
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: "https://your-backend.onrender.com/api/",
});

// ✅ Attach access token on every request
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;
