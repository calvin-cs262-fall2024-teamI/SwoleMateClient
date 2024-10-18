import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

function MatchScreen({ navigation }) {
  const [nearbyUsers, setNearbyUsers] = useState([
    { id: '1', name: 'John Doe', age: 25, height: '6 ft', weight: '180 lbs' },
    { id: '2', name: 'Jane Doe', age: 28, height: '5 ft 6 in', weight: '150 lbs' },
    { id: '3', name: 'Beyonce', age: 22, height: '5 ft 7 in', weight: '137 lbs' },
    { id: '4', name: 'Tom Cruise', age: 27, height: '5 ft 7 in', weight: '201 lbs' },
    { id: '5', name: 'Jennifer Lopez', age: 24, height: '5 ft 5 in', weight: '120 lbs' },
    { id: '6', name: 'Brad Pitt', age: 30, height: '6 ft 0 in', weight: '203 lbs' },
    { id: '7', name: 'Carrie Underwood', age: 26, height: '5 ft 3 in', weight: '117 lbs' },
    { id: '8', name: 'Travis Kelce', age: 29, height: '6 ft 5 in', weight: '250 lbs' },
    { id: '9', name: 'Jennifer Lawrence', age: 23, height: '5 ft 9 in', weight: '138 lbs' },
    { id: '10', name: 'Patrick Mahomes', age: 31, height: '6 ft 2 in', weight: '225 lbs' },
    { id: '11', name: 'Taylor Swift', age: 20, height: '5 ft 11 in', weight: '119 lbs' },
  ]);

  const handleMatch = (userId) => {
    setNearbyUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, matched: true } : user
      )
    );
  };

  const handleIgnore = (userId) => {
    setNearbyUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
  };

  return (
    <ImageBackground
      source={require('../assets/swole.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* List of nearby users */}
        <FlatList
          data={nearbyUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.userCard,
                item.matched && styles.matchedUserCard, // Apply green background if matched
              ]}
            >
              <Image source={require('../assets/SmallerLogo.png')} style={styles.profileImage} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text>Age: {item.age}</Text>
                <Text>Height: {item.height}</Text>
                <Text>Weight: {item.weight}</Text>
              </View>

              <View style={styles.buttonGroup}>
                {item.matched ? (
                  <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.buttonText}>Message</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.matchButton}
                    onPress={() => handleMatch(item.id)}
                  >
                    <Text style={styles.buttonText}>Match</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.ignoreButton}
                  onPress={() => handleIgnore(item.id)}
                >
                  <Text style={styles.buttonText}>Ignore</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

// The stylesheet for the MatchScreen portion of the app.
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background for consistency
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  matchedUserCard: {
    backgroundColor: 'rgba(144, 238, 144, 0.6)', // Light transparent green
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  userInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  matchButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 5, // Space between Match and Ignore buttons
  },
  ignoreButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  messageButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
});

export default MatchScreen;
