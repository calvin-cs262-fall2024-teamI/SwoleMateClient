import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileCreator from './components/ProfileCreator';
import WelcomeScreen from './components/WelcomeScreen';
import HubScreen from './components/HubScreen';
import MatchScreen from './components/MatchScreen';
import Messenger from './components/Messenger'; // Import Messenger component

// HomeScreen component
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

// Create the stack navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />

        {/* Welcome Screen */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} // Hide the header for WelcomeScreen
        />

        {/* Profile Creator Screen */}
        <Stack.Screen 
          name="ProfileCreator" 
          component={ProfileCreator} 
          options={{ title: 'Create Profile' }}
        />

        {/* Hub Screen */}
        <Stack.Screen 
          name="HubScreen" 
          component={HubScreen} 
          options={{ title: 'Hub' }} // Title for the Hub Screen
        />

        {/* Match Screen */}
        <Stack.Screen 
          name="MatchScreen" 
          component={MatchScreen} 
          options={{ title: 'Match' }} // Title for the Match Screen
        />
        
        {/* Messenger Screen */}
        <Stack.Screen 
          name="Messenger" 
          component={Messenger} 
          options={({ route }) => ({ title: `Chat with ${route.params.userName}` })} // Dynamic title using passed user name
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
