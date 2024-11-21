import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IChatItem } from "@/api/interfaces";

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
    <Image source={item.avatar} style={styles.avatar} />
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
            key={tab}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  activeTab: {
    backgroundColor: "#6A5ACD",
  },
  tabText: {
    color: "#000",
  },
  activeTabText: {
    color: "#FFF",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E6E6FA",
    marginBottom: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    color: "#666",
  },
  time: {
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeNavItem: {
    backgroundColor: "#6A5ACD",
  },
  navText: {
    color: "#000",
  },
  activeNavText: {
    color: "#FFF",
  },
  pendingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFB74D",
    marginBottom: 8,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
  },
  status: {
    color: "#666",
    marginTop: 4,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default RecentChatsScreen;
