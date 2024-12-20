/**
 * @fileoverview Axios instance configuration with interceptors for API requests
 */

import axios from "axios";
import { AxiosError } from "axios";
import storage from "@/storage/";
import { BaseResponse } from "./interfaces";
import { api } from "./index";
import {
  refreshToken,
  retryRequestWithNewToken,
  logApiError,
} from "@/utils/authUtils";

/** Base URL for the API */
const BASE_URL = "https://swolemate-service.azurewebsites.net/api";

/**
 * Configured axios instance with base URL and default settings
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor to add authentication token to requests
 */
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

/**
 * Response interceptor to handle API responses and token refresh
 */
axiosInstance.interceptors.response.use(
  response => {
    const apiResponse = response.data as BaseResponse;
    if (!apiResponse.success) {
      console.error(apiResponse.msg);
    }
    return response;
  },
  async (error: AxiosError<BaseResponse>) => {
    //deal with jwt token expiration

    if (error.response?.data?.msg === "jwt expired") {
      try {
        const newToken = await refreshToken();
        return retryRequestWithNewToken(error.config!, newToken);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        await storage.clear();
        throw refreshError;
      }
    }

    logApiError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
