import { useContext, useEffect, useState } from "react";
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
import globalStyles from "../stylesheets/globalStyles";
import styles from ".././stylesheets/ProfileScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/nonapp/axiosConfig";
interface UserProfile {
  username?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  height_feet?: number;
  height_inches?: number;
  weight?: number;
  preferredTime?: string;
  workoutType?: string;
  experienceLevel?: string;
  bio?: string;
  profilePictureUrl?: string | null;
}

export default function Profile() {
  const router = useRouter();
  const context = useContext(UserContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  //Get the info from database:
  useEffect(() => {
    console.log("User ID:", context?.userId);
    if (context?.userId) {
      const fetchProfile = async () => {
        try {
          const response = await apiClient.get(
            //get the userId from the context. We stored this id to context when user signed in
            `/api/users/${context.userId}`,
            {
              headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`,
              },
            }
          );

          if (response.status === 200) {
            setProfile(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [context?.userId]);
  const handleLogOut = async () => {
    if (context?.clearUserId) {
      await context.clearUserId();
      router.replace("/welcome");
    }
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={globalStyles.errorText}>Failed to load profile data.</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
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
              profile.profilePictureUrl
                ? { uri: profile.profilePictureUrl }
                : placeholderImage
            }
            style={styles.profileImage}
          />

          <View style={styles.infoContainer}>
            <Text style={styles.userName}>
              {profile.firstName || "First Name"}{" "}
              {profile.lastName || "Last Name"}
            </Text>
            <Text style={styles.infoText}>
              Age: {profile.age ? `${profile.age} years` : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Height:{" "}
              {profile.height_feet && profile.height_inches
                ? `${profile.height_feet} ft ${profile.height_inches} in`
                : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Weight: {profile.weight ? `${profile.weight} lbs` : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Preferred Time: {profile.preferredTime || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Workout Type: {profile.workoutType || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Experience Level: {profile.experienceLevel || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              Rating: {"5"} {/* Hardcoded for now */}
            </Text>
            <Text style={styles.bioText}>
              {profile.bio || "No bio available."}
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
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
