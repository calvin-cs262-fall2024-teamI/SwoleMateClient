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

const MessageItem = ({
  message,
}: {
  message: { isSelf: boolean; text: string; time: string };
}) => (
  <View
    className={`flex flex-row my-2 ${
      message.isSelf ? "justify-end" : "justify-start"
    }`}
  >
    <View
      className={`rounded-lg px-4 py-2 ${
        message.isSelf ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <Text className="text-white text-sm">{message.text}</Text>
      <Text className="text-gray-200 text-xs mt-1">{message.time}</Text>
    </View>
  </View>
);
const Chat = () => {
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
  const flatListRef = useRef<FlatList>(null);

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
    if (newMessage.trim() === "") return;
    const currentTime = new Date();
    const seconds = currentTime.getSeconds();

    const newMessageObject = {
      id: `${Date.now()}-${seconds}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSelf: true,
    };

    setMessages(prevMessages => [...prevMessages, newMessageObject]);
    setNewMessage("");

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={require("@/assets/avatars/2.png")}
            className="w-10 h-10 rounded-full"
          />
          <View className="flex-1 ml-4">
            <Text className="text-lg font-bold">Mike Mazowski</Text>
            <Text className="text-sm text-gray-500">Matched</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Message List */}
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={item => item.id}
          ref={flatListRef}
          contentContainerStyle={{ padding: 16 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input Area */}
        <View className="flex-row items-center p-4 border-t border-gray-200">
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 mx-2 px-4 py-2 border border-gray-300 rounded-full text-sm"
            placeholder="Write a message..."
            placeholderTextColor="#666"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2 bg-blue-500 p-2 rounded-full"
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Chat;
