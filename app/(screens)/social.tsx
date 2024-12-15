/**
 * @fileoverview Social screen component for managing buddy connections and chat
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { api } from "@/api";
import { socialUser } from "@/api/interfaces";
import { router } from "expo-router";
import BaseView from "../components/BaseView";
import storage from "@/storage";

/** Type representing the different tabs in the social screen */
type TabType = "matched" | "pending" | "requests";

/**
 * Social screen component that displays matched users, pending requests, and incoming requests
 * Allows users to accept buddy requests and initiate chats with matched users
 * @returns JSX.Element
 */
export default function Social() {
  const [activeTab, setActiveTab] = useState<TabType>("matched");
  const [matchedUsers, setMatchedUsers] = useState<socialUser[]>([]);
  const [requests, setRequests] = useState<socialUser[]>([]);
  const [pendingUsers, setPendingUsers] = useState<socialUser[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetches and formats the list of matched buddy users
   */
  const fetchMatchedUsers = async () => {
    try {
      setLoading(true);
      const users = await api.buddymatches.getMatches();
      const formattedUsers = users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        status: "matched",
        profilePictureURL: user.profilePictureUrl,
      }));
      setMatchedUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching matched users:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches and formats the list of incoming buddy requests
   */
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const requestUsers = await api.buddymatches.getRequests();
      const formattedUsers = requestUsers.map(user => ({
        matchId: user.matchId,
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        status: "request",
        profilePictureURL: user.profilePictureUrl,
      }));
      setRequests(formattedUsers);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches and formats the list of pending buddy requests
   */
  const fetchPending = async () => {
    try {
      setLoading(true);
      const users = await api.buddymatches.getPending();
      const formattedUsers = users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        status: "pending",
        profilePictureURL: user.profilePictureUrl,
      }));
      setPendingUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching pending users:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches data based on the currently active tab
   */
  const fetchActiveTabData = () => {
    if (activeTab === "matched") {
      fetchMatchedUsers();
    } else if (activeTab === "requests") {
      fetchRequests();
    } else if (activeTab === "pending") {
      fetchPending();
    }
  };

  useEffect(() => {
    fetchActiveTabData();
  }, [activeTab]);

  /**
   * Handles accepting a buddy request
   * @param buddyMatchId - ID of the buddy match to accept
   */
  const handleAcceptRequest = async (buddyMatchId: number) => {
    try {
      await api.buddymatches.acceptRequest(buddyMatchId);
      fetchMatchedUsers();
      fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  /**
   * Renders an individual user item in the list
   * @param item - User data to display
   */
  const renderUserItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="flex-row items-center mx-4 my-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100"
      onPress={async () => {
        if (activeTab === "matched") {
          const { id } = await storage.getUser();
          const chatRoomId = await api.chatRoom.getOrCreateRoomId({
            user1Id: item.id,
            user2Id: id,
          });

          console.log("Chat Room ID:", chatRoomId);

          router.push({
            pathname: "/chat/[userID]",
            params: {
              userID: item.id,
              profilePictureURL: item.profilePictureURL,
              name: item.name,
              chatRoomId,
            },
          });
        }
      }}
    >
      <Image
        source={
          item.profilePictureURL
            ? { uri: item.profilePictureURL }
            : require("@/assets/portrait_placeholder.png")
        }
        className="w-14 h-14 rounded-full"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-sm text-gray-500 capitalize">{item.status}</Text>
      </View>
      {activeTab === "requests" && (
        <TouchableOpacity
          className="bg-blue-500 px-5 py-2.5 rounded-lg shadow-sm"
          onPress={() => handleAcceptRequest(item.matchId)}
        >
          <Text className="text-white font-semibold">Accept</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  /**
   * Renders a tab button for navigation
   * @param title - Text to display in the tab
   * @param type - Type of tab to render
   */
  const TabButton = ({ title, type }: { title: string; type: TabType }) => (
    <TouchableOpacity
      className={`flex-1 py-3 ${
        activeTab === type ? "border-b-2 border-blue-500" : ""
      }`}
      onPress={() => setActiveTab(type)}
    >
      <Text
        className={`text-center text-base ${
          activeTab === type ? "text-blue-500 font-bold" : "text-gray-500"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <BaseView edges={[]} className="flex-1">
      <View className="flex-row bg-white border-b border-gray-200 mb-2">
        <TabButton title="Matched" type="matched" />
        <TabButton title="Pending" type="pending" />
        <TabButton title="Requests" type="requests" />
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={
            activeTab === "matched"
              ? matchedUsers
              : activeTab === "requests"
                ? requests
                : activeTab === "pending"
                  ? pendingUsers
                  : []
          }
          renderItem={renderUserItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-10">
              <Text className="text-gray-500 text-lg">No users found</Text>
            </View>
          }
        />
      )}
    </BaseView>
  );
}
