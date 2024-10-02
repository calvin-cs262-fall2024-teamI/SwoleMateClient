  import React, { useState } from 'react';
  import { View, Text, Button, TextInput, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
  import { Picker } from '@react-native-picker/picker'; // Import Picker if needed


  function ProfileCreator({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [weight, setWeight] = useState('');
    const [preferredTime, setPreferredTime] = useState('morning');

    return (
      <TouchableWithoutFeedback onPress={     Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, padding: 20 }}>
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
            <Text style={{ marginBottom: 10 }}>Preferred Time to Workout:</Text>
            <Picker
              selectedValue={preferredTime}
              onValueChange={(itemValue) => setPreferredTime(itemValue)}
              style={{ height: 50, width: '100%', marginBottom: 20 }}
            >
              <Picker.Item label="Morning" value="morning" />
              <Picker.Item label="Afternoon" value="afternoon" />
              <Picker.Item label="Evening" value="evening" />
            </Picker>

            {/* Save Profile Button */}
            <View style={styles.buttonContainer}>
              <Button
                title="Save Profile"
                onPress={() => console.log('Profile Saved!')}
              />
            </View>
          </View>
        </View>
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
    buttonContainer: {
      borderColor: 'green',               
      borderWidth:1,
      width: '100%',        // Ensure the button spans the full width
      marginTop: 150,        // Add margin to create space between the picker and the button
    },
  };

  export default ProfileCreator;
