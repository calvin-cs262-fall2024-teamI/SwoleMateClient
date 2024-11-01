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

function EditProfile() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [age, setAge] = useState("25");
  const [heightFt, setHeightFt] = useState("6");
  const [heightIn, setHeightIn] = useState("2");
  const [weight, setWeight] = useState("180");
  const [preferredTime, setPreferredTime] = useState("morning");
  const [workoutType, setWorkoutType] = useState("cardio");
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [personalBio, setPersonalBio] = useState("Fitness enthusiast and gym lover.");
  const [activePicker, setActivePicker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  const handleOutsidePress = () => {
    setActivePicker(null);
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
    } else if (pickerType === "experienceLevel") {
      setExperienceLevel(itemValue);
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
            <Text style={styles.title}>Edit Your Profile</Text>
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
                numberOfLines={4}
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

            <Text style={styles.pickerLabel}>Experience Level:</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => openModal("experienceLevel")}
            >
              <Text style={styles.pickerText}>
                {experienceLevel.charAt(0).toUpperCase() +
                  experienceLevel.slice(1)}
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
                        {["morning", "afternoon", "evening", "no preference"].map((item) => (
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
                          "no preference",
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

                    {activePicker === "experienceLevel" && (
                      <View>
                        <Text style={styles.modalTitle}>Experience Level:</Text>
                        {["beginner", "intermediate", "advanced", "expert"].map(
                          (item) => (
                            <TouchableOpacity
                              key={item}
                              onPress={() =>
                                handleSelection(item, "experienceLevel")
                              }
                              style={styles.modalOption}
                            >
                              <Text>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                              </Text>
                              {experienceLevel === item && <Text> ✔</Text>}
                            </TouchableOpacity>
                          )
                        )}
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
      padding: "2%",
      borderColor: "blue",
      borderWidth: 2,
      borderRadius: 5,
      alignSelf: "flex-start",
      right: "-14%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    selectprofileText: {
      color: "black",
      textAlign: "center",
      fontSize: 15,
    },
    label: {
      fontSize: 14,
      color: "black",
      marginBottom: 5,
    },
    input: {
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: 5,
      marginBottom: "8%",
      paddingHorizontal: 10,
      borderColor: "blue",
      borderWidth: 2,
    },
    invalidInput: {
      borderColor: "red", // Border color when input is invalid
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginBottom: 10,
    },
    bioInput: {
      height: 100,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingTop: 10,
      borderColor: "blue",
      borderWidth: 2,
      textAlignVertical: "top",
    },
    heightContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    heightInput: {
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: 5,
      width: "48%",
      paddingHorizontal: 10,
      borderColor: "blue",
      borderWidth: 2,
    },
    pickerLabel: {
      width: "80%",
      color: "black",
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
      color: "black",
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 10,
      position: "absolute",
      top: "-10%",
      right: "20%",
    },
  });
  
  export default EditProfile;
  