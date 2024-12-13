import { Alert } from "react-native";
import axiosInstance from "./axios";
import { IUser, LoginResponse, RegisterRequest } from "./interfaces";
import storage from "@/storage";
import { ExperienceLevel, Gender } from "./enums";

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

    register: async (data: RegisterRequest) => {
      try {
        const rsp = await axiosInstance.post("/auth/register", data);
        if (rsp.data.success) {
          const { accessToken, refreshToken, id, username, emailAddress } =
            rsp.data.data;
          storage.setToken(accessToken);
          storage.setRefreshToken(refreshToken);
          storage.setUser({ id, username, emailAddress });

          return true;
        }
        Alert.alert("Registration Failed", rsp.data.msg || "Unknown error");
        return false;
      } catch (error) {
        console.error("Registration error:", error);
        Alert.alert(
          "Registration Failed",
          "An error occurred during registration."
        );
        return false;
      }
    },

    refresh: async (token: string) => {
      return await axiosInstance.post("/auth/refresh", {
        refreshToken: token,
      });
    },

    logout: async () => {
      return await axiosInstance.post("/auth/logout");
    },
  },
  image: {
    upload: async (profileImageForm: FormData) => {
      console.log(profileImageForm);
      try {
        const { id } = await storage.getUser();
        console.log("id is: ", id);
        if (!id) {
          console.error("id is not in storage");
          return;
        }
        const uploadResponse = await axiosInstance.post(
          `/auth/upload-profile-picture/${id}`,
          profileImageForm
        );
        console.log("Upload response:", uploadResponse);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        Alert.alert("Failed to upload profile picture.");
      }
    },
  },
};

export type Api = typeof api;
