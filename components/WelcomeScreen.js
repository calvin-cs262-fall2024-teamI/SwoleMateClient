  import React, { useState } from 'react';

  import { View, Text, Button, TextInput, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
  import AppIntroSlider from 'react-native-app-intro-slider';
  function WelcomeScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                onPress={checkTextBox(email,password)? ()=>console.log(" fill the textboxes"):() => navigation.navigate('ProfileCreator')    }
              />
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>
    );  
  }

  function checkTextBox (email,password){
      if(email===""||password===""){
        return true;
      }

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
      // Ensure the button spans the full width
      marginTop: 10,        // Add margin to create space between the picker and the button
    },
  }






  export default WelcomeScreen;



