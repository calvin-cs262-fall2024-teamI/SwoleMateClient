import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { AuthContext } from "./authentication/AuthContext";

const RenderSlide = ({ item }: { item: any }): JSX.Element => (
  <View style={styles.slideContainer}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.overlay} />
    <Text style={styles.text}>{item.text}</Text>
  </View>
);

function WelcomeScreen() {
  const router = useRouter();

  // Get auth context and verify it's not undefined
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not available. Ensure AuthProvider wraps the app.");
  }

  const { login } = authContext; // Now TypeScript knows `login` exists

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const sliderRef = useRef<AppIntroSlider | null>(null);

  const slides = [
    {
      key: "slide1",
      text: "Meet a new gym partner",
      image: require("@/assets/gym_background.jpg"),
    },
    {
      key: "slide2",
      text: "Get fit together",
      image: require("@/assets/two_people_working_out.jpg"),
    },
    {
      key: "slide3",
      text: "Make a new friend",
      image: require("@/assets/couple_working.jpg"),
    },
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      sliderRef.current?.goToSlide(currentIndex, true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRegister = () => {
    router.push("/profile-creator");
  };

  const handleSignin = async () => {
    const isEmailValid = email !== "";
    const isPasswordValid = password !== "";

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      try {
        await login(email, password);
        router.push("/match");
      } catch (error) {
        setErrorMessage((error as Error).message || "Login failed, please try again.");
      }
    } else {
      setErrorMessage("Please fill in both fields.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          ref={sliderRef}
          data={slides}
          renderItem={RenderSlide}
          showNextButton={false}
          showDoneButton={false}
        />

        <View style={styles.formContainer}>
          <Image
            source={require("@/assets/SmallerLogo.png")}
            style={{
              width: 85,
              height: 85,
              marginBottom: 30,
              borderRadius: 10,
            }}
          />
          <Text style={styles.title}>Welcome to SwoleMates</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, !emailValid && styles.invalidInput]}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, !passwordValid && styles.invalidInput]}
            />
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <View style={styles.buttonContainer}>
            <Button title="SIGN IN" onPress={handleSignin} color="white" />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="REGISTER" onPress={handleRegister} color="white" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});


export default WelcomeScreen;
