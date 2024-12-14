import React, { useState } from "react";
import {
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  Switch,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BaseView from "./components/BaseView";
import { IUser, RegisterRequest } from "@/api/interfaces";
import { handlePickImageAsync } from "@/utils/imagePickerUtils";
import { api } from "@/api";
import { ExperienceLevel, Gender } from "@/api/enums";
import storage from "@/storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [form, setForm] = useState<RegisterRequest>({
    emailAddress: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    height_feet: 0,
    height_inches: 0,
    weight: 0,
    age: 0,
    gender: "",
    profilePictureUrl: null,
    experienceLevel: "",
    bio: "",
    isTrainer: false,
    cost: 0,
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImageForm, setProfileImageForm] = useState<FormData | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerType, setPickerType] = useState<"gender" | "experienceLevel">();
  const [modalOptions, setModalOptions] = useState<string[]>([]);

  const handleChange = (field: keyof RegisterRequest, value: any) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "emailAddress",
      "username",
      "password",
      "firstName",
      "lastName",
      "city",
      "height_feet",
      "height_inches",
      "weight",
      "age",
      "gender",
      "experienceLevel",
    ];
    const newErrors: Record<string, string> = {};

    for (const field of requiredFields) {
      if (!form[field as keyof RegisterRequest]) {
        newErrors[field] = `This field is required.`;
      }
    }

    if (form.isTrainer && form.cost === 0) {
      newErrors.cost = "Cost is required if you are a trainer.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const status = await api.auth.register(form);
    if (status) {
      router.replace("/match");
      //upload image
      if (!profileImageForm) {
        console.error("Profile image form is null. No file to upload.");
      } else {
        try {
          await api.image.upload(profileImageForm);
        } catch (error) {
          console.error("Failed to upload profile image:", error);
        }
      }
    }
  };

  const openModal = (type: "gender" | "experienceLevel", options: string[]) => {
    setPickerType(type);
    setModalOptions(options);
    setModalVisible(true);
  };

  const handleModalSelect = (value: string) => {
    if (pickerType === "gender") {
      setForm({ ...form, gender: value.toLowerCase() });
    } else {
      setForm({
        ...form,
        experienceLevel: value.toLowerCase(),
      });
    }
    setModalVisible(false);
  };

  return (
    <BaseView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="px-6 py-8">
          <Text className="text-3xl font-bold text-center mb-8 text-gray-800">
            Create Account
          </Text>

          {/* Image Picker Section */}
          <View className="mb-8 items-center">
            <TouchableOpacity
              onPress={() =>
                handlePickImageAsync(setImageUri, setProfileImageForm)
              }
              className="relative"
            >
              <View className="w-32 h-32 rounded-full bg-gray-100 items-center justify-center border-2 border-blue-500">
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    className="w-32 h-32 rounded-full"
                  />
                ) : (
                  <Ionicons name="camera" size={40} color="#3b82f6" />
                )}
              </View>
              <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
                <Ionicons name="add" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Email Address
              </Text>
              <TextInput
                placeholder="Enter your email"
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                value={form.emailAddress}
                onChangeText={text => handleChange("emailAddress", text)}
                autoCapitalize="none"
              />
              {errors.emailAddress && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.emailAddress}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Password
              </Text>
              <TextInput
                placeholder="Create a password"
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                value={form.password}
                onChangeText={text => handleChange("password", text)}
                secureTextEntry={true}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Username
              </Text>
              <TextInput
                placeholder="Choose a username"
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                value={form.username}
                onChangeText={text => handleChange("username", text)}
                autoCapitalize="none"
              />
              {errors.username && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.username}
                </Text>
              )}
            </View>

            {/* Gender Modal Trigger */}
            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Gender
              </Text>
              <TouchableOpacity
                onPress={() => openModal("gender", ["Male", "Female", "Other"])}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className="text-gray-800">
                  {form.gender || "Select Gender"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
              {errors.gender && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.gender}
                </Text>
              )}
            </View>

            {/* Experience Level Modal Trigger */}
            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Experience Level
              </Text>
              <TouchableOpacity
                onPress={() =>
                  openModal("experienceLevel", [
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                  ])
                }
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className="text-gray-800">
                  {form.experienceLevel || "Select Experience Level"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
              {errors.experienceLevel && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.experienceLevel}
                </Text>
              )}
            </View>

            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  First Name
                </Text>
                <TextInput
                  placeholder="First Name"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                  value={form.firstName}
                  onChangeText={text => handleChange("firstName", text)}
                />
                {errors.firstName && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  Last Name
                </Text>
                <TextInput
                  placeholder="Last Name"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                  value={form.lastName}
                  onChangeText={text => handleChange("lastName", text)}
                />
                {errors.lastName && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </Text>
                )}
              </View>
            </View>

            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                City
              </Text>
              <TextInput
                placeholder="Enter your city"
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                value={form.city}
                onChangeText={text => handleChange("city", text)}
              />
              {errors.city && (
                <Text className="text-red-500 text-sm mt-1">{errors.city}</Text>
              )}
            </View>

            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  Height (ft)
                </Text>
                <TextInput
                  placeholder="Feet"
                  keyboardType="numeric"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                  value={form.height_feet === 0 ? "" : String(form.height_feet)}
                  onChangeText={text =>
                    handleChange("height_feet", text ? Number(text) : 0)
                  }
                />
                {errors.height_feet && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.height_feet}
                  </Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  Height (in)
                </Text>
                <TextInput
                  placeholder="Inches"
                  keyboardType="numeric"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                  value={
                    form.height_inches === 0 ? "" : String(form.height_inches)
                  }
                  onChangeText={text =>
                    handleChange("height_inches", text ? Number(text) : 0)
                  }
                />
                {errors.height_inches && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.height_inches}
                  </Text>
                )}
              </View>
            </View>

            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Weight (lbs)
              </Text>
              <TextInput
                placeholder="Enter your weight"
                keyboardType="numeric"
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                value={form.weight === 0 ? "" : String(form.weight)}
                onChangeText={text => handleChange("weight", Number(text))}
              />
              {errors.weight && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.weight}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Age
              </Text>
              <TextInput
                placeholder="Enter your age"
                keyboardType="numeric"
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                value={form.age === 0 ? "" : String(form.age)}
                onChangeText={text => handleChange("age", Number(text))}
              />
              {errors.age && (
                <Text className="text-red-500 text-sm mt-1">{errors.age}</Text>
              )}
            </View>

            <View>
              <Text className="text-gray-700 text-sm mb-1 font-medium">
                Bio
              </Text>
              <TextInput
                placeholder="Tell us about yourself..."
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800
                "
                value={form.bio ? form.bio : ""}
                onChangeText={text => handleChange("bio", text)}
              />
            </View>

            <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <Text className="text-gray-700 font-medium">
                Are you a trainer?
              </Text>
              <Switch
                value={form.isTrainer}
                onValueChange={value => handleChange("isTrainer", value)}
                trackColor={{ false: "#cbd5e1", true: "#93c5fd" }}
                thumbColor={form.isTrainer ? "#3b82f6" : "#f4f4f5"}
              />
            </View>

            {form.isTrainer && (
              <View>
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  Cost per session
                </Text>
                <TextInput
                  placeholder="Enter cost per session"
                  keyboardType="numeric"
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                  value={form.cost === 0 ? "" : String(form.cost)}
                  onChangeText={text => handleChange("cost", Number(text))}
                />
                {errors.cost && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.cost}
                  </Text>
                )}
              </View>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-500 py-4 rounded-xl mt-4"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal for Picker */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View className="flex-1 justify-end">
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TouchableWithoutFeedback>
                    <View className="bg-white rounded-t-3xl p-6">
                      <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-semibold text-gray-800">
                          Select{" "}
                          {pickerType === "gender"
                            ? "Gender"
                            : "Experience Level"}
                        </Text>
                        <TouchableOpacity
                          onPress={() => setModalVisible(false)}
                        >
                          <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                      </View>
                      <FlatList
                        data={modalOptions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => handleModalSelect(item)}
                            className="py-3 border-b border-gray-100"
                          >
                            <Text className="text-lg text-gray-800">
                              {item}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseView>
  );
};

export default RegisterScreen;
