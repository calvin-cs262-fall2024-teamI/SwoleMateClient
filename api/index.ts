import { Alert } from "react-native";
import axiosInstance from "./axios";
import { IUser, LoginResponse } from "./interfaces";
import storage from "@/storage";

export const api = {
  users: {
    getUsers: async () => {
      const rsp = await axiosInstance.get("/users");
      return rsp.data.data as IUser[];
    },

    getUser: async (id: number) => {
      const rsp = await axiosInstance.get(`/users/${id}`);
      return rsp.data.data as IUser;
    },

    updateUser: async (id: number, data: Partial<IUser>) => {
      return await axiosInstance.put<IUser>(`/users/${id}`, data);
    },

    createUser: async (data: Omit<IUser, "id">) => {
      return await axiosInstance.post<IUser>("/users", data);
    },
  },

  auth: {
    login: async (emailAddress: string, password: string) => {
      const rsp = await axiosInstance.post<LoginResponse>("/auth/login", {
        emailAddress,
        password,
      });
      if (rsp.data.success) {
        const { accessToken, refreshToken, id, username, emailAddress } =
          rsp.data.data;
        storage.setToken(accessToken);
        storage.setRefreshToken(refreshToken);
        storage.setUser({ id, username, emailAddress });

        return true;
      }
      Alert.alert("Login Failed", rsp.data.msg || "Unknown error");
      return false;
    },

    register: async (data: {
      emailAddress: string;
      password: string;
      username: string;
    }) => {
      return await axiosInstance.post("/auth/register", data);
    },

    refresh: async () => {
      return await axiosInstance.post("/auth/refresh");
    },

    logout: async () => {
      return await axiosInstance.post("/auth/logout");
    },
  },
};

export type Api = typeof api;
