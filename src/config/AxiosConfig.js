import axios from "axios";
import { toast } from "react-toastify";

const baseurls = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseurls,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    // Handle request error
    toast.error(error);
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor: Response received");
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error(
        "Response Interceptor: Unauthorized access - Redirecting to login"
      );
      console.error(
        "Response Interceptor: Unauthorized access - Redirecting to login"
      );
    } else {
      toast.error(error.message);
      console.error("Response Interceptor Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
