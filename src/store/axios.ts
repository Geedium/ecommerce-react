/**
 * axios
 *
 * Promise based HTTP client for the
 * browser and node.js
 */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    typeof window === "undefined"
      ? `${process.env.NEXT_PUBLIC_API_HOST || process.env.VERCEL_URL}/api`
      : "/api",
  withCredentials: false,
});

export default axiosInstance;
