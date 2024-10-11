import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Contact = {
  id: string;
  name: string;
};

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
};

const contacts: Contact[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "4", name: "David" },
  { id: "5", name: "Eve" },
];

const initialMessages: Message[] = [
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

const ContactItem = ({ name }: { name: string }) => (
  <View style={styles.contactItem}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{name[0].toUpperCase()}</Text>
    </View>
  </View>
);

const MessageItem = ({ message }: { message: Message }) => (
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

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [currentContact, setCurrentContact] = useState(contacts[0]);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    scrollViewRef.current?.scrollToEnd(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contactList}>
        <FlatList
          data={contacts}
          renderItem={({ item }) => <ContactItem name={item.name} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.chatArea}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatHeaderText}>{currentContact.name}</Text>
        </View>
        <KeyboardAwareScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          ref={scrollViewRef}
          scrollEventThrottle={400}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 100 })}
        >
          {messages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </KeyboardAwareScrollView>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  contactList: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  contactItem: {
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatArea: {
    flex: 1,
  },
  chatHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
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

export default ChatScreen;
