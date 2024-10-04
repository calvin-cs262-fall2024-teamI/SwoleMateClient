import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileCreator from './components/ProfileCreator'; // Import the ProfileCreator component
import WelcomeScreen from './components/WelcomeScreen';
import MatchScreen from './components/MatchScreen';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile Creator"
        onPress={() => navigation.navigate('ProfileCreator')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} // Hide the header for WelcomeScreen
        />
        <Stack.Screen 
          name="ProfileCreator" 
          component={ProfileCreator} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
