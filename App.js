import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";
import ChatScreen from "./components/ChatScreen";
import HubScreen from "./components/HubScreen";
import ProfileCreator from "./components/ProfileCreator";
import WelcomeScreen from "./components/WelcomeScreen";

// HomeScreen component
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Profile Creator" onPress={() => navigation.navigate("ProfileCreator")} />
    </View>
  );
}

// Create the stack navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatScreen">
        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Welcome Screen */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} // Hide the header for WelcomeScreen
        />

        {/* Profile Creator Screen */}
        <Stack.Screen
          name="ProfileCreator"
          component={ProfileCreator}
          options={{ title: "Create Profile" }}
        />

        {/* Hub Screen (new screen after saving the profile) */}
        <Stack.Screen
          name="HubScreen"
          component={HubScreen}
          options={{ title: "Hub" }} // Title for the Hub Screen
        />

        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: "Chat" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
