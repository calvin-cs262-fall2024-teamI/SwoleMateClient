import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  dropdown: {
    width: 150,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#fff",
  },
  filterTextInput: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginLeft: 5,
    backgroundColor: "transparent",
    height: 40,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#b3d9ff",
    position: "relative",
    justifyContent: "space-between",
  },
  expandedUserCard: {
    backgroundColor: "#e6e6ff",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  userInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  defaultButton: {
    backgroundColor: "green",
    width: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  pendingButton: {
    backgroundColor: "blue",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  ignoreButton: {
    backgroundColor: "#ff4d4d",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  readMoreButton: {
    backgroundColor: "#007bff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  starContainer: {
    position: "absolute",
    bottom: 5,
    left: 13,
    flexDirection: "row",
  },
  sortButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: "center",
  },

  reviewContainer: {
    backgroundColor: '007bff',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
});

export default styles;
