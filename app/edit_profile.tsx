/**
 * @fileoverview Profile editing screen component
 * Allows users to modify their profile information
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { api } from "@/api";
import { IUser } from "@/api/interfaces";
import storage from "@/storage";
import BaseView from "./components/BaseView";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Gender } from "@/api/enums";

const GENDER_OPTIONS = ["male", "female"] as const;
const EXPERIENCE_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

/**
 * EditProfile component for updating user profile information
 * @returns JSX.Element
 */
const EditProfile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    age: "",
    gender: "",
    city: "",
    height_feet: "",
    height_inches: "",
    weight: "",
    experienceLevel: "",
    cost: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<{
    key: keyof typeof formData;
    label: string;
    type?: "text" | "number" | "picker";
    options?: string[];
  } | null>(null);
  const [tempValue, setTempValue] = useState("");

  /**
   * Fetches current user profile data on component mount
   */
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { id } = await storage.getUser();
        const userData = await api.users.getUser(id);
        setUser(userData);
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          bio: userData.bio || "",
          age: userData.age.toString(),
          gender: userData.gender,
          city: userData.city,
          height_feet: userData.height_feet.toString(),
          height_inches: userData.height_inches.toString(),
          weight: userData.weight.toString(),
          experienceLevel: userData.experienceLevel,
          cost: userData.cost?.toString() || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Alert.alert("Error", "Failed to load profile data");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  /**
   * Handles saving profile changes
   */
  const handleSave = async () => {
    try {
      setLoading(true);
      if (!user) return;

      const updatedUser = {
        ...user,
        ...formData,
        age: parseInt(formData.age),
        height_feet: parseInt(formData.height_feet),
        height_inches: parseInt(formData.height_inches),
        weight: parseInt(formData.weight),
        cost: user.isTrainer ? parseInt(formData.cost) : user.cost,
      };

      await api.users.updateUser(user.id, updatedUser);
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Opens the edit modal for a specific field
   * @param key - Field key to edit
   * @param label - Display label for the field
   * @param type - Type of input to show
   * @param options - Options for picker type inputs
   */
  const handleEdit = (
    key: keyof typeof formData,
    label: string,
    type: "text" | "number" | "picker" = "text",
    options: string[] = []
  ) => {
    setEditingField({ key, label, type, options });
    setTempValue(formData[key]);
    setModalVisible(true);
  };

  const handleSaveField = () => {
    if (!editingField) return;

    setFormData(prev => ({
      ...prev,
      [editingField.key]: tempValue,
    }));
    setModalVisible(false);
  };

  const ListItem = ({
    label,
    value,
    onPress,
    showArrow = true,
  }: {
    label: string;
    value: string;
    onPress: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200"
    >
      <Text className="text-gray-600">{label}</Text>
      <View className="flex-row items-center">
        <Text className="text-black mr-2">{value}</Text>
        {showArrow && (
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <BaseView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-500">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-blue-500">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Basic Info */}
        <View className="mt-6">
          <Text className="px-4 pb-2 text-sm font-semibold text-gray-500">
            BASIC INFORMATION
          </Text>
          <View className="bg-white">
            <ListItem
              label="First Name"
              value={formData.firstName}
              onPress={() => handleEdit("firstName", "First Name")}
            />
            <ListItem
              label="Last Name"
              value={formData.lastName}
              onPress={() => handleEdit("lastName", "Last Name")}
            />
            <ListItem
              label="Username"
              value={formData.username}
              onPress={() => handleEdit("username", "Username")}
            />
          </View>
        </View>

        {/* Personal Details */}
        <View className="mt-6">
          <Text className="px-4 pb-2 text-sm font-semibold text-gray-500">
            PERSONAL DETAILS
          </Text>
          <View className="bg-white">
            <ListItem
              label="Age"
              value={formData.age}
              onPress={() => handleEdit("age", "Age", "number")}
            />
            <ListItem
              label="Gender"
              value={
                formData.gender.charAt(0).toUpperCase() +
                formData.gender.slice(1)
              }
              onPress={() =>
                handleEdit("gender", "Gender", "picker", [...GENDER_OPTIONS])
              }
            />
            <ListItem
              label="City"
              value={formData.city}
              onPress={() => handleEdit("city", "City")}
            />
          </View>
        </View>

        {/* Physical Stats */}
        <View className="mt-6">
          <Text className="px-4 pb-2 text-sm font-semibold text-gray-500">
            PHYSICAL STATS
          </Text>
          <View className="bg-white">
            <ListItem
              label="Height"
              value={`${formData.height_feet}'${formData.height_inches}"`}
              onPress={() => {}}
            />
            <ListItem
              label="Weight"
              value={`${formData.weight} lbs`}
              onPress={() => {}}
            />
            <ListItem
              label="Experience Level"
              value={
                formData.experienceLevel.charAt(0).toUpperCase() +
                formData.experienceLevel.slice(1)
              }
              onPress={() => {}}
            />
          </View>
        </View>

        {user?.isTrainer && (
          <View className="mt-6">
            <Text className="px-4 pb-2 text-sm font-semibold text-gray-500">
              TRAINER DETAILS
            </Text>
            <View className="bg-white">
              <ListItem
                label="Training Rate"
                value={`$${formData.cost}/session`}
                onPress={() => {}}
              />
            </View>
          </View>
        )}

        <View className="h-8" />
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-xl">
              {/* Modal Header */}
              <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text className="text-blue-500">Cancel</Text>
                </TouchableOpacity>
                <Text className="text-lg font-semibold">
                  Edit {editingField?.label}
                </Text>
                <TouchableOpacity onPress={handleSaveField}>
                  <Text className="text-blue-500">Save</Text>
                </TouchableOpacity>
              </View>

              {/* Modal Content */}
              <View className="p-4">
                {editingField?.type === "picker" ? (
                  <Picker
                    selectedValue={tempValue}
                    onValueChange={value => setTempValue(value)}
                  >
                    {editingField.options?.map(option => (
                      <Picker.Item
                        key={option}
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                        value={option}
                      />
                    ))}
                  </Picker>
                ) : (
                  <TextInput
                    className="bg-gray-100 p-3 rounded-lg"
                    value={tempValue}
                    onChangeText={setTempValue}
                    keyboardType={
                      editingField?.type === "number" ? "numeric" : "default"
                    }
                    autoFocus
                  />
                )}
              </View>

              {/* Safe Area Spacing */}
              <View className="h-8" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </BaseView>
  );
};

export default EditProfile;
