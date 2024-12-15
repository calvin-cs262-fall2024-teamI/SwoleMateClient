/**
 * @fileoverview User profile view component for displaying other users' profiles
 */

import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { IUser, IReview } from "@/api/interfaces";
import BaseView from "@/app/components/BaseView";
import { api } from "@/api";
import { useState, useEffect } from "react";

/**
 * User profile component that displays detailed user information
 * and interaction options
 * @returns JSX.Element
 */
const UserProfile = () => {
  const { id, user } = useLocalSearchParams();
  const userObj = JSON.parse(user as string) as IUser;
  const [reviews, setReviews] = useState<IReview[]>([]);

  /**
   * Fetches reviews for the displayed user
   */
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await api.reviews.getReviewsFor(userObj.id);
      setReviews(reviewsData);
    };
    fetchReviews();
  }, [userObj.id]);

  return (
    <BaseView>
      <ScrollView className="flex-1 bg-gray-50">
        {/* Back Button */}
        <TouchableOpacity className="p-4" onPress={() => router.back()}>
          <Text className="text-blue-500 font-medium">← Go Back</Text>
        </TouchableOpacity>

        {/* Profile Header */}
        <View className="bg-white mb-6">
          <View className="px-4 py-6 flex-row items-center space-x-4">
            <Image
              source={
                userObj.profilePictureUrl
                  ? { uri: userObj.profilePictureUrl }
                  : require("@/assets/avatars/1.png")
              }
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
            <View>
              <Text className="text-2xl font-bold">
                {userObj.firstName} {userObj.lastName}
              </Text>
              <Text className="text-gray-600">@{userObj.username}</Text>
              <Text className="text-gray-600 mt-1">
                {userObj.age} years • {userObj.city}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                ID: {userObj.id}
              </Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="space-y-6 gap-4">
          {/* Bio Section */}
          <View className="bg-white p-4 rounded-xl">
            <Text className="text-lg font-semibold mb-2">About Me</Text>
            <Text className="text-gray-700 leading-6">{userObj.bio}</Text>
          </View>

          {/* Basic Info Card */}
          <View className="bg-white p-4 rounded-xl">
            <Text className="text-lg font-semibold mb-3">
              Basic Information
            </Text>

            <View className="space-y-2.5">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Gender</Text>
                <Text className="font-medium capitalize">{userObj.gender}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Height</Text>
                <Text className="font-medium">
                  {userObj.height_feet}&apos;{userObj.height_inches}&quot;
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Weight</Text>
                <Text className="font-medium">{userObj.weight} lbs</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Experience Level</Text>
                <Text className="font-medium capitalize">
                  {userObj.experienceLevel}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Email</Text>
                <Text className="font-medium">{userObj.emailAddress}</Text>
              </View>
            </View>
          </View>

          {/* Trainer Section */}
          {userObj.isTrainer && (
            <View className="bg-white p-4 rounded-xl">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-semibold">Training Services</Text>
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-600 text-sm font-medium">
                    Certified Trainer
                  </Text>
                </View>
              </View>
              <Text className="text-gray-700 mb-3">
                Professional training services available for booking
              </Text>
              <View className="bg-blue-50 p-3 rounded-lg">
                <Text className="text-blue-800 text-lg font-bold">
                  ${userObj.cost} per session
                </Text>
              </View>
            </View>
          )}

          {/* Reviews Section */}
          <View className="bg-white p-4 rounded-xl">
            <Text className="text-lg font-semibold mb-3">Reviews</Text>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <View key={review.id} className="border-b border-gray-200 py-3">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-medium text-gray-500">
                      Anonymous User
                    </Text>
                    <View className="bg-blue-100 px-2 py-1 rounded-full">
                      <Text className="text-blue-600">{review.rating}/5</Text>
                    </View>
                  </View>
                  <Text className="text-gray-700">
                    {review.reviewText || "No review text provided"}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 italic">No reviews yet</Text>
            )}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            className="bg-blue-500 py-3.5 rounded-xl mt-4 mb-6"
            onPress={async () => {
              const rst = await api.buddymatches.sendRequest(userObj.id);
              if (rst) {
                Alert.alert("Success", "Buddy request has been sent!");
              }
            }}
          >
            <Text className="text-white text-center font-semibold text-base">
              Send Request
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default UserProfile;
