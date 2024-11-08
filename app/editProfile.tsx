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
  StyleSheet,
} from "react-native";

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

  const openModal = (pickerType: any) => {
    setActivePicker(pickerType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActivePicker(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/SmallerLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Edit Your Profile</Text>
        </View>

        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handlePickImageAsync} style={styles.selectProfileImageBox}>
            <Text style={styles.selectProfileText}>Select Profile Image</Text>
          </TouchableOpacity>
          {profileImage && (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          )}
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
            numberOfLines={4}
          />

          <Text style={styles.pickerLabel}>Preferred Time to Workout:</Text>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => openModal("preferredTime")}
          >
            <Text style={styles.pickerText}>
              {preferredTime.charAt(0).toUpperCase() + preferredTime.slice(1)}
            </Text>
          </TouchableOpacity>

          <Text style={styles.pickerLabel}>Experience Level:</Text>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => openModal("experienceLevel")}
          >
            <Text style={styles.pickerText}>
              {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}
            </Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType="slide"
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" }}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
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
    fontWeight: "bold",
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  selectProfileImageBox: {
    padding: 8,
    borderColor: "#6A5ACD",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#E6E6FA",
  },
  selectProfileText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  label: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
    alignSelf: "flex-start",
    paddingLeft: "10%",
  },
  input: {
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderColor: "#6A5ACD",
    borderWidth: 2,
    width: "80%",
  },
  bioInput: {
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: "#6A5ACD",
    borderWidth: 2,
    textAlignVertical: "top",
    marginBottom: 15,
    width: "80%",
  },
  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "80%",
  },
  heightInput: {
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 5,
    width: "48%",
    paddingHorizontal: 10,
    borderColor: "#6A5ACD",
    borderWidth: 2,
  },
  pickerLabel: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
    alignSelf: "flex-start",
    paddingLeft: "10%",
  },
  pickerContainer: {
    backgroundColor: "#E6E6FA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    borderColor: "#6A5ACD",
    borderWidth: 2,
  },
  pickerText: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    backgroundColor: "#6A5ACD",
    padding: 10,
    width: "60%",
    borderRadius: 8,
    marginTop: 20,
  },
});

export default EditProfile;
