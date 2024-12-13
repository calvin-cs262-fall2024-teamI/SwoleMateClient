import { Alert } from "react-native";
import axiosInstance from "./axios";
import {
  IUser,
  LoginResponse,
  IMatch,
  socialUser,
  RegisterRequest,
} from "./interfaces";
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
    getUsers: async (status: string) => {
      try {
        const { id } = await storage.getUser();
        console.log("myid", id);

        // Fetch all = matches
        console.log(`/buddymatches?requesterId=${id}&status=${status}`);
        const rsp = await axiosInstance.get(
          `/buddymatches?requesterId=${id}&status=${status}`
        );

        // Validate the response structure
        if (!rsp.data || !rsp.data.data || !Array.isArray(rsp.data.data)) {
          throw new Error(
            "Unexpected response structure from buddy matches endpoint."
          );
        }

        const Matches = rsp.data.data;
        console.log("Matches:", Matches);
        if (Matches.length === 0) {
          return []; // Return empty array if no matches are found
        }

        // Fetch profiles for all receiver IDs
        const socialUsers: socialUser[] = await Promise.all(
          Matches.map(async (match: IMatch) => {
            if (!match.receiverId) {
              throw new Error(
                `Missing receiverId in match: ${JSON.stringify(match)}`
              );
            }

            const userProfileRsp = await api.users.getUser(match.receiverId);
            console.log(userProfileRsp);

            const { firstName, lastName, profilePictureUrl, id } =
              userProfileRsp;

            return {
              id,
              name: `${firstName} ${lastName}`,
              status: match.status, // Use status from the match data
              profilePictureURL: profilePictureUrl,
            } as socialUser;
          })
        );

        return socialUsers;
      } catch (error) {
        console.error("Error fetching social users:", error);
        throw new Error(
          "Could not fetch social users. Please try again later."
        );
      }
    },
    getRequests: async () => {
      try {
        const { id } = await storage.getUser();
        console.log("myid", id);

        // Fetch all = matches
        console.log(`/buddymatches?receiverId=${id}`);
        const rsp = await axiosInstance.get(`/buddymatches?receiverId=${id}`);

        // Validate the response structure
        if (!rsp.data || !rsp.data.data || !Array.isArray(rsp.data.data)) {
          throw new Error(
            "Unexpected response structure from buddy matches endpoint."
          );
        }

        const Matches = rsp.data.data;
        console.log("Matches:", Matches);
        if (Matches.length === 0) {
          return []; // Return empty array if no matches are found
        }

        // Fetch profiles for all receiver IDs
        const socialUsers: socialUser[] = await Promise.all(
          Matches.map(async (match: IMatch) => {
            if (!match.requesterId) {
              throw new Error(
                `Missing requesterId in match: ${JSON.stringify(match)}`
              );
            }

            const userProfileRsp = await api.users.getUser(match.requesterId);
            console.log(userProfileRsp);

            const { firstName, lastName, profilePictureUrl, id } =
              userProfileRsp;

            return {
              id,
              name: `${firstName} ${lastName}`,
              status: match.status, // Use status from the match data
              profilePictureURL: profilePictureUrl,
            } as socialUser;
          })
        );

        return socialUsers;
      } catch (error) {
        console.error("Error fetching social users:", error);
        throw new Error(
          "Could not fetch social users. Please try again later."
        );
      }
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
  },
};

export type Api = typeof api;
