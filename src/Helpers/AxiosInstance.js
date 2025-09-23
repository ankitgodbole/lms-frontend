// src/api/axiosInstance.js
import axios from "axios";
import toast from "react-hot-toast";

// ✅ Base URL from environment variables
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3003";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
});

// ✅ Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from Redux/Context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle expired/invalid token globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message?.toLowerCase().includes("unauthenticated")
    ) {
      localStorage.removeItem("token"); // clear token
      toast.error("Session expired, please login again");
      window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
