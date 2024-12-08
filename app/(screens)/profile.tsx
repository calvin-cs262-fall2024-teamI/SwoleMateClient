import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "../../nonapp/UserContext";
import placeholderImage from "@/assets/portrait_placeholder.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/nonapp/axiosConfig";
import { MaterialIcons } from "@expo/vector-icons";

interface UserProfile {
  username?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  height_feet?: number;
  height_inches?: number;
  weight?: number;
  preferredTime?: string;
  workoutType?: string;
  experienceLevel?: string;
  bio?: string;
  profilePictureUrl?: string | null;
}

export default function Profile() {
  const router = useRouter();
  const context = useContext(UserContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  //Get the info from database:
  useEffect(() => {
    console.log("User ID:", context?.userId);
    if (context?.userId) {
      const fetchProfile = async () => {
        try {
          const response = await apiClient.get(
            //get the userId from the context. We stored this id to context when user signed in
            `/api/users/${context.userId}`,
            {
              headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`,
              },
            }
          );

          if (response.status === 200) {
            setProfile(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [context?.userId]);
  const handleLogOut = async () => {
    if (context?.clearUserId) {
      await context.clearUserId();
      router.replace("/welcome");
    }
  };

  if (!profile) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-red-500 text-lg mb-4">
            Failed to load profile data.
          </Text>
          <TouchableOpacity
            className="bg-red-500 px-6 py-3 rounded-full"
            onPress={handleLogOut}
          >
            <Text className="text-white font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="bg-white rounded-b-3xl shadow-md pb-6">
          <View className="items-center pt-6">
            <View className="relative">
              <Image
                source={
                  profile.profilePictureUrl
                    ? { uri: profile.profilePictureUrl }
                    : placeholderImage
                }
                className="w-32 h-32 rounded-full"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full"
                onPress={() => router.push("../editProfile")}
              >
                <MaterialIcons name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold mt-4">
              {profile.firstName || "First"} {profile.lastName || "Last"}
            </Text>
            <Text className="text-gray-500 text-lg">
              {profile.experienceLevel || "Experience Level N/A"}
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1">
          <View className="flex-row justify-between px-4 py-6">
            <View className="items-center bg-white p-4 rounded-xl flex-1 mx-2 shadow-sm">
              <Text className="text-gray-500">Total Workouts</Text>
              <Text className="text-xl font-bold">28</Text>
            </View>
            <View className="items-center bg-white p-4 rounded-xl flex-1 mx-2 shadow-sm">
              <Text className="text-gray-500">Rating</Text>
              <Text className="text-xl font-bold">5.0</Text>
            </View>
          </View>

          <View className="px-4">
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <InfoItem
                icon="fitness-center"
                label="Workout Type"
                value={profile.workoutType || "N/A"}
              />
              <InfoItem
                icon="schedule"
                label="Preferred Time"
                value={profile.preferredTime || "N/A"}
              />
              <InfoItem
                icon="straighten"
                label="Height"
                value={
                  profile.height_feet && profile.height_inches
                    ? `${profile.height_feet}' ${profile.height_inches}"`
                    : "N/A"
                }
              />
              <InfoItem
                icon="monitor-weight"
                label="Weight"
                value={profile.weight ? `${profile.weight} lbs` : "N/A"}
              />
            </View>
          </View>
          <View className="px-4 mt-4">
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-gray-500 mb-2">About Me</Text>
              <Text className="text-gray-800">
                {profile.bio || "No bio available."}
              </Text>
            </View>
          </View>
          <View className="h-8" />
        </ScrollView>

        <View className="px-4 mt-auto pb-6">
          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-xl mb-3"
            onPress={() => router.push("../editAccountDetails")}
          >
            <Text className="text-white text-center font-semibold">
              Edit Account Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 py-4 rounded-xl"
            onPress={handleLogOut}
          >
            <Text className="text-white text-center font-semibold">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

interface InfoItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <View className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0">
      <MaterialIcons name={icon} size={24} color="#4B5563" />
      <View className="flex-1 ml-3">
        <Text className="text-gray-500">{label}</Text>
        <Text className="text-gray-800 font-medium">{value}</Text>
      </View>
    </View>
  );
}
