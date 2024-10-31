import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { fakeUsers } from "../api/fakedata";

function MatchScreen() {
  // Sample matches to display on the screen - will make these iterative/changeable once the profile is fully done.
  const [nearbyUsers, setNearbyUsers] = useState(fakeUsers);

  const handleMatch = (userId: string) => {
    setNearbyUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, matched: true, pending: true } // Set both matched and pending to true
          : user
      )
    );
  };

  const handleIgnore = (userId: string) => {
    setNearbyUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/swole.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Match Screen</Text>

          {/* List of nearby users */}
          <FlatList
            data={nearbyUsers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.userCard,
                  item.matched && styles.matchedUserCard, // Apply green background if matched
                ]}
              >
                <Image source={require("@/assets/SmallerLogo.png")} style={styles.profileImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text>Age: {item.age}</Text>
                  <Text>Height: {item.height}</Text>
                  <Text>Weight: {item.weight}</Text>
                </View>

                <View style={styles.buttonGroup}>
                  {item.matched ? (
                    <TouchableOpacity style={styles.pendingButton}>
                      <Text style={styles.buttonText}>
                        {item.pending ? "Pending" : "Message"}{" "}
                        {/* Show "Pending" if pending is true */}
                      </Text>
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
    </SafeAreaView>
  );
}

// The stylesheet for the MatchScreen portion of the app.
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly transparent white background for consistency
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  matchedUserCard: {
    backgroundColor: "rgba(255, 165, 0, 0.6)", // Light transparent orange
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  userInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  matchButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginRight: 5, // Space between Match and Ignore buttons
  },
  ignoreButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  messageButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  pendingButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
});

export default MatchScreen;
