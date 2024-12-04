import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
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
import { UserContext } from "../nonapp/UserContext";
import styles from "./stylesheets/profileCreatorStyles";

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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activePicker, setActivePicker] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const context = useContext(UserContext);
  //handle the case where usercontext is undefined.
  if (!context) {
    return <Text>Loading...</Text>; // This can be changed
  }
  const { setUserInfo } = context; // Access user data from context

  const handlePickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

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
      profilePictureUrl: null, // Handle image URL if available
      experienceLevel: null, // Handle experience level
      bio: personalBio,
    };

    try {
      const response = await fetch(
        "https://swolemate-service.azurewebsites.net/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfile),
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Only read once
        console.error("Error:", errorText);
        alert(`Error: ${errorText}`); // Show error to user
        return;
      }

      // Only attempt to read once:
      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! You can now log in.");
        router.replace("/welcome"); // Navigate to the welcome screen
      } else {
        alert("Error: " + (data.message || "Registration failed."));
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Network Error");
    }
  };

  //TODO: Remove all this context stuff in the future, because the profile screen with fetch details from database
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
    if (!username || !password || !passwordMatch) {
      alert("Please fill in all required fields.");
      return;
    }
    handleRegister();
    setUserInfo({
      username,
      firstName,
      lastName,
      age: Number(age),
      heightFt: Number(heightFt),
      heightIn: Number(heightIn),
      weight: Number(weight),
      preferredTime,
      workoutType,
      experienceLevel,
      personalBio,
      profileImage,
    });

    //router.push("/match");
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
              {profileImage && (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              )}
              <TouchableOpacity
                onPress={handlePickImageAsync}
                style={styles.selectProfileImageBox}
              >
                <Text style={styles.selectProfileText}>
                  {profileImage
                    ? "Change Profile Image"
                    : "Select Profile Image"}
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
              {emailError && <Text style={styles.errorText}>{emailError}</Text>}
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
                <Text style={styles.errorText}>Passwords do not match</Text>
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
