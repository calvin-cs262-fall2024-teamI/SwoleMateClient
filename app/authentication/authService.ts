// src/auth/authService.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/config";

export interface User {
  id: string;
  emailAddress: string;
  username: string;
  token?: string;
}

// Sign Up function
export const signUp = async (email: string, password: string, username: string): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/auth/signup`, {
      emailAddress: email,
      passwordHash: password,
      username: username,
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
};

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: email,
      password: password,
    });
    const { token, user } = response.data;
    await AsyncStorage.setItem("userToken", token); // Store JWT
    return user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem("userToken");
};
