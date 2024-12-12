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

  closeText: {
    color: "#FFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  tutorialBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  modalContent: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  rightArrowAligned: {
    marginLeft: "auto", // Pushes the right arrow to the far right
  },
  questionMarkButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;
