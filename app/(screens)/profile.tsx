import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function Profile() {
  const userProfile = {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    height: "6 ft 2 in",
    weight: "180 lbs",
    email: "john.doe@example.com",
    location: "New York, NY",
    fitnessGoals: "Gain Muscle",
    bio: "Fitness enthusiast and gym lover. Always looking to improve and meet new workout partners.",
    profileImage: require("@/assets/portrait_placeholder.png"),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("@/assets/swole.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>

          <Image source={userProfile.profileImage} style={styles.profileImage} />

          <View style={styles.infoContainer}>
            <Text style={styles.userName}>
              {userProfile.firstName} {userProfile.lastName}
            </Text>
            <Text style={styles.infoText}>Email: {userProfile.email}</Text>
            <Text style={styles.infoText}>Location: {userProfile.location}</Text>
            <Text style={styles.infoText}>Age: {userProfile.age}</Text>
            <Text style={styles.infoText}>Height: {userProfile.height}</Text>
            <Text style={styles.infoText}>Weight: {userProfile.weight}</Text>
            <Text style={styles.infoText}>Fitness Goals: {userProfile.fitnessGoals}</Text>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>

          {/* Buttons positioned outside of the profile box */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
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
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 20, // Spacing below the profile box
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
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
