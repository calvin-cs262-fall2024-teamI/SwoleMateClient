import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: "10%",
    zIndex: 1,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    marginBottom: "8%",
    paddingHorizontal: 10,
    borderColor: "blue",
    borderWidth: 2,
  },
  invalidInput: {
    borderColor: "red",
  },
  buttonContainer: {
    width: "60%",
    color: "black",
    marginTop: "3%",
    padding: "1%",
    borderRadius: 5,
    backgroundColor: "blue",
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  text: {
    position: "absolute",
    bottom: "55%",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default styles;
