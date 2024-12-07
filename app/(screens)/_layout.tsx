import React from "react";
import { Tabs } from "expo-router";
import { Text, View, Image } from "react-native";
import AuthGuard from "../routes/auth";
import matchIcon from "../../assets/navbar/match.png";
import profileIcon from "../../assets/navbar/profile.png";
import chatIcon from "../../assets/navbar/chat.png";

const CustomTab = ({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: React.ReactNode;
  label: string;
}) => (
  <View
    style={{
      width: 115,
      height: 45,
      padding: 15,
      marginTop: 25,
      backgroundColor: focused ? "#613EEA" : "#ADD8E6",
      borderRadius: 44,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {icon}
    <Text
      style={{
        color: "white",
        fontSize: 12,
        marginLeft: 12,
        fontFamily: "Tuffy",
        fontWeight: "700",
      }}
    >
      {label}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 90,
          },
          tabBarItemStyle: {
            margin: 5,
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => {
            if (route.name === "match") {
              return (
                <CustomTab
                  focused={focused}
                  icon={
                    <Image
                      source={matchIcon}
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  label="Match"
                />
              );
            } else if (route.name === "profile") {
              return (
                <CustomTab
                  focused={focused}
                  icon={
                    <Image
                      source={profileIcon}
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  label="Profile"
                />
              );
            } else if (route.name === "social") {
              return (
                <CustomTab
                  focused={focused}
                  icon={
                    <Image
                      source={chatIcon}
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  label="Message"
                />
              );
            }
          },
        })}
      >
        <Tabs.Screen name="match" />
        <Tabs.Screen name="social" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </AuthGuard>
  );
}
