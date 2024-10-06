// HubScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HubScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Hub Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HubScreen;
