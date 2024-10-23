import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const MESSAGES = [
  {
    id: "1",
    text: "Hi there! How are you?",
    time: "15:30",
    isSelf: false,
  },
  {
    id: "2",
    text: "I'm doing great, thanks! How about you?",
    time: "15:31",
    isSelf: true,
  },
  {
    id: "3",
    text: "Just finished my workout at the gym",
    time: "15:32",
    isSelf: true,
  },
  {
    id: "4",
    text: "That's awesome! Keep up the good work! 💪",
    time: "15:33",
    isSelf: false,
  },
];

const MessageItem = ({ message }: { message: any }) => (
  <View
    style={[
      styles.messageWrapper,
      message.isSelf ? styles.selfMessageWrapper : styles.otherMessageWrapper,
    ]}
  >
    <View
      style={[
        styles.messageBox,
        message.isSelf ? styles.selfMessage : styles.otherMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          message.isSelf ? styles.selfMessageText : styles.otherMessageText,
        ]}
      >
        {message.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          message.isSelf ? styles.selfMessageTime : styles.otherMessageTime,
        ]}
      >
        {message.time}
      </Text>
    </View>
  </View>
);

const ChatScreen = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={require("@/assets/avatars/2.png")}
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>Mike Mazowski</Text>
            <Text style={styles.status}>Matched</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={MESSAGES}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.messageContainer,
            { paddingBottom: keyboardHeight },
          ]}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    color: "#666",
  },
  messageContainer: {
    padding: 16,
  },
  messageWrapper: {
    flexDirection: "row",
    marginBottom: 16,
  },
  selfMessageWrapper: {
    justifyContent: "flex-end",
  },
  otherMessageWrapper: {
    justifyContent: "flex-start",
  },
  messageBox: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  selfMessage: {
    backgroundColor: "#6A5ACD",
  },
  otherMessage: {
    backgroundColor: "#E0E0E0",
  },
  messageText: {
    fontSize: 14,
  },
  selfMessageText: {
    color: "#FFF",
  },
  otherMessageText: {
    color: "#000",
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  selfMessageTime: {
    color: "#FFF",
    alignSelf: "flex-end",
  },
  otherMessageTime: {
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    gap: 12,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  sendButton: {
    backgroundColor: "#6A5ACD",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
