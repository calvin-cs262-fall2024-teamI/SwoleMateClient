/**
 * @fileoverview Main API client implementation
 */

import { Alert } from "react-native";
import axiosInstance from "./axios";
import {
  IUser,
  LoginResponse,
  IMatch,
  socialUser,
  IReview,
  RegisterRequest,
  IMessage,
} from "./interfaces";
import storage from "@/storage";
import { ExperienceLevel, Gender } from "./enums";

/**
 * API client object containing all API endpoints and methods
 */
export const api = {
  users: {
    /**
     * Get users with optional filters
     * @param filters - Optional filters for user search
     * @returns Promise containing array of users
     */
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

    /**
     * Get a single user by ID
     * @param id - User ID
     * @returns Promise containing user data
     */
    getUser: async (id: number) => {
      const rsp = await axiosInstance.get(`/users/${id}`);
      return rsp.data.data as IUser;
    },

    /**
     * Update a user's information
     * @param id - User ID to update
     * @param data - Partial user data to update
     * @returns Promise containing updated user data
     */
    updateUser: async (id: number, data: Partial<IUser>) => {
      return await axiosInstance.put<IUser>(`/users/${id}`, data);
    },

    /**
     * Create a new user
     * @param data - User data without ID
     * @returns Promise containing created user data
     */
    createUser: async (data: Omit<IUser, "id">) => {
      return await axiosInstance.post<IUser>("/users", data);
    },
  },

  reviews: {
    /**
     * Get all reviews
     * @returns Promise containing array of reviews
     */
    getReviews: async () => {
      const rsp = await axiosInstance.get("/reviews");
      return rsp.data.data as IReview[];
    },

    /**
     * Get reviews for a specific user
     * @param userId - ID of user to get reviews for
     * @returns Promise containing array of reviews
     */
    getReviewsFor: async (userId: number) => {
      const rsp = await axiosInstance.get(`/reviews?reviewedId=${userId}`);
      return rsp.data.data as IReview[];
    },

    /**
     * Create a new review
     * @param data - Review data without ID
     * @returns Promise containing created review data
     */
    createReview: async (data: Omit<IReview, "id">) => {
      return await axiosInstance.post<IReview>("/reviews", data);
    },
  },

  auth: {
    /**
     * Login user with email and password
     * @param emailAddress - User's email address
     * @param password - User's password
     * @returns Promise<boolean> indicating login success
     */
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

    /**
     * Register a new user
     * @param data - Registration data
     * @returns Promise<boolean> indicating registration success
     */
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

    /**
     * Refresh authentication token
     * @param token - Refresh token
     * @returns Promise containing new access token
     */
    refresh: async (token: string) => {
      return await axiosInstance.post("/auth/refresh", {
        refreshToken: token,
      });
    },

    /**
     * Logout current user
     * @returns Promise indicating logout success
     */
    logout: async () => {
      return await axiosInstance.post("/auth/logout");
    },
  },
  image: {
    /**
     * Upload a profile image
     * @param profileImageForm - Form data containing image
     * @returns Promise indicating upload success
     */
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
    /**
     * Get all accepted buddy matches for current user
     * @returns Promise containing array of matched users
     */
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

    /**
     * Get pending buddy match requests sent by current user
     * @returns Promise containing array of pending match users
     */
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

    /**
     * Get pending buddy match requests received by current user
     * @returns Promise containing array of requesting users
     */
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

    /**
     * Accept a buddy match request
     * @param buddyMatchId - ID of buddy match to accept
     * @returns Promise<boolean> indicating acceptance success
     */
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

    /**
     * Send a buddy match request to another user
     * @param receiverId - ID of user to send request to
     * @returns Promise<boolean> indicating request success
     */
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
  chatRoom: {
    /**
     * Get existing chat room ID or create new one for two users
     * @param params - Object containing user IDs
     * @param params.user1Id - First user's ID
     * @param params.user2Id - Second user's ID
     * @returns Promise containing chat room ID or false if failed
     */
    getOrCreateRoomId: async ({
      user1Id,
      user2Id,
    }: {
      user1Id: number;
      user2Id: number;
    }) => {
      // Ensure user1Id is always the smaller number
      if (user1Id > user2Id) {
        const temp = user1Id;
        user1Id = user2Id;
        user2Id = temp;
      }
      try {
        // First try to get existing room
        const getResponse = await axiosInstance.get(`/chatrooms`, {
          params: {
            user1Id,
            user2Id,
          },
        });

        // If room exists, return its ID
        if (getResponse.data.data && getResponse.data.data.length > 0) {
          return getResponse.data.data[0].id;
        }

        // If no room exists, create a new one
        const createResponse = await axiosInstance.post(`/chatrooms`, {
          user1Id,
          user2Id,
        });

        if (!createResponse.data.success) {
          throw new Error("Failed to create chat room");
        }

        return createResponse.data.data.id;
      } catch (error) {
        console.error("Error getting/creating chat room:", error);
        return false;
      }
    },
  },
  messages: {
    /**
     * Get all messages from a chat room
     * @param chatRoomId - ID of chat room to get messages from
     * @returns Promise containing array of messages
     */
    fromRoomId: async (chatRoomId: number) => {
      const response = await axiosInstance.get("/chatmessages", {
        params: { chatRoomId },
      });
      return response.data.data as IMessage[];
    },

    /**
     * Send a message in a chat room
     * @param params - Object containing message details
     * @param params.chatRoomId - ID of chat room to send message in
     * @param params.messageText - Text content of message
     * @returns Promise containing sent message data
     */
    send: async ({
      chatRoomId,
      messageText,
    }: {
      chatRoomId: number;
      messageText: string;
    }) => {
      const { id: senderId } = await storage.getUser();
      const response = await axiosInstance.post("/chatmessages", {
        chatRoomId,
        senderId,
        messageText,
      });
      return response.data.data as IMessage;
    },
  },
};

export type Api = typeof api;
