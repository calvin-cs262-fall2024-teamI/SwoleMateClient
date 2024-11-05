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
  TextInput,
} from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Import the dropdown package
import { fakeUsers } from "../api/fakedata";

function MatchScreen() {
  const [nearbyUsers, setNearbyUsers] = useState(fakeUsers);
  const [selectedFilter, setSelectedFilter] = useState(null); // State for dropdown selection
  const [specificFilter, setSpecificFilter] = useState(""); // State for text input

  const handleMatch = (userId) => {
    setNearbyUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, matched: true, pending: true }
          : user
      )
    );
  };

  const handleIgnore = (userId) => {
    setNearbyUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  // Function to filter users based on selected filter and text input
  const filterUsers = () => {
    return nearbyUsers.filter(user => {
      const matchesFilter = selectedFilter
        ? user.category === selectedFilter // Adjust this based on your data structure
        : true;
      const matchesText = user.name.toLowerCase().includes(specificFilter.toLowerCase());
      return matchesFilter && matchesText;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/swole.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* Removed Match Screen title */}
          
          {/* Filter container for dropdown and text input */}
          <View style={styles.filterContainer}>
            <RNPickerSelect
              placeholder={{ label: "Filter by: ", value: null }}
              onValueChange={value => setSelectedFilter(value)}
              items={[
                { label: "City", value: "city" },
                { label: "Age", value: "age" },
                { label: "Height", value: "height" },
                { label: "Gym", value: "gym" },
                { label: "Rating", value: "rating" },
                { label: "Regular or Trainer", value: "regularTrainer" },
              ]}
              style={pickerSelectStyles}
            />
            <TextInput
              style={styles.filterTextInput}
              placeholder="Enter Value" // Updated placeholder text
              value={specificFilter}
              onChangeText={text => setSpecificFilter(text)}
            />
          </View>

          {/* List of nearby users */}
          <FlatList
            data={filterUsers()}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.userCard,
                  item.matched && styles.matchedUserCard,
                ]}
              >
                <Image source={require("@/assets/SmallerLogo.png")} style={styles.profileImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text>Age: {item.age}</Text>
                  <Text>Height: {item.height}</Text>
                  <Text>Weight: {item.weight}</Text>
                </View>

                <TouchableOpacity
                  style={styles.ignoreButton}
                  onPress={() => handleIgnore(item.id)}
                >
                  <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>

                {item.matched ? (
                  <TouchableOpacity style={styles.pendingButton}>
                    <Text style={styles.buttonText}>
                      {item.pending ? "Pending" : "Message"}
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
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// Stylesheet for MatchScreen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: "white",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#b3d9ff",
    position: "relative",
    justifyContent: "space-between", // Adjusting the layout
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  userInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  matchButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    position: "absolute",
    bottom: 25, // Distance from the bottom
    left: '50%', // Center horizontally
    transform: [{ translateX: 50 }], // Move right by 50 pixels (adjust as needed)
  },  
  ignoreButton: {
    backgroundColor: "#ff4d4d",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

// Styles for the dropdown picker
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    backgroundColor: "white",
  },
};

export default MatchScreen;


