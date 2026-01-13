import axios, { type AxiosError, type AxiosResponse } from "axios";

// Create axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor - DYNAMICALLY add token on each request
apiClient.interceptors.request.use(
  (config) => {
    // Get fresh token from localStorage on EVERY request
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("userData");
      localStorage.removeItem("token"); // ✅ Also remove token
      window.location.href = "/";
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden");
    }

    // Handle 500 - Server Error
    if (error.response?.status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);
