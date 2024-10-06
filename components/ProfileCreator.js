import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView, Modal } from 'react-native';

function ProfileCreator({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [workoutType, setWorkoutType] = useState('cardio');
  const [activePicker, setActivePicker] = useState(null); // To track which picker is open
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state

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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          {/* Logo at the top left */}
          <Image
            source={require('../assets/SmallerLogo.png')}  // Adjust the path to the logo if necessary
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          {/* Title to the right of the logo */}
          <Text style={{ fontSize: 24 }}>Create Your Profile</Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          {/* First Name Input */}
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          {/* Last Name Input */}
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          {/* Age Input */}
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* Height Inputs (Feet and Inches) */}
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

          {/* Weight Input */}
          <TextInput
            placeholder="Weight (lbs)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* Preferred Time Picker */}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => openModal('preferredTime')}
          >
            <Text>{preferredTime.charAt(0).toUpperCase() + preferredTime.slice(1)}</Text>
          </TouchableOpacity>

          {/* Workout Type Picker */}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => openModal('workoutType')}
          >
            <Text>{workoutType.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</Text>
          </TouchableOpacity>

          {/* Modal for Pickers */}
          <Modal
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
            animationType="slide"
          >
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

                  {/* Close Button */}
                  <Button title="Close" onPress={closeModal} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Save Profile Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Save Profile"
              onPress={() => console.log('Profile Saved!')}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  heightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  heightInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '48%',
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    borderColor: 'green',
    borderWidth: 1,
    width: '100%', // Ensure the button spans the full width
    marginTop: 150, // Add margin to create space between the picker and the button
  },
};

export default ProfileCreator;
