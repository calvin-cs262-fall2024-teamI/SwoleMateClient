import axios from "axios";
import { AxiosError } from "axios";
import storage from "@/storage/";
import { BaseResponse } from "./interfaces";

const BASE_URL = "http://10.25.14.170:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await storage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    const apiResponse = response.data as BaseResponse;
    if (!apiResponse.success) {
      console.error(apiResponse.msg);
    }
    return response;
  },
  (error: AxiosError<BaseResponse>) => {
    console.error("API Error:", error.response?.data);
    return error.response;
  }
);

export default axiosInstance;
