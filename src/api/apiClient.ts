import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  // && !config.headers.Authorization 도 추가해서 헤더에 기존 토큰 유무를 확인할 수도 있음
  if (accessToken && config.headers && !config.headers.Authorization) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
