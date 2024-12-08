import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "../nonapp/UserContext"; // Import the UserProvider

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      {/* Wrap the app in UserProvider */}
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Public Screens */}
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen
            name="profile-creator"
            options={{ headerShown: false }}
          />

          {/* Protected Screens */}
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen
            name="editProfile"
            options={{ title: "Edit Profile" }}
          />
          <Stack.Screen
            name="editAccountDetails"
            options={{ title: "Edit Account Details" }}
          />
        </Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
