import { View, Text, SafeAreaView } from "react-native";

export default function Profile() {
  return (
    <SafeAreaView>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Profile
        </Text>
      </View>
    </SafeAreaView>
  );
}
