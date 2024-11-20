import React, { useState, useContext, useEffect } from "react";
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
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "./UserContext";

function EditProfile() {
  const { userInfo, setUserInfo } = useContext(UserContext); // Retrieve user data from context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [personalBio, setPersonalBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activePicker, setActivePicker] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  // Populate fields with existing user info when the component loads
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setAge(userInfo.age?.toString() || "");
      setHeightFt(userInfo.heightFt?.toString() || "");
      setHeightIn(userInfo.heightIn?.toString() || "");
      setWeight(userInfo.weight?.toString() || "");
      setPreferredTime(userInfo.preferredTime || "morning");
      setWorkoutType(userInfo.workoutType || "cardio");
      setExperienceLevel(userInfo.experienceLevel || "beginner");
      setPersonalBio(userInfo.personalBio || "");
      setProfileImage(userInfo.profileImage || null);
    }
  }, [userInfo]);

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

  const handleSaveProfile = () => {
    const updatedProfile = {
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
    };

    setUserInfo(updatedProfile); // Save the updated profile
    alert("Profile updated successfully!");
    router.push("/match"); // Navigate to another screen
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
              <Text style={styles.title}>Edit Your Profile</Text>
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
                placeholder="Weight (lbs)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />

              <Text style={styles.label}>Personal Bio</Text>
              <TextInput
                placeholder="Write something about yourself..."
                value={personalBio}
                onChangeText={setPersonalBio}
                style={styles.bioInput}
                multiline
              />

              <Text style={styles.label}>Preferred Time to Workout:</Text>
              <TouchableOpacity
                onPress={() => {
                  setActivePicker("preferredTime");
                  setModalVisible(true);
                }}
                style={styles.pickerContainer}
              >
                <Text style={styles.pickerText}>
                  {preferredTime.charAt(0).toUpperCase() +
                    preferredTime.slice(1)}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Workout Type:</Text>
              <TouchableOpacity
                onPress={() => {
                  setActivePicker("workoutType");
                  setModalVisible(true);
                }}
                style={styles.pickerContainer}
              >
                <Text style={styles.pickerText}>
                  {workoutType.charAt(0).toUpperCase() + workoutType.slice(1)}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Experience Level:</Text>
              <TouchableOpacity
                onPress={() => {
                  setActivePicker("experienceLevel");
                  setModalVisible(true);
                }}
                style={styles.pickerContainer}
              >
                <Text style={styles.pickerText}>
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
                        ["Morning", "Afternoon", "Evening"].map(item => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => handleSelection(item.toLowerCase())}
                            style={styles.modalOption}
                          >
                            <Text style={styles.modalOptionText}>{item}</Text>
                          </TouchableOpacity>
                        ))}
                      {activePicker === "workoutType" &&
                        ["Cardio", "Strength", "Hypertrophy"].map(item => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => handleSelection(item.toLowerCase())}
                            style={styles.modalOption}
                          >
                            <Text style={styles.modalOptionText}>{item}</Text>
                          </TouchableOpacity>
                        ))}
                      {activePicker === "experienceLevel" &&
                        ["Beginner", "Intermediate", "Advanced"].map(item => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => handleSelection(item.toLowerCase())}
                            style={styles.modalOption}
                          >
                            <Text style={styles.modalOptionText}>{item}</Text>
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
    fontSize: 16,
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
  pickerContainer: {
    padding: 10,
    backgroundColor: "#E6E6FA",
    borderRadius: 5,
    borderColor: "#6A5ACD",
    borderWidth: 1,
    marginBottom: 15,
  },
  pickerText: {
    fontSize: 16,
    color: "#4B0082",
    textAlign: "center",
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
    padding: 15,
    marginVertical: 5,
    width: "100%",
    backgroundColor: "#E6E6FA",
    borderRadius: 5,
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#4B0082",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});

export default EditProfile;
