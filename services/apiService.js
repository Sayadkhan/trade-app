import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      Cookies.remove("access_token");
      window.location.href = "/sign-in";
    }
    console.error("API Error:", response || error.message);
    return Promise.reject(error);
  }
);

// API service methods
const apiService = {
  get: async (url, config) => {
    const response = await api.get(url, config);
    return response.data;
  },

  post: async (url, data, config) => {
    const response = await api.post(url, data, config);
    return response.data;
  },

  put: async (url, data, config) => {
    const response = await api.put(url, data, config);
    return response.data;
  },

  delete: async (url, config) => {
    const response = await api.delete(url, config);
    return response.data;
  },
};

export default apiService;
