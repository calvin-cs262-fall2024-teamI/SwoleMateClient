/**
 * @fileoverview Authentication utility functions for token management
 */

import { AxiosRequestConfig, AxiosError } from "axios";
import axiosInstance from "@/api/axios";
import storage from "@/storage";
import { api } from "@/api";

/**
 * Refreshes the authentication token
 * @returns Promise containing new access token
 * @throws Error if refresh token is missing or refresh fails
 */
export async function refreshToken(): Promise<string> {
  const refreshToken = await storage.getRefreshToken();
  if (!refreshToken) {
    throw new Error("Refresh token not in storage");
  }

  const refreshResponse = await api.auth.refresh(refreshToken);
  const newAccessToken = refreshResponse.data.data.accessToken;
  const newRefreshToken = refreshResponse.data.data.refreshToken; //for now both refresh token and accesstoken is updated in the backend
  // Check if newAccessToken is properly set
  if (!newAccessToken) {
    throw new Error("Failed to obtain a new access token");
  }
  await storage.setToken(newAccessToken);
  await storage.setRefreshToken(newRefreshToken);

  return newAccessToken;
}

/**
 * Retries a failed request with a new token
 * @param originalRequest - Original axios request config
 * @param newToken - New authentication token
 * @returns Promise with request response
 */
export function retryRequestWithNewToken(
  originalRequest: AxiosRequestConfig,
  newToken: string
): Promise<any> {
  if (!originalRequest) {
    throw new Error("Original request configuration is missing");
  }

  const updatedRequest = {
    ...originalRequest,
    headers: {
      ...originalRequest.headers,
      Authorization: `Bearer ${newToken}`,
    },
  };

  return axiosInstance(updatedRequest);
}

export function logApiError(error: AxiosError) {
  console.error("API Error:", error.response?.data || error.message);
}
