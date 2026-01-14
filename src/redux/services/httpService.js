import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ send refresh cookie
});

const responseBody = (res) => res.data;

// token helpers
const getAccessToken = () => localStorage.getItem("accessToken");
const setAccessToken = (token) => localStorage.setItem("accessToken", token);
const clearAccessToken = () => localStorage.removeItem("accessToken");

// IMPORTANT: refresh should use plain axios to avoid interceptor loops
const refreshAccessToken = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/user/refresh`, {
    withCredentials: true,
    headers: { Accept: "application/json" },
  });

  const token = data?.accessToken || data?.token;
  if (!token) throw new Error("No access token returned from refresh");
  return token;
};

// 1) attach access token to every request
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 2) auto refresh on 403 and retry original request
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    const status = error.response.status;
    const isRefreshCall = originalRequest?.url?.includes("/user/refresh");

    if (status === 403 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (e) {
        clearAccessToken();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

// ====== requests wrapper ======
const requests = {
  get: (url, params, config) =>
    instance.get(url, { params, ...(config || {}) }).then(responseBody),

  post: (url, data, config) =>
    instance.post(url, data, config).then(responseBody),

  put: (url, data, config) =>
    instance.put(url, data, config).then(responseBody),

  patch: (url, data, config) =>
    instance.patch(url, data, config).then(responseBody),

  delete: (url, config) =>
    instance.delete(url, config).then(responseBody),
};

export default requests;
export { instance };
export { refreshAccessToken };