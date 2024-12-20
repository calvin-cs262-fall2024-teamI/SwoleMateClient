/**
 * @fileoverview Root layout component for the application
 * Handles font loading, splash screen, and theme setup
 */

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

/**
 * Root layout component that sets up the app's navigation structure
 * and handles initial loading states
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider className={colorScheme === "dark" ? "dark" : ""}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          },
        }}
      >
        {/* Public Screens */}
        <Stack.Screen name="welcome" />
        <Stack.Screen name="edit_profile" />
        <Stack.Screen name="register" />

        {/* Protected Screens */}
        <Stack.Screen name="(screens)" />
      </Stack>
    </SafeAreaProvider>
  );
}
