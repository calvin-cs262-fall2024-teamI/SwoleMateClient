/**
 * @fileoverview Tab layout component for the main application screens
 * Handles navigation between Match, Social, and Profile screens
 */

import { Tabs, usePathname } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { getTutorialContent } from "@/tutorials";

/**
 * TabLayout component that manages the bottom tab navigation
 * and tutorial modal display for the main app screens
 * @returns JSX.Element
 */
export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="m-5 bg-white rounded-2xl p-8 items-center shadow-lg w-11/12">
            {getTutorialContent(pathname)}
            <Pressable
              className="rounded-full px-6 py-3 bg-[#FF4B4B] mt-4"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-bold text-center">Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF4B4B",
          tabBarInactiveTintColor: "#999",
          headerRight: () => (
            <Pressable className="mr-4" onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons
                name="help-circle"
                size={24}
                color="#FF4B4B"
              />
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="match"
          options={{
            title: "Match",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="handshake"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: "Social",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-circle"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
