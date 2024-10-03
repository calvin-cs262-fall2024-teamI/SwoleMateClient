import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

function WelcomeScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const slides = [
    {
      key: 'slide1',
      title: 'Find a gym buddy from your gym',
      text: 'This is the first slide',
      image: require('../assets/couple_working.jpg'),  // Make sure this path is correct
    },
    {
      key: 'slide2',
      title: 'Discover Amazing Features',
      text: 'This is the second slide',
      image: require('../assets/gym_background.jpg'),  // Make sure this path is correct
    },
  ];

  const RenderSlide = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <Image source={item.image} style={styles.image} />  {/* Ensure the style here is correct */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          data={slides}
          renderItem={RenderSlide}
          showNextButton={false}
          showDoneButton={false}
        />    
        
        {/* Add your form below the slider */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }}>
          <Text style={{ fontSize: 24, color: 'white' }}>Welcome to SwoleMates</Text>
          <Text style={{ fontSize: 15, color: 'white' }}>Find your perfect Gym Partner</Text>
          <View style={{ justifyContent: 'center', width: '80%', margin: 50 }}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="SIGN IN"
                onPress={() => console.log('Go to sign in page')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="REGISTER"
                onPress={checkTextBox(email, password) ? () => console.log("Fill the textboxes") : () => navigation.navigate('ProfileCreator')}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function checkTextBox(email, password) {
  return email === "" || password === "";
}

const styles = {
  input: {
    height: 40,
    color: 'white',
    borderWidth: 1,
    marginBottom: 20,
    borderColor: 'black',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 300,  // Set a fixed width and height for the image
    height: 200,
    resizeMode: 'contain',  // Ensure the image scales properly within the space
  },
  title: {
    fontSize: 24,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
};

export default WelcomeScreen;
