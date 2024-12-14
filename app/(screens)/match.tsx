import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { api } from "@/api";
import { IUser } from "@/api/interfaces";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import storage from "@/storage";

const Match = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const [ageRange, setAgeRange] = useState([0, 100]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showTrainersOnly, setShowTrainersOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState<
    "all" | "male" | "female"
  >("all");

  const experienceLevels = ["beginner", "intermediate", "advanced"];

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await api.users.getUsers();
      const me = await storage.getUser();
      // Filter out the current user
      const filteredOutSelf = users.filter(user => user.id !== me.id);
      setUsers(filteredOutSelf);
      setFilteredUsers(filteredOutSelf);
    };

    fetchUsers();
  }, []);

  const applyFilters = (searchText: string = searchQuery) => {
    const filtered = users.filter(user => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchText.toLowerCase());

      const matchesAge = user.age >= ageRange[0] && user.age <= ageRange[1];

      const matchesExperience =
        selectedExperience.length === 0 ||
        selectedExperience.includes(user.experienceLevel);

      const matchesTrainer = showTrainersOnly ? user.isTrainer : true;

      const matchesGender =
        selectedGender === "all" || user.gender === selectedGender;

      return (
        matchesSearch &&
        matchesAge &&
        matchesExperience &&
        matchesTrainer &&
        matchesGender
      );
    });

    setFilteredUsers(filtered);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    applyFilters(text);
  };

  const toggleExperienceLevel = (level: string) => {
    setSelectedExperience(prev => {
      const newSelection = prev.includes(level)
        ? prev.filter(item => item !== level)
        : [...prev, level];
      return newSelection;
    });
  };

  useEffect(() => {
    applyFilters();
  }, [ageRange, selectedExperience, showTrainersOnly, selectedGender]);

  const resetFilters = () => {
    setAgeRange([0, 100]);
    setSelectedExperience([]);
    setShowTrainersOnly(false);
    setSelectedGender("all");
    setSearchQuery("");
    applyFilters("");
  };

  const renderUserCard = ({ item }: { item: IUser }) => (
    <TouchableOpacity
      className="flex-row bg-mine p-4 rounded-xl mb-3 shadow-sm"
      onPress={() =>
        router.push({
          pathname: "/user/[id]",
          params: { id: item.id, user: JSON.stringify(item) },
        })
      }
    >
      <Image
        source={
          item.profilePictureUrl
            ? { uri: item.profilePictureUrl }
            : require("@/assets/avatars/1.png")
        }
        className="w-20 h-20 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-1">
          {item.firstName} {item.lastName}
        </Text>
        <Text className="text-gray-600 mb-1">
          {item.age} years • {item.city}
        </Text>
        <Text className="text-gray-700 mb-1 text-sm">{item.bio}</Text>
        {item.isTrainer && (
          <Text className="text-blue-500 font-medium">
            Trainer • ${item.cost}/session
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-4 pt-4">
        <TextInput
          className="h-10 px-4 bg-white rounded-lg border border-gray-200 mb-4"
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <TouchableOpacity
          className="mb-4 bg-blue-500 p-2 rounded-lg"
          onPress={() => setIsFilterVisible(!isFilterVisible)}
        >
          <Text className="text-white text-center">
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </Text>
        </TouchableOpacity>

        {isFilterVisible && (
          <View className="bg-white p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold">Filters</Text>
              <TouchableOpacity
                className="bg-gray-200 px-3 py-1 rounded-lg"
                onPress={resetFilters}
              >
                <Text className="text-gray-700">Reset</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-semibold mb-2">Gender:</Text>
            <View className="flex-row mb-4">
              {["all", "male", "female"].map(gender => (
                <TouchableOpacity
                  key={gender}
                  className={`flex-1 m-1 p-2 rounded-lg ${
                    selectedGender === gender ? "bg-blue-500" : "bg-gray-200"
                  }`}
                  onPress={() =>
                    setSelectedGender(gender as "all" | "male" | "female")
                  }
                >
                  <Text
                    className={`text-center ${
                      selectedGender === gender ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-lg font-semibold mb-2">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </Text>
            <View className="items-center">
              <MultiSlider
                values={[ageRange[0], ageRange[1]]}
                min={0}
                max={100}
                step={1}
                sliderLength={280}
                onValuesChange={values => setAgeRange(values)}
                allowOverlap={false}
                snapped
              />
            </View>

            <Text className="text-lg font-semibold mb-2 mt-4">
              Experience Level:
            </Text>
            <View className="flex-row flex-wrap">
              {experienceLevels.map(level => (
                <TouchableOpacity
                  key={level}
                  className={`m-1 p-2 rounded-lg ${
                    selectedExperience.includes(level)
                      ? "bg-blue-500"
                      : "bg-gray-200"
                  }`}
                  onPress={() => toggleExperienceLevel(level)}
                >
                  <Text
                    className={
                      selectedExperience.includes(level)
                        ? "text-white"
                        : "text-gray-700"
                    }
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              className={`mt-4 p-3 rounded-lg ${
                showTrainersOnly ? "bg-blue-500" : "bg-gray-200"
              }`}
              onPress={() => setShowTrainersOnly(!showTrainersOnly)}
            >
              <Text
                className={`text-center ${
                  showTrainersOnly ? "text-white" : "text-gray-700"
                }`}
              >
                {showTrainersOnly ? "Showing Trainers Only" : "Show All Users"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default Match;
