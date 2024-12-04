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
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fakeUsers } from "../../api/fakedata";
import Icon from "react-native-vector-icons/FontAwesome";
import { IUserMatch } from "../../api/interfaces";

function MatchScreen() {
  const [nearbyUsers, setNearbyUsers] = useState(fakeUsers);
  const [selectedFilter, setSelectedFilter] = useState<keyof IUserMatch | null>(
    null
  );
  const [specificFilter, setSpecificFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFocus, setIsFocus] = useState(false);

  const filterOptions: Array<{ label: string; value: keyof IUserMatch }> = [
    { label: "City", value: "city" },
    { label: "Age", value: "age" },
    { label: "Gym", value: "gym" },
    { label: "Rating", value: "rating" },
    { label: "Experience", value: "experience" },
    { label: "Regular or Trainer", value: "isTrainer" },
  ];

  const handleMatch = (userId: number | string) => {
    setNearbyUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, matched: true, pending: true } : user
      )
    );
  };

  const handleIgnore = (userId: number | string) => {
    setNearbyUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const filterUsers = () => {
    let filteredUsers = [...nearbyUsers];

    if (selectedFilter && specificFilter) {
      const filterValue = specificFilter.trim().toLowerCase();

      filteredUsers = filteredUsers.filter(user => {
        switch (selectedFilter) {
          case "age": {
            const ageFilter = parseInt(specificFilter, 10);
            return user.age === ageFilter;
          }
          case "city":
            return user.city.toLowerCase().includes(filterValue);
          case "gym":
            return user.gym.toLowerCase().includes(filterValue);
          case "rating": {
            const ratingFilter = parseFloat(specificFilter);
            return user.rating >= ratingFilter;
          }
          case "experience":
            return user.experience.toLowerCase().includes(filterValue);
          case "isTrainer":
            return filterValue === "trainer" ? user.isTrainer : !user.isTrainer;
          default:
            return true;
        }
      });
    }

    if (selectedFilter === "rating") {
      filteredUsers.sort((a, b) =>
        sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
      );
    } else if (selectedFilter === "experience") {
      filteredUsers.sort((a, b) =>
        sortOrder === "asc"
          ? a.experience.localeCompare(b.experience)
          : b.experience.localeCompare(a.experience)
      );
    }

    return filteredUsers;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/swole.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* Filter container for dropdown and text input */}
          <View style={styles.filterContainer}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              data={filterOptions}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Filter/Sort by:" : "..."}
              value={selectedFilter}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedFilter(item.value); // item.value is now guaranteed to be keyof IUserMatch
                setSpecificFilter("");
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
            <TextInput
              style={styles.filterTextInput}
              placeholder="Enter Value"
              value={specificFilter}
              onChangeText={text => setSpecificFilter(text)}
            />
            {selectedFilter && (
              <TouchableOpacity
                style={styles.sortButton}
                onPress={() =>
                  setSortOrder(prevOrder =>
                    prevOrder === "asc" ? "desc" : "asc"
                  )
                }
              >
                <Text style={styles.buttonText}>
                  Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* List of nearby users */}
          <FlatList
            data={filterUsers()}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.userCard,
                  item.showMore && styles.expandedUserCard,
                ]}
              >
                <Image
                  source={require("@/assets/SmallerLogo.png")}
                  style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text>Age: {item.age}</Text>
                  <Text>{item.typeOfWorkout}</Text>
                  <Text>{item.gym}</Text>

                  {item.showMore && (
                    <View>
                      <Text>City: {item.city}</Text>
                      <Text>{item.experience}</Text>
                      <Text>
                        {item.isTrainer ? "Type: Trainer" : "Type: Regular"}
                      </Text>
                      <Text> Reveiews: {item.reviews}</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => {
                      item.showMore = !item.showMore;
                      setNearbyUsers([...nearbyUsers]);
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {item.showMore ? "Show Less" : "Read More"}
                    </Text>
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
                    item.pending ? styles.pendingButton : styles.defaultButton,
                  ]}
                  onPress={() => handleMatch(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {item.pending ? "Pending" : "Match"}{" "}
                  </Text>
                </TouchableOpacity>

                <View style={styles.starContainer}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon
                      key={index}
                      name="star"
                      size={12}
                      color={index < item.rating ? "#FFD700" : "#ccc"}
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
    backgroundColor: "transparent",
  },
  dropdown: {
    width: 150,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#fff",
  },
  filterTextInput: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginLeft: 5,
    backgroundColor: "transparent",
    height: 40,
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
    justifyContent: "space-between",
  },
  expandedUserCard: {
    backgroundColor: "#e6e6ff",
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
    backgroundColor: "green",
    width: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  pendingButton: {
    backgroundColor: "blue",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
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
    backgroundColor: "#007bff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
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
  sortButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: "center",
  },
});

export default MatchScreen;
