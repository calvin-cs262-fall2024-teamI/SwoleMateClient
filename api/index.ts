import { Alert } from "react-native";
import axiosInstance from "./axios";
import {
  IUser,
  LoginResponse,
  IMatch,
  socialUser,
  IReview,
  RegisterRequest,
} from "./interfaces";
import storage from "@/storage";
import { ExperienceLevel, Gender } from "./enums";

export const api = {
  users: {
    getUsers: async (
      filters?: Partial<{
        gender: string;
        age: number;
        experienceLevel: string;
        isTrainer: boolean;
      }>
    ) => {
      console.log("filters", filters);

      const rsp = await axiosInstance.get("/users", {
        params: filters || {},
      });
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

  reviews: {
    getReviews: async () => {
      const rsp = await axiosInstance.get("/reviews");
      return rsp.data.data as IReview[];
    },
    getReviewsFor: async (userId: number) => {
      const rsp = await axiosInstance.get(`/reviews?reviewedId=${userId}`);
      return rsp.data.data as IReview[];
    },
    createReview: async (data: Omit<IReview, "id">) => {
      return await axiosInstance.post<IReview>("/reviews", data);
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
        console.log("rsp", data);
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
      try {
        const { id } = await storage.getUser();

        if (!id) {
          console.error("id is not in storage");
          return;
        }
        const uploadResponse = await axiosInstance.post(
          `/auth/upload-profile-picture/${id}`,
          profileImageForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        Alert.alert("Failed to upload profile picture.");
      }
    },
  },

  buddymatches: {
    getMatches: async () => {
      const { id } = await storage.getUser();
      const receivers = await axiosInstance.get(
        `/buddymatches?receiverId=${id}&status=accepted`
      );
      const requesters = await axiosInstance.get(
        `/buddymatches?requesterId=${id}&status=accepted`
      );

      const matches = [...receivers.data.data, ...requesters.data.data];

      const users = await Promise.all(
        matches.map(async (match: IMatch) => {
          const user = await api.users.getUser(
            match.requesterId === id ? match.receiverId : match.requesterId
          );
          return {
            ...user,
            matchId: match.id,
            status: match.status,
          };
        })
      );

      return users;
    },
    getPending: async () => {
      const { id } = await storage.getUser();
      const response = await axiosInstance.get(
        `/buddymatches?requesterId=${id}&status=pending`
      );

      const matches = response.data.data;

      const users = await Promise.all(
        matches.map(async (match: IMatch) => {
          const user = await api.users.getUser(match.receiverId);
          return {
            ...user,
            matchId: match.id,
            status: match.status,
          };
        })
      );

      return users;
    },
    getRequests: async () => {
      const { id } = await storage.getUser();
      const response = await axiosInstance.get(
        `/buddymatches?receiverId=${id}&status=pending`
      );

      const matches = response.data.data;

      const users = await Promise.all(
        matches.map(async (match: IMatch) => {
          const user = await api.users.getUser(match.requesterId);
          return {
            ...user,
            matchId: match.id,
            status: match.status,
          };
        })
      );

      return users;
    },
    acceptRequest: async (buddyMatchId: number) => {
      try {
        const myUser = await storage.getUser();

        if (!myUser || !myUser.id) {
          throw new Error("User not found or not logged in.");
        }

        // Step 2: Update its status to 'accepted'
        const updateResponse = await axiosInstance.put(
          `/buddymatches/${buddyMatchId}`,
          {
            status: "accepted",
          }
        );

        if (!updateResponse.data.success) {
          throw new Error("Failed to update match status.");
        }

        return true;
      } catch (error) {
        console.log(error);
      }
    },
    sendRequest: async (receiverId: number) => {
      try {
        const myUser = await storage.getUser();

        if (!myUser || !myUser.id) {
          throw new Error("User not found or not logged in.");
        }

        const response = await axiosInstance.post("/buddymatches", {
          requesterId: myUser.id,
          receiverId: receiverId,
          status: "pending",
        });

        if (!response.data.success) {
          throw new Error("Failed to send buddy match request.");
        }

        return true;
      } catch (error) {
        console.error("Error sending buddy match request:", error);
        return false;
      }
    },
  },
};

export type Api = typeof api;
