import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import axios from "axios";
import globalStyles from "./stylesheets/globalStyles";
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
import styles from "./stylesheets/profileCreatorStyles";
import apiClient from "@/nonapp/axiosConfig";

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function ProfileCreator() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null); // State for email error
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [preferredTime, setPreferredTime] = useState("morning");
  const [workoutType, setWorkoutType] = useState("cardio");
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [personalBio, setPersonalBio] = useState("");
  const [profileImageForm, setProfileImageForm] = useState<FormData | null>(
    null
  );
  const [imageURI, setImageUri] = useState<string | null>(null);

  const [activePicker, setActivePicker] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // Handle image selection from gallery
  const handlePickImageAsync = async () => {
    console.log("Image picker invoked");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      console.log("Image picker result:", result);

      if (!result.canceled) {
        const localUri = result.assets[0].uri;
        console.log("Selected image URI:", localUri);

        const filename = localUri.split("/").pop();
        //infer type of image:
        const match = /\.(\w+)$/.exec(filename!);
        const type = match ? `image/${match[1]}` : `image`;
        setImageUri(localUri);
        // Prepare FormData for file upload
        const formData = new FormData();
        // @ts-expect-error: special react native format for form data
        formData.append("profilePicture", {
          type: type,
          uri: localUri,
          name: filename,
        });
        setProfileImageForm(formData);
      }
    } catch (error) {
      console.error("Error during image selection:", error);
    }
  };

  // Handle picker selection (Preferred Time, Workout Type, Experience Level)
  const handleSelection = (itemValue: string) => {
    if (activePicker === "preferredTime") {
      setPreferredTime(itemValue);
    } else if (activePicker === "workoutType") {
      setWorkoutType(itemValue);
    } else if (activePicker === "experienceLevel") {
      setExperienceLevel(itemValue);
    }
    setModalVisible(false);
    setActivePicker(null);
  };

  const openModal = (pickerType: string) => {
    setActivePicker(pickerType);
    setModalVisible(true);
  };

  // Register new user and upload profile picture
  const handleRegister = async () => {
    const userProfile = {
      emailAddress: email,
      password,
      username,
      firstName,
      lastName,
      age: Number(age),
      height_feet: Number(heightFt),
      height_inches: Number(heightIn),
      weight: Number(weight),
      gender: null, // Assume gender selection is handled separately
      profilePictureUrl: null, // Initially null
      experienceLevel, // Experience level from picker
      bio: personalBio,
    };

    try {
      // Register user
      const response = await apiClient.post("/api/auth/register", userProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        const userId = response.data.data.id;
        alert("Registration Successful!");

        // Upload profile picture if available
        if (profileImageForm) {
          try {
            const uploadResponse = await apiClient.post(
              `/api/auth/upload-profile-picture/${userId}`,
              profileImageForm
            );
            console.log("Upload response:", uploadResponse);
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            alert("Failed to upload profile picture.");
          }
        }

        router.replace("/welcome");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error:", error.response.data);
          alert(
            `Error: ${error.response.data.message || "Registration failed."}`
          );
        } else {
          console.error("Network Error:", error.message);
          alert("Network Error");
        }
      }
    }
  };

  // Handle profile save (validate fields)
  const handleSaveProfile = () => {
    // Email validation check
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return; // Stop execution if email is invalid
    } else {
      setEmailError(null); // Clear error if valid
    }

    if (!username || !password || !passwordMatch) {
      alert("Please fill in all required fields.");
      return;
    }

    // Proceed with registration
    handleRegister();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("@/assets/SmallerLogo.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>Create Your Profile</Text>
            </View>

            <View style={styles.profileImageSection}>
              {imageURI && (
                <Image source={{ uri: imageURI }} style={styles.profileImage} />
              )}
              <TouchableOpacity
                onPress={handlePickImageAsync}
                style={styles.selectProfileImageBox}
              >
                <Text style={styles.selectProfileText}>
                  {imageURI ? "Change Profile Image" : "Select Profile Image"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Email"
                value={email}
                // pass the email in lowercase
                onChangeText={text => setEmail(text.toLowerCase())}
                style={styles.input}
              />
              {emailError && (
                <Text style={globalStyles.errorText}>{emailError}</Text>
              )}
              <Text style={styles.label}>Username</Text>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              <Text style={styles.label}>Verify Password</Text>
              <TextInput
                placeholder="Verify Password"
                value={verifyPassword}
                onChangeText={text => {
                  setVerifyPassword(text);
                  setPasswordMatch(password === text);
                }}
                secureTextEntry
                style={[styles.input, !passwordMatch && { borderColor: "red" }]}
              />
              {!passwordMatch && (
                <Text style={globalStyles.errorText}>
                  Passwords do not match
                </Text>
              )}
              <Text style={styles.label}>First Name</Text>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
              />
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
              />
              <Text style={styles.label}>Age</Text>
              <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text style={styles.label}>Height (Feet/Inches)</Text>
              <View style={styles.heightContainer}>
                <TextInput
                  placeholder="Feet"
                  value={heightFt}
                  onChangeText={setHeightFt}
                  keyboardType="numeric"
                  style={styles.heightInput}
                />
                <TextInput
                  placeholder="Inches"
                  value={heightIn}
                  onChangeText={setHeightIn}
                  keyboardType="numeric"
                  style={styles.heightInput}
                />
              </View>
              <Text style={styles.label}>Weight (lbs)</Text>
              <TextInput
                placeholder="Weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text style={styles.label}>Personal Bio</Text>
              <TextInput
                placeholder="Write something about yourself"
                value={personalBio}
                onChangeText={setPersonalBio}
                style={styles.bioInput}
                multiline
              />
              <Text style={styles.label}>Preferred Time to Workout:</Text>
              <TouchableOpacity
                onPress={() => openModal("preferredTime")}
                style={styles.input}
              >
                <Text>
                  {preferredTime.charAt(0).toUpperCase() +
                    preferredTime.slice(1)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.label}>Workout Type:</Text>
              <TouchableOpacity
                onPress={() => openModal("workoutType")}
                style={styles.input}
              >
                <Text>
                  {workoutType.charAt(0).toUpperCase() + workoutType.slice(1)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.label}>Experience Level:</Text>
              <TouchableOpacity
                onPress={() => openModal("experienceLevel")}
                style={styles.input}
              >
                <Text>
                  {experienceLevel.charAt(0).toUpperCase() +
                    experienceLevel.slice(1)}
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              transparent
              visible={isModalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                      {activePicker === "preferredTime"
                        ? "Preferred Time to Workout"
                        : activePicker === "workoutType"
                          ? "Workout Type"
                          : "Experience Level"}
                    </Text>
                    <ScrollView
                      contentContainerStyle={styles.modalOptionsContainer}
                    >
                      {activePicker === "preferredTime" &&
                        [
                          "Morning",
                          "Afternoon",
                          "Evening",
                          "No Preference",
                        ].map(item => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => handleSelection(item.toLowerCase())}
                            style={styles.modalOption}
                          >
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        ))}
                      {activePicker === "workoutType" &&
                        ["Cardio", "Strength", "Muscle Gain", "Recovery"].map(
                          item => (
                            <TouchableOpacity
                              key={item}
                              onPress={() =>
                                handleSelection(item.toLowerCase())
                              }
                              style={styles.modalOption}
                            >
                              <Text>{item}</Text>
                            </TouchableOpacity>
                          )
                        )}
                      {activePicker === "experienceLevel" &&
                        ["Beginner", "Intermediate", "Advanced"].map(item => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => handleSelection(item.toLowerCase())}
                            style={styles.modalOption}
                          >
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Button
                      title="Close"
                      onPress={() => setModalVisible(false)}
                      color="#4B0082"
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.buttonContainer}>
              <Button
                title="Save Profile"
                onPress={handleSaveProfile}
                color="white"
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ProfileCreator;
