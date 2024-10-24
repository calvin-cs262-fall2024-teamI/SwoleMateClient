import { Tabs } from "expo-router";
import { Text, View, Image } from "react-native";

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
      width: "100%",
      height: "100%",
      padding: 15,
      marginTop:15,
      backgroundColor: focused ? "#613EEA" : "#ADD8E6", // Optional: change background color based on focus
      borderRadius: 44,
      flexDirection: "row", // Align items horizontally
      alignItems: "center", // Center vertically
      justifyContent: "flex-start", // Align logo and text to the left
    }}
  >
    
    {icon} 
    <Text
      style={{
        marginLeft: 10, // Space between icon and text
        color: "white",
        fontSize: 12,
        fontFamily: "Tuffy", // Adjust font based on preference
        fontWeight: "700",
      }}
    >
      {label}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
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
        tabBarLabel: () => null, // Hides the default label
        tabBarIcon: ({ focused }) => {
          // Customize each tab icon based on the route
          if (route.name === "match") {
            return (
              <CustomTab
                focused={focused}
                icon={
                  <Image
                    source={require("../../assets/navbar/match.png")}
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
                    source={require("../../assets/navbar/profile.png")}
                    style={{ width: 24, height: 24 }}
                  />
                }
                label="Profile"
              />
            );
          } 
          else if (route.name === "social") {
            return (
              <CustomTab
                focused={focused}
                icon={
                  <Image
                    source={require("../../assets/navbar/chat.png")}
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
  );
}
