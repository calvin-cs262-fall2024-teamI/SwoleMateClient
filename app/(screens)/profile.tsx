import { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "../../nonapp/UserContext"; // Import UserContext
import swoleImage from "@/assets/swole.png";
import placeholderImage from "@/assets/portrait_placeholder.png"; // Import placeholder image

export default function Profile() {
  const router = useRouter();
  const context = useContext(UserContext);
  //handle the case where usercontext is undefined.
  if (!context) {
    return <Text>Loading...</Text>; // This can be changed
  }
  const { userInfo } = context; // Access user data from context

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        //
        source={swoleImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>

          {/* Display profile image or placeholder */}
          <Image
            source={
              userInfo.profileImage
                ? { uri: userInfo.profileImage }
                : placeholderImage
            }
            style={styles.profileImage}
          />

          <View style={styles.infoContainer}>
            <Text style={styles.userName}>
              {userInfo.firstName || "First Name"}{" "}
              {userInfo.lastName || "Last Name"}
            </Text>
            <Text style={styles.infoText}>
              Age: {userInfo.age ? `${userInfo.age} years` : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Height:{" "}
              {userInfo.heightFt && userInfo.heightIn
                ? `${userInfo.heightFt} ft ${userInfo.heightIn} in`
                : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Weight: {userInfo.weight ? `${userInfo.weight} lbs` : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Preferred Time: {userInfo.preferredTime || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Workout Type: {userInfo.workoutType || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Experience Level: {userInfo.experienceLevel || "N/A"}
            </Text>
            <Text style={styles.bioText}>
              {userInfo.personalBio || "No bio available."}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("../editProfile")}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("../editAccountDetails")}
            >
              <Text style={styles.buttonText}>Edit Account Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  infoContainer: {
    padding: 10,
    borderColor: "#6A5ACD", // Matches the EditProfile border color
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "black",
    marginVertical: 5,
  },
  bioText: {
    fontSize: 14,
    color: "black",
    marginTop: 10,
    fontStyle: "italic",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#6A5ACD", // Matches the EditProfile button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
