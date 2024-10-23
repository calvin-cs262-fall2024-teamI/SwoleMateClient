import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyleSheet } from "react-native";

function ProfileCreator() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [preferredTime, setPreferredTime] = useState("morning");
  const [workoutType, setWorkoutType] = useState("cardio");
  const [activePicker, setActivePicker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  const handleOutsidePress = () => {
    setActivePicker(null); // Close any open picker when clicking outside
  };

  const openModal = (pickerType: any) => {
    setActivePicker(pickerType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActivePicker(null);
  };

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

  const handleSelection = (itemValue: any, pickerType: any) => {
    if (pickerType === "preferredTime") {
      setPreferredTime(itemValue);
    } else if (pickerType === "workoutType") {
      setWorkoutType(itemValue);
    }
    closeModal();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={handleOutsidePress} accessible={false}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <View style={styles.header}>
            <Image
              source={require("@/assets/SmallerLogo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Create Your Profile</Text>
          </View>

          <TouchableOpacity onPress={handlePickImageAsync}>
            <Text
              style={[styles.selectprofileText, styles.selectProfileImageBox]}
            >
              Select Profile Image
            </Text>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
              />
              <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
              />
              <View style={styles.heightContainer}>
                <TextInput
                  placeholder="Height (ft)"
                  value={heightFt}
                  onChangeText={setHeightFt}
                  keyboardType="numeric"
                  style={styles.heightInput}
                />
                <TextInput
                  placeholder="Height (in)"
                  value={heightIn}
                  onChangeText={setHeightIn}
                  keyboardType="numeric"
                  style={styles.heightInput}
                />
              </View>
              <TextInput
                placeholder="Weight (lbs)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            {profileImage && (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            )}

            <Text style={styles.pickerLabel}>Preferred Time to Workout:</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => openModal("preferredTime")}
            >
              <Text style={styles.pickerText}>
                {preferredTime.charAt(0).toUpperCase() + preferredTime.slice(1)}
              </Text>
            </TouchableOpacity>

            <Text style={styles.pickerLabel}>Workout Type:</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => openModal("workoutType")}
            >
              <Text style={styles.pickerText}>
                {workoutType
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={isModalVisible}
              onRequestClose={closeModal}
              animationType="slide"
            >
              <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    {activePicker === "preferredTime" && (
                      <View>
                        <Text style={styles.modalTitle}>
                          Preferred Time to Workout:
                        </Text>
                        {["morning", "afternoon", "evening"].map((item) => (
                          <TouchableOpacity
                            key={item}
                            onPress={() =>
                              handleSelection(item, "preferredTime")
                            }
                            style={styles.modalOption}
                          >
                            <Text>
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Text>
                            {preferredTime === item && <Text> ✔</Text>}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {activePicker === "workoutType" && (
                      <View>
                        <Text style={styles.modalTitle}>Workout Type:</Text>
                        {[
                          "cardio",
                          "strength-upper-push",
                          "strength-upper-pull",
                          "strength-lower-body",
                          "hypertrophy-upper-push",
                          "hypertrophy-upper-pull",
                          "hypertrophy-lower-body",
                          "recovery",
                        ].map((item) => (
                          <TouchableOpacity
                            key={item}
                            onPress={() => handleSelection(item, "workoutType")}
                            style={styles.modalOption}
                          >
                            <Text>
                              {item
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                            </Text>
                            {workoutType === item && <Text> ✔</Text>}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    <Button title="Close" onPress={closeModal} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.buttonContainer}>
              <Button
                title="Save Profile"
                onPress={() => router.push("/match")}
                color="white"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

// styles/ProfileCreatorStyles.js

export const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  inputContainer: {
    width: "80%",
  },

  selectProfileImageBox: {
    // added a style for Select Profile Image box
    padding: "2%",
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
    right: "-14%", // Adjusted to be relative to the container
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  selectprofileText: {
    // added a style for select profile image text (similar to pickerText style)
    color: "black",
    textAlign: "center",
    fontSize: 15,
  },

  input: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent input background
    borderRadius: 5,
    marginBottom: "8%",
    paddingHorizontal: 10,
    borderColor: "blue",
    borderWidth: 2,
  },
  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heightInput: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Same style as other inputs
    borderRadius: 5,
    width: "48%",
    paddingHorizontal: 10,
    borderColor: "blue",
    borderWidth: 2,
  },
  pickerLabel: {
    width: "80%",
    color: "black", // Changed to black
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    borderColor: "blue",
    borderWidth: 2,
  },
  pickerText: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  buttonContainer: {
    backgroundColor: "blue",
    padding: 10,
    width: "60%",
    borderRadius: 5,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: "black", // Changed to black
  },
  profileImage: {
    // added a style to display profile image
    width: 60,
    height: 60,
    borderRadius: 10,
    position: "absolute",
    top: "-10%", // Adjusted to be relative to the container
    right: "20%", // Adjusted to be relative to the container
  },
});

export default ProfileCreator;
