/**
 * WelcomeScreen Component
 *
 * This component serves as the initial screen of the SwoleMates application.
 * It features a background slider showcasing images related to fitness,
 * along with input fields for user registration and sign-in.
 * It provides immediate visual feedback on the validity of user inputs.
 *
 * @component
 * @param {object} navigation - The navigation object provided by React Navigation,
 * allowing navigation between screens.
 *
 * @example
 * // Usage within a Navigator
 * <Stack.Screen name="Welcome" component={WelcomeScreen} />
 */

import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
/**
 * Renders a single slide for the introduction slider.
 *
 * @param {object} item - The slide data including text and image.
 * @returns {JSX.Element} The rendered slide.
 */
const RenderSlide = ({ item }: { item: any }): JSX.Element => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.overlay} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

function WelcomeScreen() {
  const router = useRouter();
  // State variables to manage email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // Reference for the AppIntroSlider
  const sliderRef = useRef<AppIntroSlider | null>(null);

  // Slide data for the AppIntroSlider
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

  // Effect to cycle through slides every 5 seconds
  useEffect(() => {
    let currentIndex = 0; // Start with the first slide
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length; // Move to the next slide
      sliderRef.current?.goToSlide(currentIndex, true); // Change slide with animation
    }, 5000);

    // Cleanup interval on unmount. when the component unmounts or before the effect runs again.
    //This is important to prevent memory leaks or unwanted behavior when the component is no longer in the DOM.
    return () => clearInterval(interval);

    //The empty dependency array [] at the end of the useEffect hook indicates that this effect only runs once when the component mounts.
    //Since there are no dependencies, it does not re-run when the component re-renders.
  }, []);

  // Handler for the REGISTER button
  const handleRegister = () => {
    const isEmailValid = email !== ""; // Check if email is not empty
    const isPasswordValid = password !== ""; // Check if password is not empty

    setEmailValid(isEmailValid); // Update email validity state
    setPasswordValid(isPasswordValid); // Update password validity state

    if (isEmailValid && isPasswordValid) {
      router.push("/profile-creator"); // Navigate to explore page if both fields are valid
    } else {
      console.log("Fill the textboxes"); // Log message if inputs are invalid
    }
  };

  // Handler for the SIGN IN button
  const handleSignin = () => {
    const isEmailValid = email !== "";
    const isPasswordValid = password !== "";

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      //navigation.navigate('MatchScreen'); // Navigate to MatchScreen after successful sign in
    } else {
      console.log("Fill the textboxes");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        {/* Background Slider */}
        <AppIntroSlider
          ref={sliderRef}
          data={slides}
          renderItem={RenderSlide}
          showNextButton={false}
          showDoneButton={false}
        />

        {/* Overlay Form */}
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
              style={[styles.input, !emailValid && styles.invalidInput]} // Change border color if invalid
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, !passwordValid && styles.invalidInput]} // Change border color if invalid
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="SIGN IN"
              onPress={handleSignin} // Call handleSignin on press
              color="white"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="REGISTER"
              onPress={handleRegister} // Call handleRegister on press
              color="white"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  formContainer: {
    position: "absolute", // Overlay on top of slider
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
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent input background
    borderRadius: 5,
    marginBottom: "8%",
    paddingHorizontal: 10,
    borderColor: "blue", // Default border color
    borderWidth: 2, // Default border width
  },
  invalidInput: {
    borderColor: "red", // Border color when input is invalid
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
    resizeMode: "cover", // Ensure the image covers the entire background
  },
  text: {
    position: "absolute",
    bottom: "55%",
    color: "white", // Use a contrasting color for better readability
    fontSize: 16,
    textAlign: "center",
    zIndex: 1, // Ensure text appears above the overlay
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
  },
});

export default WelcomeScreen;
