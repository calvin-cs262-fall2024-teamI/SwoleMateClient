import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IChatItem } from "@/api/interfaces";
import styles from ".././stylesheets/SocialScreenStyles";
import { fakeMatches, fakePendings } from "@/api/fakedata";

const ChatItem = ({ item }: { item: IChatItem }) => (
  <TouchableOpacity
    style={styles.chatItem}
    onPress={() => {
      // Assuming you're using Expo Router or React Navigation
      // Replace 'navigation.navigate' with the appropriate navigation method if different
      //   navigation.navigate("chat", { userID: item.id });
      router.push({
        pathname: "/chat/[userID]",
        params: { userID: item.id },
      });
    }}
  >
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.chatInfo}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
    <Text style={styles.time}>{item.time}</Text>
  </TouchableOpacity>
);
const TabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case "Matched":
      return (
        <FlatList
          data={fakeMatches}
          renderItem={({ item }) => <ChatItem item={item} />}
        />
      );
    case "Pending":
      return (
        <FlatList
          data={fakePendings}
          renderItem={({ item }) => (
            <View style={styles.pendingItem}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={styles.itemContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>Pending</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
              <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeText}>x</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      );
    case "Requests":
      return <Text>Requests Content</Text>;
    default:
      return null;
  }
};

const RecentChatsScreen = () => {
  const [activeTab, setActiveTab] = useState("Matched");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Chats</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {["Matched", "Pending", "Requests"].map((tab, index) => (
          <TouchableOpacity
            key={`tab-${index}`}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
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
