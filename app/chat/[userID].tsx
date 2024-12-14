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
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "@/api";
import { IMessage } from "@/api/interfaces";

const MessageItem = ({
  message,
  hisId,
}: {
  message: IMessage;
  hisId: number;
}) => (
  <View
    className={`flex-row mb-3 ${
      message.senderId === hisId ? "" : "justify-end"
    }`}
  >
    <View
      className={`rounded-lg px-4 py-2 max-w-[80%] ${
        message.senderId === hisId ? "bg-gray-200" : "bg-blue-500"
      }`}
    >
      <Text
        className={`${
          message.senderId === hisId ? "text-gray-800" : "text-white"
        }`}
      >
        {message.messageText}
      </Text>
    </View>
  </View>
);

const Chat = () => {
  const params = useLocalSearchParams();
  const { userID, profilePictureURL, name, chatRoomId } = params;

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const fetchMessages = async () => {
    try {
      const messagesData = (await api.messages.fromRoomId(
        Number(chatRoomId)
      )) as IMessage[];
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchMessages();

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
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const sentMessage = await api.messages.send({
        chatRoomId: Number(chatRoomId),
        messageText: newMessage,
      });

      setMessages(prevMessages => [...prevMessages, sentMessage]);
      setNewMessage("");

      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        100
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
            source={
              profilePictureURL
                ? { uri: profilePictureURL as string }
                : require("@/assets/portrait_placeholder.png")
            }
            className="w-10 h-10 rounded-full"
          />
          <View className="flex-1 ml-4">
            <Text className="text-lg font-bold">{name as string}</Text>
            <Text className="text-sm text-gray-500">Matched</Text>
            <Text className="text-xs text-gray-400">Room #{chatRoomId}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Message List */}
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <MessageItem message={item} hisId={Number(userID)} />
          )}
          keyExtractor={item => item.id}
          ref={flatListRef}
          contentContainerStyle={{ padding: 16 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
