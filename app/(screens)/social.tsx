import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "@/api"; // Importing the API module

const ChatItem = ({ item }: { item: any }) => (
  <TouchableOpacity
    className="flex-row items-center p-4 border-b border-gray-200"
    onPress={() => {
      router.push({
        pathname: "/chat/[userID]",
        params: { userID: item.id },
      });
    }}
  >
    <Image
      source={{ uri: item.profilePictureURL }}
      className="w-12 h-12 rounded-full mr-4"
    />
    <View className="flex-1">
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-sm text-gray-500">{item.status}</Text>
    </View>
    <Text className="text-sm text-gray-400">{item.time}</Text>
  </TouchableOpacity>
);

const TabContent = ({ activeTab }: { activeTab: string }) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [pendings, setPendings] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchSocialUsers = async () => {
      try {
        if (activeTab === "Matched" || activeTab === "Pending") {
          const status = activeTab === "Matched" ? "accepted" : "pending";
          const users = await api.buddymatches.getUsers(status);
          console.log(users);
          if (activeTab === "Matched") {
            setMatches(users);
          } else {
            setPendings(users);
          }
        } else if (activeTab === "Requests") {
          const users = await api.buddymatches.getRequests();
          console.log(users);
          setRequests(users);
        }
      } catch (error) {
        Alert.alert("Error", "Unable to fetch data. Please try again later.");
      }
    };

    fetchSocialUsers();
  }, [activeTab]);

  switch (activeTab) {
    case "Matched":
      return (
        <FlatList
          data={matches}
          renderItem={({ item }) => <ChatItem item={item} />}
          keyExtractor={item => item.id.toString()}
        />
      );
    case "Pending":
      return (
        <FlatList
          data={pendings}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-4 border-b border-gray-200">
              <Image
                source={{ uri: item.profilePictureURL }}
                className="w-12 h-12 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">
                  {item.name}
                </Text>
                <Text className="text-sm text-yellow-500">Pending</Text>
              </View>
              <Text className="text-sm text-gray-400">{item.time}</Text>
              <TouchableOpacity className="w-6 h-6 flex items-center justify-center ml-4 bg-gray-200 rounded-full">
                <Text className="text-gray-500">x</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      );
    case "Requests":
      return (
        <FlatList
          data={requests}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-4 border-b border-gray-200">
              <Image
                source={{ uri: item.profilePictureURL }}
                className="w-12 h-12 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500">Requesting</Text>
              </View>
              <Text className="text-sm text-gray-400">{item.time}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      );
    default:
      return null;
  }
};

const RecentChatsScreen = () => {
  const [activeTab, setActiveTab] = useState("Matched");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-800">Recent Chats</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-row border-b border-gray-200">
        {["Matched", "Pending", "Requests"].map((tab, index) => (
          <TouchableOpacity
            key={`tab-${index}`}
            className={`flex-1 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-transparent"
            }`}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-center text-sm font-medium ${
                activeTab === tab ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TabContent activeTab={activeTab} />
    </SafeAreaView>
  );
};

export default RecentChatsScreen;
