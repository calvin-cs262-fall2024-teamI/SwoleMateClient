import coupleWorking from "@/assets/couple_working.jpg";
import gymBackground from "@/assets/gym_background.jpg";
import smallerLogo from "@/assets/SmallerLogo.png";
import twoPeopleWorkingOut from "@/assets/two_people_working_out.jpg";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./WelcomeScreenStyles";
import { ImageSourcePropType } from "react-native";

type Slide = {
  key: string;
  text: string;
  image: ImageSourcePropType;
};

const RenderSlide = ({ item }: { item: Slide }): JSX.Element => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.overlay} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

const WelcomeScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);

  const sliderRef = useRef<AppIntroSlider | null>(null);

  const slides: Slide[] = [
    {
      key: "slide1",
      text: "Meet a new gym partner",
      image: gymBackground,
    },
    {
      key: "slide2",
      text: "Get fit together",
      image: twoPeopleWorkingOut,
    },
    {
      key: "slide3",
      text: "Make a new friend",
      image: coupleWorking,
    },
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      sliderRef.current?.goToSlide(currentIndex, true);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleRegister = () => {
    //TODO :
    //dont let user register if an email account or username is already in the database.

    router.push("/profile-creator");
  };

  const handleSignin = async () => {
    const isEmailValid = email !== "";
    const isPasswordValid = password !== "";

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(
          "https://swolemate-service.azurewebsites.net/api/auth/login",
          { emailAddress: email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data.data;
          if (accessToken && refreshToken) {
            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);
            router.push("/match");
          } else {
            console.log("Invalid response from server.");
          }
        }
      } catch (error) {
        console.log("Error during login:", error);

        // Check for specific error codes and set field validity accordingly
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const statusCode = error.response.status;

            if (statusCode === 500) {
              // Both email and password are wrong
              setEmailValid(false);
              setPasswordValid(false);
            } else if (statusCode === 401) {
              // Password is wrong
              setPasswordValid(false);
            } else {
              // For any other errors, reset both fields
              setEmailValid(false);
              setPasswordValid(false);
            }
          }
        }
      }
    } else {
      console.log("Fill the textboxes");
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
            source={smallerLogo}
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
              onEndEditing={() => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setEmailValid(emailRegex.test(email));
              }}
              style={[styles.input, !emailValid && styles.invalidInput]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onEndEditing={() => {
                const passwordRegex = /^.{8,}$/;
                setPasswordValid(passwordRegex.test(password));
              }}
              secureTextEntry
              style={[styles.input, !passwordValid && styles.invalidInput]}
            />
          </View>

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
};

export default WelcomeScreen;
