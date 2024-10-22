import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from "react-native";

const contacts = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "4", name: "David" },
  { id: "5", name: "Eve" },
];

const initialMessages = [
  { id: "1", sender: "Alice", text: "Hey there! How's your day going?", timestamp: "10:00 AM" },
  {
    id: "2",
    sender: "You",
    text: "Hi Alice! It's going well, thanks. How about yours?",
    timestamp: "10:02 AM",
  },
  {
    id: "3",
    sender: "Alice",
    text: "Not bad at all. I'm working on a new project. It's quite exciting!",
    timestamp: "10:05 AM",
  },
  {
    id: "4",
    sender: "You",
    text: "That sounds interesting. What's the project about?",
    timestamp: "10:07 AM",
  },
  {
    id: "5",
    sender: "Alice",
    text: "It's a mobile app for tracking daily habits. I think it could be really useful for a lot of people.",
    timestamp: "10:10 AM",
  },
  {
    id: "6",
    sender: "You",
    text: "Wow, that does sound useful. I'd love to hear more about it when you have time.",
    timestamp: "10:12 AM",
  },
];

const MessageItem = ({ message }) => (
  <View
    style={[
      styles.messageItem,
      message.sender === "You" ? styles.yourMessage : styles.theirMessage,
    ]}
  >
    <Text style={styles.messageSender}>{message.sender}</Text>
    <Text style={styles.messageText}>{message.text}</Text>
    <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
  </View>
);

const Messenger = ({ route }) => {
  const { userName } = route.params; // Retrieve the passed userName
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* KeyboardAvoidingView handles keyboard events */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90} // Adjust this value based on header size
      >
        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
  },
  messageItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  yourMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageSender: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    marginBottom: 5,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Messenger;
