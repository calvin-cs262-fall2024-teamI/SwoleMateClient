import React, { useState } from 'react';
import { View, Text, Button, ImageBackground, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { styles as profileStyles } from './PC_Style'; // Importing the styles from ProfileCreatorStyles.js

const HubScreen = ({ navigation }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <ImageBackground
      source={require('../assets/swole.png')} // Same background image as the MatchScreen
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Updated Hub Screen Text at the top */}
        <Text style={styles.text}>Hub Screen</Text>

        {/* Rounded and Blended Logo */}
        <Image source={require('../assets/SmallerLogo.png')} style={styles.logo} />

        {/* Social Buttons Section */}
        <View style={styles.socialSection}>
          {/* Messenger Button (placeholder) */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Messenger', { userName: 'Select Contact' })}>
            <Text style={styles.buttonText}>Messenger</Text>
          </TouchableOpacity>

          {/* Matches Button (navigates to MatchScreen) */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MatchScreen')}>
            <Text style={styles.buttonText}>Matches</Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown for Profile-related Actions */}
        <View style={styles.dropdownSection}>
          {/* Dropdown Toggle Button */}
          <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
            <Text style={styles.buttonText}>Profile Options</Text>
          </TouchableOpacity>

          {/* Dropdown Menu Content */}
          {isDropdownVisible && (
            <View style={styles.dropdownContent}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Account Details</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ...profileStyles, // Reuse styles from ProfileCreatorStyles.js

  // Background and container styles to align with the MatchScreen and ProfileCreator styles
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
  },

  // Updated text styling
  text: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black', // Aligning the text color with the ProfileCreator screen
  },

  // Rounded and blended logo styling
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30, // Space between the logo and the buttons
    borderRadius: 75, // To round the corners of the image
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)', // Light shadow effect for blending
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light blending background
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  // Social buttons section
  socialSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30, // Add space between social buttons and profile section
  },

  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Dropdown section
  dropdownSection: {
    width: '80%',
    alignItems: 'center',
  },
  dropdownContent: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  dropdownItem: {
    padding: 15,
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default HubScreen;
