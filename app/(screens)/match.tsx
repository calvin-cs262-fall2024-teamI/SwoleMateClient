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
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for star icons

function MatchScreen() {
  const [nearbyUsers, setNearbyUsers] = useState(fakeUsers);
  const [selectedFilter, setSelectedFilter] = useState(null); // State for dropdown selection
  const [specificFilter, setSpecificFilter] = useState(""); // State for text input

  const handleMatch = (userId) => {
    setNearbyUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, matched: true, pending: true } // Set user as matched and pending
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
        ? user[selectedFilter] && user[selectedFilter].toString().toLowerCase().includes(specificFilter.toLowerCase()) // Check selected filter field
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
                { label: "Gym", value: "gym" },
                { label: "Rating", value: "rating" },
                { label: "Regular or Trainer", value: "regularTrainer" },
                { label: "Experience", value: "experience"},
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
                  item.showMore && styles.expandedUserCard, // Change background if expanded
                ]}
              >
                <Image source={require("@/assets/SmallerLogo.png")} style={styles.profileImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text>Age: {item.age}</Text>
                  <Text>{item.typeOfWorkout}</Text>
                  <Text>{item.gymChoice}</Text>
            
                  {/* Conditional rendering of additional user info */}
                  {item.showMore && (
                    <View>
                      <Text>City: {item.city}</Text>
                      <Text>{item.experience}</Text>
                      <Text>{item.isTrainer ? "Type: Trainer" : "Type: Regular"}</Text>
                    </View>
                  )}

                  {/* "Read More" button */}
                  <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => {
                      item.showMore = !item.showMore; // Toggle visibility
                      setNearbyUsers([...nearbyUsers]); // Update the state to refresh the component
                    }}
                  >
                    <Text style={styles.buttonText}>{item.showMore ? "Show Less" : "Read More"}</Text>
                  </TouchableOpacity>
                </View>
            
                <TouchableOpacity
                  style={styles.ignoreButton}
                  onPress={() => handleIgnore(item.id)}
                >
                  <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
            
                <TouchableOpacity
                  style={[
                    styles.matchButton,
                    item.pending ? styles.pendingButton : styles.defaultButton, // Change style based on pending state
                  ]}
                  onPress={() => handleMatch(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {item.pending ? "Pending" : "Match"} {/* Change button text based on pending state */}
                  </Text>
                </TouchableOpacity>

                {/* Display rating as stars in the bottom left corner */}
                <View style={styles.starContainer}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon
                      key={index}
                      name="star"
                      size={12}
                      color={index < item.rating ? "#FFD700" : "#ccc"} // Gold for filled stars, gray for empty
                    />
                  ))}
                </View>
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
    padding: 5,
    borderRadius: 5,
    backgroundColor: "transparent"
  },
  filterTextInput: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginLeft: 5, // Add some space between the dropdown and text input
    backgroundColor: "transparent",
    height: 40, // Set a fixed height
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
  expandedUserCard: {
    backgroundColor: "#e6e6ff", // Background color when expanded
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
  defaultButton: {
    backgroundColor: "green", // Green color for the button when not pending
    width: 100, // Set width for Match button
    paddingVertical: 4, // Reduced padding for size adjustment
    paddingHorizontal: 8, // Reduced padding for size adjustment
    borderRadius: 5,
    alignItems: "center", // Center text
  },
  pendingButton: {
    backgroundColor: "blue", // Blue color for the button when pending
    paddingVertical: 4, // Reduced padding for size adjustment
    paddingHorizontal: 8, // Reduced padding for size adjustment
    borderRadius: 5,
    width: 100, // Set width for Pending button
    alignItems: "center", // Center text
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
  readMoreButton: {
    backgroundColor: "#007bff", // Blue color for the button
    paddingVertical: 4, // Reduced padding for size adjustment
    paddingHorizontal: 8, // Reduced padding for size adjustment
    borderRadius: 5,
    marginTop: 10,
    width: 100, // Set width for Read More button
    alignItems: "center", // Center text
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  starContainer: {
    position: "absolute",
    bottom: 5,
    left: 13,
    flexDirection: "row",
  },
});

// PickerSelect styles
const pickerSelectStyles = {
  inputIOS: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#000",
    width: 150,
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#000",
    width: 150,
  },
};

export default MatchScreen;