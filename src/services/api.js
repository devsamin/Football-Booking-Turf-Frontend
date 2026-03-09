// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔥 Request interceptor — সব request এ token যোগ হবে
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
import axios from "axios";

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: "https://football-booking-turf-backend.onrender.com/api/",
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let loaderHandler;
let requestCount = 0;

export const injectLoader = (handler) => {
  loaderHandler = handler;
};

// 🔥 Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    requestCount++;
    loaderHandler?.(true);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 🔥 Response Interceptor
api.interceptors.response.use(
  (response) => {
    requestCount--;

    if (requestCount === 0) {
      setTimeout(() => loaderHandler?.(false), 300);
    }

    return response;
  },
  (error) => {
    requestCount--;

    if (requestCount === 0) {
      setTimeout(() => loaderHandler?.(false), 300);
    }

    // 🔐 Token expired হলে logout
    if (error.response?.status === 401) {
      const token = localStorage.getItem("access");

      // শুধু তখন redirect করবে যখন user আগে login ছিল
      if (token) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
