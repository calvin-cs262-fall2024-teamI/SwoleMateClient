import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IChatItem } from "@/api/interfaces";
import styles from ".././stylesheets/SocialScreenStyles";
import { fakeMatches, fakePendings } from "@/api/fakedata";

const ChatItem = ({ item }: { item: IChatItem }) => (
  <TouchableOpacity
    style={styles.chatItem}
    onPress={() => {
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
  const [tutorialVisible, setTutorialVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    "1. Use the tabs at the top to switch between Matched, Pending, and Requests.",
    "2. Tap on a matched user to start a chat.",
    "3. View pending requests and take actions such as accepting or ignoring.",
    "4. Use the search icon in the header to search for chats.",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Recent Chats</Text>
        <TouchableOpacity onPress={() => setTutorialVisible(true)}>
          <Ionicons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
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

      {/* Tab Content */}
      <TabContent activeTab={activeTab} />

      {/* Tutorial Modal */}
      <Modal
        visible={tutorialVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTutorialVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.tutorialBox}>
            <Text style={styles.modalTitle}>How to Use</Text>
            <Text style={styles.modalContent}>
              {tutorialSteps[currentStep]}
            </Text>
            <View style={styles.arrowContainer}>
              {/* Left arrow for steps greater than the first */}
              {currentStep > 0 && (
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => setCurrentStep(prev => prev - 1)}
                >
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              )}
              {/* Right arrow for steps before the last */}
              {currentStep < tutorialSteps.length - 1 && (
                <TouchableOpacity
                  style={[
                    styles.arrowButton,
                    currentStep === 0 && styles.rightArrowAligned,
                  ]}
                  onPress={() => setCurrentStep(prev => prev + 1)}
                >
                  <Ionicons name="arrow-forward" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTutorialVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RecentChatsScreen;
