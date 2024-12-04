import { StyleSheet } from "react-native";

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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
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

export default styles;
