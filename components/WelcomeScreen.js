/**
 * WelcomeScreen Component
 * 
 * This component serves as the initial screen of the SwoleMates application. 
 * It features a background slider showcasing images related to fitness, 
 * along with input fields for user registration and sign-in. 
 * It provides immediate visual feedback on the validity of user inputs.
 * 
 * @component
 * @param {object} navigation - The navigation object provided by React Navigation, 
 * allowing navigation between screens.
 * 
 * @example
 * // Usage within a Navigator
 * <Stack.Screen name="Welcome" component={WelcomeScreen} />
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity,TextInput, Image, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

/**
 * Renders a single slide for the introduction slider.
 *
 * @param {object} item - The slide data including text and image.
 * @returns {JSX.Element} The rendered slide.
 */
const RenderSlide = ({ item }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.overlay} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

function WelcomeScreen({ navigation }) {
  // State variables to manage email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // Reference for the AppIntroSlider
  const sliderRef = useRef(null);

  // Slide data for the AppIntroSlider
  const slides = [
    {
      key: 'slide1',
      text: 'This is the first slide',
      image: require('../assets/gym_background.jpg'),
    },
    {
      key: 'slide2',
      text: 'This is the second slide',
      image: require('../assets/two_people_working_out.jpg'),
    },
    {
      key: 'slide3',
      text: 'This is the third slide',
      image: require('../assets/couple_working.jpg'),
    },
  ];

  // Effect to cycle through slides every 5 seconds
  useEffect(() => {
    let currentIndex = 0; // Start with the first slide
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length; // Move to the next slide
      sliderRef.current.goToSlide(currentIndex, true); // Change slide with animation
    }, 5000); 

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Handler for the REGISTER button
  const handleRegister = () => {
    const isEmailValid = email !== ""; 
    const isPasswordValid = password !== ""; 

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      navigation.navigate('ProfileCreator'); 
    } else {
      console.log("Fill the textboxes");
    }
  };

  // Handler for the SIGN IN button
  const handleSignin = () => {
    const isEmailValid = email !== "";
    const isPasswordValid = password !== "";

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      // navigation.navigate('MatchScreen'); 
    } else {
      console.log("Fill the textboxes");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        {/* Background Slider */}
        <AppIntroSlider
          ref={sliderRef}
          data={slides}
          renderItem={RenderSlide}
          showNextButton={false}
          showDoneButton={false}
        />

        {/* Overlay Form */}
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/SmallerLogo.png')}
            style={{ width: 85, height: 85, marginBottom: 30, borderRadius: 10 }}
          />
          <Text style={styles.title}>Welcome to SwoleMates</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, !emailValid && styles.invalidInput]}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, !passwordValid && styles.invalidInput]}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.customButton} onPress={handleSignin}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.customButton} onPress={handleRegister}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  formContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: '10%',
    zIndex: 1,
    fontFamily: 'Sansita', // Set font family
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    marginBottom: '8%',
    paddingHorizontal: 10,
    borderColor: 'blue',
    borderWidth: 2,
  },
  invalidInput: {
    borderColor: 'red',
  },
  buttonContainer: {
    width: '60%',
    marginTop: '3%', // Maintain the gap
  },
  customButton: {
    backgroundColor: '#2F80ED', // Updated button color
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16,
    fontFamily: 'Sansita', // Set font family
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    bottom: '55%',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default WelcomeScreen;
