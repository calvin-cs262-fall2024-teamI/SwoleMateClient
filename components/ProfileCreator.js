import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Button, Image } from 'react-native';
import { styles } from './PC_Style'; // Importing the styles
import * as ImagePicker from 'expo-image-picker';

function ProfileCreator({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [workoutType, setWorkoutType] = useState('cardio');
  const [activePicker, setActivePicker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleOutsidePress = () => {
    setActivePicker(null); // Close any open picker when clicking outside
  };

  const openModal = (pickerType) => {
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
      alert('You did not select any image.');
    }
  };

  const handleSelection = (itemValue, pickerType) => {
    if (pickerType === 'preferredTime') {
      setPreferredTime(itemValue);
    } else if (pickerType === 'workoutType') {
      setWorkoutType(itemValue);
    }
    closeModal();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress} accessible={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View style={styles.header}>
          <Image
            source={require('../assets/SmallerLogo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Create Your Profile</Text>
        </View>

        <TouchableOpacity style={[styles.selectProfileImage]} onPress={handlePickImageAsync}>
          <Text style={[styles.selectprofileText, styles.selectProfileImageBox]}>Select Profile Image</Text>
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
            onPress={() => openModal('preferredTime')}
          >
            <Text style={styles.pickerText}>{preferredTime.charAt(0).toUpperCase() + preferredTime.slice(1)}</Text>
          </TouchableOpacity>

          <Text style={styles.pickerLabel}>Workout Type:</Text>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => openModal('workoutType')}
          >
            <Text style={styles.pickerText}>{workoutType.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</Text>
          </TouchableOpacity>

          <Modal transparent={true} visible={isModalVisible} onRequestClose={closeModal} animationType="slide">
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  {activePicker === 'preferredTime' && (
                    <View>
                      <Text style={styles.modalTitle}>Preferred Time to Workout:</Text>
                      {['morning', 'afternoon', 'evening'].map((item) => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => handleSelection(item, 'preferredTime')}
                          style={styles.modalOption}
                        >
                          <Text>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                          {preferredTime === item && <Text> ✔</Text>}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {activePicker === 'workoutType' && (
                    <View>
                      <Text style={styles.modalTitle}>Workout Type:</Text>
                      {['cardio', 'strength-upper-push', 'strength-upper-pull', 'strength-lower-body', 'hypertrophy-upper-push', 'hypertrophy-upper-pull', 'hypertrophy-lower-body', 'recovery'].map((item) => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => handleSelection(item, 'workoutType')}
                          style={styles.modalOption}
                        >
                          <Text>{item.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</Text>
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
              onPress={() => navigation.navigate('HubScreen')} // Navigate to HubScreen on press
              color="white"
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default ProfileCreator;
