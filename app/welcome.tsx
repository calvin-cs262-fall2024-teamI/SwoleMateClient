import { api } from "@/api";
import BaseView from "@/app/components/BaseView";
import { notImplemented } from "@/utils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

// Slider data for background images
const slides = [
  {
    key: "1",
    image: require("@/assets/gym_background.jpg"),
    title: "Meet a new gym partner",
  },
  {
    key: "2",
    image: require("@/assets/two_people_working_out.jpg"),
    title: "Get fit together",
  },
  {
    key: "3",
    image: require("@/assets/couple_working.jpg"),
    title: "Make a new friend",
  },
];

const WelcomeScreen = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [sliderIndex, setSliderIndex] = useState(0);
  let sliderRef: AppIntroSlider | null = null;

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef) {
        const nextIndex = (sliderIndex + 1) % slides.length;
        sliderRef.goToSlide(nextIndex);
        setSliderIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderIndex]);

  const handleLogin = async () => {
    if (!emailValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters");
      return;
    }

    const status = await api.auth.login(emailAddress, password);
    if (status) router.replace("/match");
    else {
      setPassword("");
    }
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    notImplemented();
  };

  // Render individual slide with background image
  const renderSlide = ({ item }: any) => {
    return (
      <ImageBackground source={item.image} className="w-full h-full">
        {/* Dark overlay for better text visibility */}
        <View className="absolute inset-0 bg-black/40" />
      </ImageBackground>
    );
  };

  return (
    <BaseView className="flex-1" edges={["top"]}>
      {/* Background slider */}
      <AppIntroSlider
        ref={ref => (sliderRef = ref)}
        data={slides}
        renderItem={renderSlide}
        showNextButton={false}
        showDoneButton={false}
        dotStyle={{
          backgroundColor: "rgba(255,255,255,0.3)",
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 4,
        }}
        activeDotStyle={{
          backgroundColor: "#fff",
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
        onSlideChange={index => setSliderIndex(index)}
      />

      {/* Main content container */}
      <View className="absolute inset-0 justify-center items-center px-8">
        {/* App title and subtitle */}
        <Text className="text-3xl font-bold text-white mb-2">
          Welcome to SwoleMates
        </Text>
        <Text className="text-lg text-white mb-10">
          {slides[sliderIndex].title}
        </Text>

        {/* Login form container */}
        <View className="w-full bg-white/90 rounded-2xl p-6">
          {/* Email input */}
          <TextInput
            className="bg-white rounded-lg px-4 py-3 mb-4 text-base"
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            value={emailAddress}
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            onEndEditing={() => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              setEmailValid(emailRegex.test(emailAddress));
            }}
            keyboardType="email-address"
            autoCorrect={false}
          />

          {/* Password input */}
          <TextInput
            className="bg-white rounded-lg px-4 py-3 mb-4 text-base"
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Login button */}
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-4 items-center mt-2"
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          {/* Footer links */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-gray-600 text-sm">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text className="text-gray-600 text-sm">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseView>
  );
};

export default WelcomeScreen;
