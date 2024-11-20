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
  StyleSheet,
} from "react-native";
import { UserContext } from "./UserContext";

function ProfileCreator() {
  const [username, setUsername] = useState("");
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
  const { setUserInfo } = useContext(UserContext);

  const handlePickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
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

  const handleSaveProfile = () => {
    if (!username || !password || !passwordMatch) {
      alert("Please fill in all required fields.");
      return;
    }

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

    router.push("/match");
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    color: "#4B0082",
    marginTop: 10,
  },
  profileImageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  selectProfileImageBox: {
    padding: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#E6E6FA",
  },
  selectProfileText: {
    color: "#4B0082",
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: "#F0F0F5",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
    marginBottom: 15,
  },
  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heightInput: {
    width: "48%",
    height: 40,
    backgroundColor: "#F0F0F5",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
  },
  bioInput: {
    height: 80,
    backgroundColor: "#F0F0F5",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: "#6A5ACD",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#6A5ACD",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOptionsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ProfileCreator;
