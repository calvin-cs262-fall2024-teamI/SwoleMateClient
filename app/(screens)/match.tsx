import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
//import { fakeUsers } from "../../api/fakedata";
import Icon from "react-native-vector-icons/FontAwesome";
import { IUserMatch } from "../../api/interfaces";
import styles from ".././stylesheets/MatchScreenStyles";
import apiClient from "@/nonapp/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MatchScreen() {
  const [users, setUsers] = useState<IUserMatch[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
    { label: "Experience", value: "experienceLevel" },
    { label: "Regular or Trainer", value: "isTrainer" },
  ];
  const fetchUsers = async (resetPage = false) => {
    if (resetPage) setPage(1);
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken"); // Replace "authToken" with your token key
      const response = await apiClient.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        params: {
          page: resetPage ? 1 : page,
          filterBy: selectedFilter,
          filterValue: specificFilter,
          sortOrder,
        },
      });
      const { data, totalPages: fetchedTotalPages } = response.data;
      setUsers(prevUsers => (resetPage ? data : [...prevUsers, ...data]));
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error("error fetching users", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoadMore = () => {
    if (page < totalPages && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page, selectedFilter, specificFilter, sortOrder]);

  //TODO: LINK THIS WITH DATABASE
  const handleMatch = (userId: number | string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, matched: true, pending: true } : user
      )
    );
  };

  const handleIgnore = (userId: number | string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  // const filterUsers = () => {
  //   let filteredUsers = [...nearbyUsers];

  //   if (selectedFilter && specificFilter) {
  //     const filterValue = specificFilter.trim().toLowerCase();

  //     filteredUsers = filteredUsers.filter(user => {
  //       switch (selectedFilter) {
  //         case "age": {
  //           const ageFilter = parseInt(specificFilter, 10);
  //           return user.age === ageFilter;
  //         }
  //         case "city":
  //           return user.city.toLowerCase().includes(filterValue);
  //         case "gym":
  //           return user.gym.toLowerCase().includes(filterValue);
  //         case "rating": {
  //           const ratingFilter = parseFloat(specificFilter);
  //           return user.rating >= ratingFilter;
  //         }
  //         case "experience":
  //           return user.experience.toLowerCase().includes(filterValue);
  //         case "isTrainer":
  //           return filterValue === "trainer" ? user.isTrainer : !user.isTrainer;
  //         default:
  //           return true;
  //       }
  //     });
  //   }

  //   if (selectedFilter === "rating") {
  //     filteredUsers.sort((a, b) =>
  //       sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
  //     );
  //   } else if (selectedFilter === "experience") {
  //     filteredUsers.sort((a, b) =>
  //       sortOrder === "asc"
  //         ? a.experience.localeCompare(b.experience)
  //         : b.experience.localeCompare(a.experience)
  //     );
  //   }

  //   return filteredUsers;
  // };

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
              onBlur={() => fetchUsers(true)}
            />
            {selectedFilter && (
              <TouchableOpacity
                style={styles.sortButton}
                onPress={() => {
                  setSortOrder(prevOrder =>
                    prevOrder === "asc" ? "desc" : "asc"
                  );
                  fetchUsers(true);
                }}
              >
                <Text style={styles.buttonText}>
                  Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* List of nearby users */}
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.userCard,
                  item.showMore && styles.expandedUserCard,
                ]}
              >
                <Image
                  source={
                    item.profilePictureUrl &&
                    item.profilePictureUrl !== "null" &&
                    item.profilePictureUrl !== ""
                      ? { uri: item.profilePictureUrl }
                      : require("@/assets/portrait_placeholder.png")
                  }
                  style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>
                    {item.firstName + " " + item.lastName}
                  </Text>
                  <Text>Age: {item.age}</Text>
                  <Text>
                    Height: {item.height_feet}&apos; {item.height_inches}
                    &quot;
                  </Text>
                  <Text>Weight: {item.weight}lbs</Text>
                  <Text>Gender: {item.gender}</Text>

                  {/*TODO: I NEED TO RETRIEVE type of workout FROM PREFERENCES TABLE */}
                  {/* <Text>{item.typeOfWorkout}</Text> */}
                  <Text>{item.gym}</Text>
                  {item.showMore && (
                    <View>
                      <Text>City: {item.city}</Text>
                      <Text>Experience Level: {item.experienceLevel}</Text>
                      <Text>
                        {item.isTrainer ? "Type: Trainer" : "Type: Regular"}
                        {item.isTrainer && <Text>Cost: {item.cost}</Text>}
                      </Text>
                      <Text>Bio: {item.bio}</Text>
                    </View>
                  )}
                  {/* TODO: WHEN USER CLICKS READ MORE THATS WHEN YOU FETCH THE REVIEWS FOR THAT USER FROM THE DATABASE */}
                  <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => {
                      item.showMore = !item.showMore;
                      setUsers([...users]);
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
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : null
            }
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default MatchScreen;
