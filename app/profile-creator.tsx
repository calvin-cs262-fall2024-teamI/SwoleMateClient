import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import axios from "axios";
import globalStyles from "./stylesheets/globalStyles";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@/nonapp/UserContext";
import { ExperienceLevel, Gender } from "@/api/enums";

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;

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
  const [gender, setGender] = useState<Gender | null>(null);
  const [city, setCity] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(null);
  const [personalBio, setPersonalBio] = useState("");
  const [profileImageForm, setProfileImageForm] = useState<FormData | null>(
    null
  );
  const [imageURI, setImageUri] = useState<string | null>(null);
  const context = useContext(UserContext);

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
      gender: gender, // Set the selected gender here
      city: city,
      profilePictureUrl: null, // Initially null
      experienceLevel: experienceLevel, // Experience level from picker
      bio: personalBio,
    };

    try {
      console.log(userProfile);
      // Register user
      const response = await apiClient.post("/api/auth/register", userProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        //store the accesstoken to storage since we are not redirecting to login
        const { accessToken, refreshToken, id } = response.data.data;
        if (accessToken && refreshToken && id) {
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
          // Update the UserContext with the user ID
          if (context) {
            context.setUserId(id.toString());
          }
        } else {
          console.log("Did not get the user id from the response");
        }
        alert("Registration Successful!");

        // Upload profile picture if available
        if (profileImageForm) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const uploadResponse = await apiClient.post(
              `/api/auth/upload-profile-picture/${id}`,
              profileImageForm
            );
            // console.log("Upload response:", uploadResponse);
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            alert("Failed to upload profile picture.");
          }
        }

        // router.replace("/welcome");
        //take them to setting preferences
        router.replace("/preferences");
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
                style={styles.input}
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
              {/* Open the gender picker modal */}
              <Text style={styles.label}>Gender</Text>
              <Picker
                selectedValue={gender}
                onValueChange={itemValue => setGender(itemValue)}
                style={{ marginVertical: -50 }} // Adjust width here
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
              <Text style={styles.label}>City:</Text>
              <TextInput
                placeholder="Enter your city:"
                value={city}
                onChangeText={setCity}
                keyboardType="ascii-capable"
                style={styles.input}
              />
              <Text style={styles.label}>Height:</Text>

              <TextInput
                placeholder="Feet"
                value={heightFt}
                onChangeText={setHeightFt}
                keyboardType="numeric"
                style={styles.input}
              />

              <TextInput
                placeholder="Inches"
                value={heightIn}
                onChangeText={setHeightIn}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text style={styles.label}>Weight</Text>
              <TextInput
                placeholder="Weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />
              {/* Open the gender picker modal */}
              <Text style={styles.label}>Experience Level</Text>
              <View style={{ overflow: "hidden", marginTop: -12 }}>
                <Picker
                  selectedValue={experienceLevel}
                  onValueChange={itemValue => setExperienceLevel(itemValue)}
                  style={{ marginVertical: -50 }} // Adjust width here
                >
                  <Picker.Item label="Beginner" value="beginner" />
                  <Picker.Item label="Intermediate" value="intermediate" />
                  <Picker.Item label="Advanced" value="advanced" />
                  <Picker.Item label="Expert" value="expert" />
                </Picker>
              </View>
              {/* Profile Bio */}
              <Text style={styles.label}>Personal Bio</Text>
              <TextInput
                placeholder="Tell us about yourself"
                value={personalBio}
                onChangeText={setPersonalBio}
                multiline
                style={styles.bioInput}
              />

              <View style={styles.buttonContainer}>
                <Button title="Save Profile" onPress={handleSaveProfile} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ProfileCreator;
