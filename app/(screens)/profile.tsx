import { useContext } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "../../nonapp/UserContext"; // Import UserContext
import swoleImage from "@/assets/swole.png";
import placeholderImage from "@/assets/portrait_placeholder.png"; // Import placeholder image
import styles from ".././stylesheets/ProfileScreenStyles";

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
            <Text style={styles.infoText}>
              Rating: {"5"} {/* Hardcoded for now */}
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
