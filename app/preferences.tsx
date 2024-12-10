import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { DayOfWeek, ExperienceLevel, Gender, WorkoutTimes } from "@/api/enums";
import apiClient from "@/nonapp/axiosConfig";
import { UserContext } from "@/nonapp/UserContext";
import CustomMultiSelect from "@/app/CustomMultiSelect";
import AuthGuard from "./routes/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const PreferencesScreen = () => {
  const context = useContext(UserContext);

  const [preferredGender, setPreferredGender] = useState<Gender | null>(null);
  const [preferredExperienceLevels, setPreferredExperienceLevels] = useState<
    ExperienceLevel[]
  >([]);
  const [preferredWorkoutTimes, setPreferredWorkoutTimes] = useState<
    WorkoutTimes[]
  >([]);
  const [preferredWorkoutTypes, setPreferredWorkoutTypes] = useState<string[]>(
    []
  );
  const [preferredGyms, setPreferredGyms] = useState<string[]>([]);
  const [preferredDays, setPreferredDays] = useState<DayOfWeek[]>([]);
  const [maxBudget, setMaxBudget] = useState<number | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const genders = Object.values(Gender);
  const experienceLevels = Object.values(ExperienceLevel);
  const workoutTimes = ["Morning", "Afternoon", "Evening"];
  const workoutTypes = ["Strength", "Cardio", "HIIT", "Yoga"];
  const gyms = ["Gym A", "Gym B", "Gym C"];
  const days = Object.values(DayOfWeek);

  // Toggle function for generic selections (with typing)
  const toggleSelection = <T,>(
    item: T,
    selectedItems: T[],
    setItems: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setItems(prev =>
      prev.includes(item)
        ? prev.filter(selected => selected !== item)
        : [...prev, item]
    );
  };

  const toggleDaySelection = (day: DayOfWeek) => {
    setPreferredDays(prevDays =>
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day]
    );
  };

  const handleGoalChange = (text: string) => {
    setGoals(text.split(",").map(goal => goal.trim()));
  };

  const handleBudgetChange = (value: string) => {
    setMaxBudget(parseFloat(value) || null);
  };

  const savePreferences = async () => {
    setLoading(true); // Start loading
    const userId = context?.userId;
    if (!userId) {
      console.error("User ID not found");
      setLoading(false);
      return;
    }

    const preferences = {
      userId: Number(userId),
      preferredGender,
      preferredExperienceLevels,
      preferredWorkoutTimes,
      preferredWorkoutTypes,
      preferredGyms,
      preferredDays,
      maxBudget,
      goals,
    };

    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      setLoading(false);
      return;
    }

    try {
      console.log(preferences);

      const response = await apiClient.post(
        "/api/userpreferences",
        preferences,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        alert("User preferences stored successfully");
        router.replace("/match");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
    setLoading(false); // Stop loading
  };

  const renderItem = ({ item }: { item: string }) => {
    switch (item) {
      case "Gender":
        return (
          <CustomMultiSelect
            data={genders}
            selectedItems={preferredGender ? [preferredGender] : []}
            onSelect={item => setPreferredGender(item as Gender)}
            label="Select Gender"
          />
        );
      case "Experience Level":
        return (
          <CustomMultiSelect
            data={experienceLevels}
            selectedItems={preferredExperienceLevels}
            onSelect={item =>
              toggleSelection<ExperienceLevel>(
                item as ExperienceLevel, // Explicitly specify WorkoutTimes
                preferredExperienceLevels,
                setPreferredExperienceLevels
              )
            }
            label="Select Experience Level"
          />
        );
      case "Workout Times":
        return (
          <CustomMultiSelect
            data={workoutTimes}
            selectedItems={preferredWorkoutTimes}
            onSelect={item =>
              toggleSelection<WorkoutTimes>(
                item as WorkoutTimes, // Explicitly specify WorkoutTimes
                preferredWorkoutTimes,
                setPreferredWorkoutTimes
              )
            }
            label="Select Workout Times"
          />
        );
      case "Workout Types":
        return (
          <CustomMultiSelect
            data={workoutTypes}
            selectedItems={preferredWorkoutTypes}
            onSelect={item =>
              toggleSelection<string>(
                item, // No need for casting as it's already a string
                preferredWorkoutTypes,
                setPreferredWorkoutTypes
              )
            }
            label="Select Workout Types"
          />
        );
      case "Gyms":
        return (
          <CustomMultiSelect
            data={gyms}
            selectedItems={preferredGyms}
            onSelect={item =>
              toggleSelection<string>(item, preferredGyms, setPreferredGyms)
            }
            label="Select Gyms"
          />
        );
      case "Days":
        return (
          <CustomMultiSelect
            data={days}
            selectedItems={preferredDays}
            onSelect={item => toggleDaySelection(item as DayOfWeek)}
            label="Select Preferred Days"
          />
        );
      case "Max Budget":
        return (
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 20,
              width: "100%",
            }}
            placeholder={maxBudget ? maxBudget.toString() : "Set Max Budget"}
            value={maxBudget ? maxBudget.toString() : ""}
            onChangeText={handleBudgetChange}
          />
        );
      case "Goals":
        return (
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 20,
              width: "100%",
            }}
            placeholder="Add Goals (comma separated)"
            value={goals.join(", ")}
            onChangeText={handleGoalChange}
          />
        );
      case "Button":
        return (
          <Button
            title="Save Preferences"
            onPress={savePreferences}
            disabled={loading} // Disable button during loading
          />
        );
      default:
        return null;
    }
  };

  return (
    <AuthGuard>
      <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        <View style={{ padding: 16 }}>
          {/* Header with inline styling */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Select your preferences
          </Text>
          <FlatList
            data={[
              "Gender",
              "Experience Level",
              "Workout Times",
              "Workout Types",
              "Gyms",
              "Days",
              "Max Budget",
              "Goals",
              "Button",
            ]}
            renderItem={({ item }) => renderItem({ item })}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default PreferencesScreen;
