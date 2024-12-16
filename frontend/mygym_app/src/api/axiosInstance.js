import axios from "axios";
import { logout, setCredentials } from "../store/features/authSlice";
import store from "../store/store";

const api = axios.create({
  baseURL: "http://13.200.155.3/",
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const response = await api.post(
      "users/token/refresh/",
      {},
      { withCredentials: true }
    );
    return response.data.access;
  } catch (error) {
    console.error("Unable to refresh token:", error);
    return null;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor to handle 401 errors (expired tokens)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.error === "Invalid token"
    ) {
      originalRequest._retry = true;
      dispatch(logout());
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        store.dispatch(
          setCredentials({
            accessToken: newAccessToken,
            user: store.getState().auth.user,
          })
        );
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
