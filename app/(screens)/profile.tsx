import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { api } from "@/api";
import { IUser } from "@/api/interfaces";
import { Redirect, router } from "expo-router";
import storage from "@/storage";

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { id } = await storage.getUser();
        const userData = await api.users.getUser(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        storage.clear();
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Failed to load profile</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="items-center pt-6 pb-4">
        <Image
          source={
            user.profilePictureUrl
              ? { uri: user.profilePictureUrl }
              : require("@/assets/avatars/1.png")
          }
          className="w-32 h-32 rounded-full"
        />
        <Text className="text-2xl font-bold mt-4">
          {user.firstName} {user.lastName}
        </Text>
        <Text className="text-gray-600 text-lg">@{user.username}</Text>
        <Text className="text-gray-500 mt-1">{user.emailAddress}</Text>
        <Text className="text-gray-400 mt-1">ID: {user.id}</Text>
      </View>
      <View className="bg-white p-4 mx-4 rounded-xl shadow-sm">
        <Text className="text-lg font-semibold mb-2">About Me</Text>
        <Text className="text-gray-700">{user.bio}</Text>
      </View>

      <View className="bg-white p-4 mx-4 mt-4 rounded-xl shadow-sm">
        <Text className="text-lg font-semibold mb-2">Personal Details</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Age</Text>
          <Text>{user.age} years</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Gender</Text>
          <Text className="capitalize">{user.gender}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Location</Text>
          <Text>{user.city}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Height</Text>
          <Text>
            {user.height_feet}&apos;{user.height_inches}&quot;
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Weight</Text>
          <Text>{user.weight} lbs</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Experience Level</Text>
          <Text className="capitalize">{user.experienceLevel}</Text>
        </View>
        {user.isTrainer && (
          <>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Trainer Status</Text>
              <Text className="text-green-500">Active Trainer</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Training Rate</Text>
              <Text className="text-blue-500">${user.cost}/session</Text>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        className="bg-blue-500 mx-4 mt-6 mb-4 p-4 rounded-xl"
        onPress={() => router.push("/edit_profile")}
      >
        <Text className="text-white text-center font-semibold">
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 mx-4 mb-8 p-4 rounded-xl"
        onPress={async () => {
          try {
            //await api.auth.logout();
            await storage.clear();
            router.replace("/welcome");
          } catch (error) {
            console.error("Error logging out:", error);
          }
        }}
      >
        <Text className="text-white text-center font-semibold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
