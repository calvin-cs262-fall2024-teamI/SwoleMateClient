import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    color: "#4B0082",
    marginTop: 10,
  },
  profileImageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  selectProfileImageBox: {
    padding: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#E6E6FA",
  },
  selectProfileText: {
    color: "#4B0082",
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: "#F0F0F5",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
    marginBottom: 15,
  },
  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heightInput: {
    width: "48%",
    height: 40,
    backgroundColor: "#F0F0F5",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
  },
  bioInput: {
    height: 80,
    backgroundColor: "#F0F0F5",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#6A5ACD",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOptionsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default styles;
