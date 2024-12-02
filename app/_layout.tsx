import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";

import { AuthProvider } from "./authentication/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "../nonapp/UserContext"; // Import the UserProvider

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [appReady, setAppReady] = useState(false); // Track app readiness

  useEffect(() => {
    if (loaded) {
      setAppReady(true); // Set app ready state once fonts are loaded
      SplashScreen.hideAsync(); // Hide the splash screen
    }
  }, [loaded]);

  if (!appReady) {
    // Ensure nothing is rendered until fonts are loaded
    return null;
  }

  return (

    <AuthProvider>

      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="profile-creator" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="editProfile" options={{ title: "Edit Profile" }} />
          <Stack.Screen name="editAccountDetails" options={{ title: "Edit Account Details" }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>

  );
}
