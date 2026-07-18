import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default (baseURL) => {
  const instance = axios.create({
    baseURL,
    ...commonConfig,
  });

  // Gắn token vào header của mỗi request nếu người dùng đã đăng nhập
  instance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });

  return instance;
};