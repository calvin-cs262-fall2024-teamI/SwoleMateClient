// TabLayout.tsx
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const CustomTab = ({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) => (
  <View
    style={{
      backgroundColor: focused ? "#6A5ACD" : "#E0E0E0",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      minWidth: 80,
      alignItems: "center",
    }}
  >
    {children}
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 90,
        },
        tabBarItemStyle: {
          margin: 5,
        },
        tabBarLabel: ({ focused, children }) => (
          <CustomTab focused={focused}>
            <Text
              style={{
                color: focused ? "#FFF" : "#000",
                fontSize: 14,
              }}
            >
              {children}
            </Text>
          </CustomTab>
        ),
        tabBarIcon: () => null,
      }}
    >
      <Tabs.Screen
        name="match"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: "Message",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
