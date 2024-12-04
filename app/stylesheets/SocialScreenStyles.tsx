import { StyleSheet } from "react-native";

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

export default styles;
