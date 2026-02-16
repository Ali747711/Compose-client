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
    const token = localStorage.getItem("token");

    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

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
      const requestUrl = error.config?.url || "";
      const isAuthRequest =
        requestUrl.includes("/user/login") ||
        requestUrl.includes("/user/signup");

      // Skip redirect for login/signup - let the component handle the error
      if (!isAuthRequest) {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
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
