import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
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
import styles from ".././stylesheets/[userID]Styles";

const MessageItem = ({
  message,
}: {
  message: { isSelf: boolean; text: string; time: string };
}) => (
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
  // TODO: figure out if this is still needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi there! How are you?", time: "15:30", isSelf: false },
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
  ]);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList>(null); // Create a ref for FlatList

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      e => setKeyboardHeight(e.endCoordinates.height)
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

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; //dont send empty message
    const currentTime = new Date();
    const seconds = currentTime.getSeconds();

    const newMessageObject = {
      id: `${Date.now()}-${seconds}`, // Generate a unique ID based on seconds. MAYBE CHANGE IN FUTURE
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSelf: true,
    };

    //The setMessages function can take either a new state value or a function that receives the previous state as an argument.
    setMessages(prevMessages => [...prevMessages, newMessageObject]);
    setNewMessage(""); //clear input field

    // Scroll to the end after message is added
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

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
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={item => item.id}
          ref={flatListRef}
          contentContainerStyle={styles.messageContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            placeholderTextColor="#666"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
