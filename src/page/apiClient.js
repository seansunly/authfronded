import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Set your backend API base URL
});

// ✅ Request Interceptor: Attach Token Automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Ensure token is stored correctly
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle Token Expiry
apiClient.interceptors.response.use(
  (response) => response, // Simply return response if it's successful
  (error) => {
    if (error.response && error.response.status === 401) {
      // If Unauthorized (Token Expired), Clear Token & Redirect to Login
      console.log("Token expired. Redirecting to login...");
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
