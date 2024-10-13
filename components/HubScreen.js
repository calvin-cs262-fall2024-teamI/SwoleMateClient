// HubScreen.js
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { styles as profileStyles } from './PC_Style'; // Importing the styles from ProfileCreatorStyles.js

const HubScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Hub Screen!</Text>
      {/* Button to navigate to the MatchScreen */}
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Match Screen"
          onPress={() => navigation.navigate('MatchScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...profileStyles, // Use the imported styles and add your own custom styles below
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default HubScreen;
